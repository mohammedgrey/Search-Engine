package com.MFMM.server.Modules;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.regex.Pattern;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

public class CrawlerMain {
    public static void main(String[] args) throws IOException {

        Crawler crawler = new Crawler();
        crawler.crawlPages();
    }

    static final class Crawler {
        // Members
        // private File[] listOfFiles;
        private List<String> crawledPages;
        private Queue<String> toCrawlPages;
        private final int CRAWLING_LIMIT = 20;
        private final String NO_ROBOTS = "NO_ROBOTS";

        public Crawler() throws IOException {
            List<String> initialSeed = Arrays.asList();
            this.toCrawlPages = new LinkedList<>();
            for (String singleSeed : initialSeed)
                this.toCrawlPages.add(singleSeed);
            this.crawledPages = new ArrayList<>(CRAWLING_LIMIT);
            loadState();
            for (String state : this.toCrawlPages) {
                System.out.println(state);
            }

        }

        public String readRobotsTxt(String url) {
            Pattern p = Pattern.compile("^(http(s?)://([^/]+))");
            java.util.regex.Matcher m = p.matcher(url);
            if (m.find()) {
                System.out.println(m.group(1));
                try (InputStream in = new URL(m.group(1) + "/robots.txt").openStream()) {
                    return new String(in.readAllBytes());
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            return NO_ROBOTS;

        }

        // TODO: for now it reads the initial seed only but later it should read the
        // crawled pages and "to crawl" pages as well and start from them if they are
        // not empty
        private void loadState() throws IOException {
            String initialSeedPath = "server/src/main/java/com/MFMM/server/crawlerState/initialSeed.txt";
            BufferedReader buffReader = new BufferedReader(new InputStreamReader(new FileInputStream(initialSeedPath)));
            String line = buffReader.readLine();
            while (line != null) {
                toCrawlPages.add(line);
                line = buffReader.readLine();
            }
            buffReader.close();
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

        private boolean isHTML(String file) {
            return file.split(".")[1].toLowerCase().equals("html");
        }

        private boolean validURL(String url) {
            return url.startsWith("https://") || url.startsWith("http://");
        }

        private List<String> AddMoreURLSToCrawl(Document doc) {
            List<String> addedPages = new ArrayList<>();
            for (Element linkTag : doc.getElementsByTag("a")) {
                String hrefAttr = linkTag.attr("href");
                if (!validURL(hrefAttr))
                    continue;

                this.toCrawlPages.add(hrefAttr);
                addedPages.add(hrefAttr);
            }
            return addedPages;

        }

        private boolean isVisitedURL(String url) {
            // TODO: make this function check also for similar urls that aren't identical
            return this.crawledPages.contains(url);
        }

        // TODO:make this function work properly
        // Should implement one of the two cases:
        // 1) update the state after each page removed
        // 2) update the state only if the program terminates unexpectedly
        public void updateSate(String removedPage, List<String> addedPages) {
            // try {
            // FileWriter crawledWriter = new FileWriter(
            // "server/src/main/java/com/MFMM/server/crawlerState/crawled.txt");
            // FileWriter toCrawlWriter = new FileWriter(
            // "server/src/main/java/com/MFMM/server/crawlerState/toCrawl.txt");
            // BufferedWriter bwr1 = new BufferedWriter(crawledWriter);
            // BufferedWriter bwr2 = new BufferedWriter(toCrawlWriter);
            // PrintWriter pwr1 = new PrintWriter(bwr1);
            // PrintWriter pwr2 = new PrintWriter(bwr2);
            // for (String page : this.crawledPages) {
            // pwr1.println(page);
            // }

            // } catch (IOException ioe) {
            // ioe.printStackTrace();
            // }
        }

        // TODO: handle multithreading
        public void crawlPages() throws IOException {
            // keep crawling as long as we didn't reach the limit and there are more pages
            // to crawl
            while (this.crawledPages.size() != CRAWLING_LIMIT && this.toCrawlPages.size() != 0) {
                String currentURL = toCrawlPages.remove();

                List<String> addedURLS = new ArrayList<>();
                // TODO: check for Robot.txt to see if I am allowed to visit this URL
                if (!isVisitedURL(currentURL)) {

                    // download the page and add the links inside it to the "to crawl" queue
                    System.out.println("CURRENT URL" + currentURL);
                    Document doc = downloadPage(currentURL);
                    if (doc != null) {
                        this.crawledPages.add(currentURL);
                        addedURLS = AddMoreURLSToCrawl(doc);
                    }
                }
                // updateSate(currentURL, addedURLS);
            }
        }

        // public void downloadPage() throws Exception {
        // final Response response = Jsoup.connect("http://www.example.net").execute();
        // final Document doc = response.parse();

        // final File f = new File("filename.html");
        // FileUtils.writeStringToFile(f, doc.outerHtml(), StandardCharsets.UTF_8);
        // }

    }

}
