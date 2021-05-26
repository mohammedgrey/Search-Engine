package com.MFMM.server.Modules;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.regex.Pattern;

import com.MFMM.server.helpers.FileHandler;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

public class CrawlerMain {
    public static void main(String[] args) throws IOException, InterruptedException {

        int NUM_OF_ROBOTS = 4;
        Thread[] robots = new Thread[NUM_OF_ROBOTS];
        Crawler crawler = new Crawler();
        Runtime.getRuntime().addShutdownHook(new Thread() {
            public void run() {
                try {
                    Thread.sleep(200);
                    System.out.println("I got interrupted or finished. Saving state before exist...");
                    crawler.saveState();

                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    e.printStackTrace();
                }
            }
        });
        for (int i = 0; i < NUM_OF_ROBOTS; i++) {

            robots[i] = new Thread(crawler);
            System.out.println("CREATED");
            robots[i].setName(Integer.toString(i + 1));
        }
        for (int i = 0; i < NUM_OF_ROBOTS; i++) {
            robots[i].start();
            System.out.println("STARTED");
        }

        for (int i = 0; i < NUM_OF_ROBOTS; i++)
            robots[i].join();

        System.out.println("******************CRAWLING FINISHED******************");
    }

    static final class Crawler implements Runnable {
        // Members
        // private File[] listOfFiles;
        private List<String> crawledPages;
        private Queue<String> toCrawlPages;
        private final int CRAWLING_LIMIT = 20;
        private final String NO_ROBOTS = "NO_ROBOTS";
        AtomicInteger workingRobots;

        public Crawler() throws IOException {
            loadState();
            workingRobots = new AtomicInteger();
        }

        private String readRobotsTxt(String url) {
            java.util.regex.Matcher matcher = Pattern.compile("^(http(s?)://([^/]+))").matcher(url);
            // the regex is taken from stackoverflow
            if (matcher.find()) {
                try (InputStream inFile = new URL(matcher.group(1) + "/robots.txt").openStream()) {
                    return new String(inFile.readAllBytes());
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            return NO_ROBOTS;
        }

        public boolean IamAllowedToCrawl(String url) {
            // Useful article as a reference: https://moz.com/learn/seo/robotstxt
            String robotsDotTxt = readRobotsTxt(url);

            // TODO: check the robots.txt with some regex and return whether we are
            // allowed to visit the passed in url or not
            System.out.println(robotsDotTxt);
            return true;
        }

        private void loadState() throws IOException {
            List<String> crawledPagesRead = (List<String>) FileHandler
                    .readFromFile("server/src/main/java/com/MFMM/server/crawlerState/crawled.txt", 0);
            if (crawledPagesRead.size() == 0) {
                // First time crawling ever
                List<String> initialSeed = (List<String>) FileHandler
                        .readFromFile("server/src/main/java/com/MFMM/server/crawlerState/initialSeed.txt", 0);
                this.toCrawlPages = new LinkedList<>();
                for (String singleSeed : initialSeed)
                    this.toCrawlPages.add(singleSeed);
                this.crawledPages = new ArrayList<>(CRAWLING_LIMIT);
                return;
            }
            // "Crawled before" load the state from the file
            Queue<String> toCrawlPagesRead = (Queue<String>) FileHandler
                    .readFromFile("server/src/main/java/com/MFMM/server/crawlerState/toCrawl.txt", 1);
            this.toCrawlPages = toCrawlPagesRead;
            this.crawledPages = crawledPagesRead;
        }

        private Document downloadPage(String url) throws IOException {
            Document doc;
            try {
                doc = Jsoup.connect(url).get();
                saveHTMLFile(doc.html(), doc.title() + ".html");
                return doc;
            } catch (MalformedURLException e) {
                return null;
            }

        }

        private void saveHTMLFile(String str, String fileName) throws IOException {
            String directory = "server/src/main/java/com/MFMM/server/documents/";
            BufferedWriter writer = new BufferedWriter(new FileWriter(directory + fileName));
            writer.write(str);
            writer.close();
        }

        public boolean isHTML(String page) {
            try {
                URL url = new URL(page);

                URLConnection u = url.openConnection();
                String type = u.getHeaderField("Content-Type");
                if (type == null)
                    return false;
                return type.toLowerCase().contains("html");
            } catch (IOException e) {
                return false;
            }
        }

        private boolean validURL(String url) {
            return url.startsWith("https://") || url.startsWith("http://");
        }

        private void AddMoreURLSToCrawl(Document doc) {
            for (Element linkTag : doc.getElementsByTag("a")) {
                String hrefAttr = linkTag.attr("href");
                if (!validURL(hrefAttr))
                    continue;

                synchronized (this.toCrawlPages) {
                    this.toCrawlPages.add(hrefAttr);
                }
            }

        }

        private boolean isVisitedURL(String url) {
            // TODO: make this function check also for similar urls that aren't identical
            synchronized (this.crawledPages) {
                return this.crawledPages.contains(url);
            }
        }

        public void saveState() {
            try {
                FileHandler.writeToFile(crawledPages, "server/src/main/java/com/MFMM/server/crawlerState/crawled.txt");
                FileHandler.writeToFile(toCrawlPages, "server/src/main/java/com/MFMM/server/crawlerState/toCrawl.txt");
            } catch (IOException ioe) {
                ioe.printStackTrace();
            }
        }

        @Override
        public void run() {
            // keep crawling as long as we didn't reach the limit and there are more pages
            // to crawl

            workingRobots.incrementAndGet();
            mainLoop: while (true) {
                // Stopping Criteria
                synchronized (this.crawledPages) {
                    if (this.crawledPages.size() >= CRAWLING_LIMIT) {
                        workingRobots.decrementAndGet();
                        break;
                    }

                }
                boolean nothingToCrawl;
                synchronized (this.toCrawlPages) {
                    nothingToCrawl = this.toCrawlPages.size() == 0;
                }
                if (nothingToCrawl) // nothing to crawl
                {
                    workingRobots.decrementAndGet();
                    while (true) {
                        if (workingRobots.intValue() == 0) {
                            break mainLoop;
                        } else if (this.toCrawlPages.size() > 0) {
                            workingRobots.incrementAndGet();
                            break;
                        }
                    }
                }

                String currentURL;
                synchronized (this.toCrawlPages) {
                    currentURL = toCrawlPages.remove();
                }
                List<String> addedURLS = new ArrayList<>();
                // TODO: check for Robot.txt to see if I am allowed to visit this URL
                if (!isVisitedURL(currentURL))
                    if (isHTML(currentURL)) {
                        // download the page and add the links inside it to the "to crawl" queue
                        System.out.println("CURRENT URL: " + currentURL);
                        System.out.println("Being DOWNLOADED BY ROBOT: " + Thread.currentThread().getName());
                        try {
                            Document doc = downloadPage(currentURL);
                            if (doc != null) {
                                synchronized (this.crawledPages) {
                                    this.crawledPages.add(currentURL);
                                }
                                AddMoreURLSToCrawl(doc);
                            }
                        } catch (IOException e) {
                            System.out.println("DONLOADING INTERRUPTED");
                        }

                    }

            }
        }

    }

}
