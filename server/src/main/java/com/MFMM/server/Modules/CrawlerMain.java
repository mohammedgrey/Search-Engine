package com.MFMM.server.Modules;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.Scanner;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.regex.Pattern;
import java.util.HashSet;
import java.util.regex.Matcher;
import com.MFMM.server.helpers.FileHandler;
import com.MFMM.server.helpers.URIHandler;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

public class CrawlerMain {
    public static void main(String[] args) throws IOException, InterruptedException {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the number of robots: ");
        int NUM_OF_ROBOTS = sc.nextInt();
        sc.close();

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
            robots[i].setName(Integer.toString(i + 1));
        }
        for (int i = 0; i < NUM_OF_ROBOTS; i++)
            robots[i].start();

        for (int i = 0; i < NUM_OF_ROBOTS; i++)
            robots[i].join();

        System.out.println("******************CRAWLING FINISHED******************");
    }

    static final class Crawler implements Runnable {
        // Members
        // private File[] listOfFiles;
        private HashSet<String> crawledPages;
        private Queue<String> toCrawlPages;
        private final int CRAWLING_LIMIT = 5000;
        private final String NO_ROBOTS = "NO_ROBOTS";
        AtomicInteger workingRobots;

        String baseDirectory = System.getProperty("user.dir").endsWith("Search-Engine") ? "server/src/" : "src/";

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

        public String difference(String str1, String str2) {
            if (str1 == null) {
                return str2;
            }
            if (str2 == null) {
                return str1;
            }
            int at = indexOfDifference(str1, str2);
            if (at == -1) {
                return null;
            }
            return str2.substring(at);
        }

        public int indexOfDifference(CharSequence cs1, CharSequence cs2) {
            if (cs1 == cs2) {
                return -1;
            }
            if (cs1 == null || cs2 == null) {
                return 0;
            }
            int i;
            for (i = 0; i < cs1.length() && i < cs2.length(); ++i) {
                if (cs1.charAt(i) != cs2.charAt(i)) {
                    break;
                }
            }
            if (i < cs2.length() || i < cs1.length()) {
                return i;
            }
            return -1;
        }

        public boolean IamAllowedToCrawl(String url) {
            // Useful article as a reference: https://moz.com/learn/seo/robotstxt
            Matcher matcher = Pattern.compile("^(http(s?)://([^/]+))").matcher(url);
            String path = "";
            if (matcher.find()) {
                String domain = matcher.group(1);
                path = difference(domain, url);
                System.out.println("path:" + path);
            }
            String robotsDotTxt = readRobotsTxt(url);
            String[] r = robotsDotTxt.split("User-Agent:\\s*|User-agent:\\s*|user-agent:\\s*|user-Agent:\\s*");
            String[] disallowed, allowed;
            for (int i = 0; i < r.length; i++) {
                if (r[i].length() != 0 && r[i].charAt(0) == '*') // User agents that the search engine bot belongs to
                {
                    String[] splitNewLine = r[i].split("\n");
                    for (int x = 0; x < splitNewLine.length; x++) {
                        disallowed = splitNewLine[x].split("Disallow:\\s+");
                        allowed = splitNewLine[x].split("Allow:\\s+");
                        for (int j = 0; j < allowed.length; j++) {
                            if (path.equals(allowed[j])) {
                                return true;
                            }
                        }
                        for (int j = 0; j < disallowed.length; j++) {
                            if (disallowed[j].length() != 0 && path.indexOf(disallowed[j]) != -1) {
                                return false;
                            }
                        }
                    }
                }
            }
            return true;
        }

        private void loadState() throws IOException {
            List<String> crawledPagesRead = (List<String>) FileHandler
                    .readFromFile(baseDirectory + "main/java/com/MFMM/server/crawlerState/crawled.txt", 0);
            if (crawledPagesRead.size() == 0) {
                // First time crawling ever
                List<String> initialSeed = (List<String>) FileHandler
                        .readFromFile(baseDirectory + "main/java/com/MFMM/server/crawlerState/initialSeed.txt", 0);
                this.toCrawlPages = new LinkedList<>();
                for (String singleSeed : initialSeed)
                    this.toCrawlPages.add(singleSeed);
                this.crawledPages = new HashSet<String>(CRAWLING_LIMIT);
                return;
            }
            // "Crawled before" load the state from the file
            Queue<String> toCrawlPagesRead = (Queue<String>) FileHandler
                    .readFromFile(baseDirectory + "main/java/com/MFMM/server/crawlerState/toCrawl.txt", 1);
            this.toCrawlPages = toCrawlPagesRead;
            this.crawledPages = new HashSet<String>(crawledPagesRead);
        }

        private Document downloadPage(String url) throws IOException {
            Document doc;
            try {
                doc = Jsoup.connect(url).get();
                URIHandler urlHandler = new URIHandler();
                String encodedUrl = urlHandler.encode(url);
                // System.out.println("Original url: " + url);
                // System.out.println("Encoded url: " + encodedUrl);
                // System.out.println("Decoded back url: " + urlHandler.decode(encodedUrl));
                saveHTMLFile(doc.html(), encodedUrl + ".html");
                return doc;
            } catch (MalformedURLException e) {
                return null;
            }

        }

        private void saveHTMLFile(String str, String fileName) throws IOException {
            BufferedWriter writer = new BufferedWriter(
                    new FileWriter(baseDirectory + "main/java/com/MFMM/server/documents/" + fileName));
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
                    this.toCrawlPages.add(URIHandler.normalizeURI(hrefAttr));
                }
            }
        }

        private boolean isVisitedURL(String url) {
            synchronized (this.crawledPages) {
                return this.crawledPages.contains(url);
            }
        }

        public void saveState() {
            try {
                FileHandler.writeToFile(crawledPages,
                        baseDirectory + "main/java/com/MFMM/server/crawlerState/crawled.txt");
                FileHandler.writeToFile(toCrawlPages,
                        baseDirectory + "main/java/com/MFMM/server/crawlerState/toCrawl.txt");
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

                if (!isVisitedURL(currentURL))
                    if (isHTML(currentURL))
                        if (IamAllowedToCrawl(currentURL)) {
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
                            }
                        }
            }
        }

    }

}
