package com.MFMM.server.Modules;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Hashtable;

import com.MFMM.server.database.Database;
import com.MFMM.server.helpers.FileHandler;
import com.MFMM.server.helpers.URIHandler;
import com.MFMM.server.models.Doc;
import com.MFMM.server.models.Word;

import org.jsoup.*;
import org.jsoup.nodes.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

public class IndexerMain {

    public static void main(String[] args) throws IOException, InterruptedException {
        String pathToDocuments = System.getProperty("user.dir").endsWith("Search-Engine")
                ? "server/src/main/java/com/MFMM/server/documents"
                : "src/main/java/com/MFMM/server/documents";
        int NUM_OF_ROBOTS = 150;
        Thread[] robots = new Thread[NUM_OF_ROBOTS];
        Indexer vocab = new Indexer(pathToDocuments, NUM_OF_ROBOTS);

        for (int i = 0; i < NUM_OF_ROBOTS; i++) {
            robots[i] = new Thread(vocab);
            robots[i].setName(Integer.toString(i));
        }
        for (int i = 0; i < NUM_OF_ROBOTS; i++)
            robots[i].start();

        for (int i = 0; i < NUM_OF_ROBOTS; i++)
            robots[i].join();

        // vocab.calculateDFs();
        // vocab.indexDocuments();
    }

    static final class Indexer implements Runnable {
        // Members
        File[] listOfFiles;
        Hashtable<String, Integer> dfTable;
        int numberOfRobots;
        MongoTemplate mongoTemplate;

        public Indexer(String pathToResources, int numberOfRobots) {
            File resourceFolder = new File(pathToResources);
            listOfFiles = resourceFolder.listFiles();
            dfTable = new Hashtable<String, Integer>();
            this.numberOfRobots = numberOfRobots;
            mongoTemplate = Database.template();
        }

        public String getWebsiteName(Document doc) {
            for (Element element : doc.getElementsByTag("meta")) {
                String propertyAttr = element.attr("property");
                if (propertyAttr != null && propertyAttr.equals("og:site_name"))
                    return element.attr("content") == null ? "" : element.attr("content");
            }
            return "";
        }

        @Override
        public void run() {

            for (int i = Integer
                    .parseInt(Thread.currentThread().getName()); i < listOfFiles.length; i += this.numberOfRobots) {

                if (i >= listOfFiles.length)
                    break;
                File htmlFile = listOfFiles[i];
                // System.out.println("DOC:" + htmlFile.getName());
                Document doc = null;
                try {
                    doc = (Document) Jsoup.parse(htmlFile, "UTF-8");
                } catch (IOException e) {
                }
                String fileName = htmlFile.getName();
                if (fileName.indexOf(".") > 0)
                    fileName = fileName.substring(0, fileName.lastIndexOf("."));
                String documentURL = (new URIHandler()).decode(fileName);
                List<String> documentWords = new ArrayList<>();
                String[] words = Preprocessor.preprocessing(doc.wholeText());
                for (String word : words)
                    documentWords.add(word);
                indexWords(doc, documentURL, documentWords.size());
                // Save persistently to the database
                mongoTemplate.upsert(
                        new Query(Criteria.where("_id").is(documentURL)), new Update().set("words", documentWords)
                                .set("title", doc.title()).set("text", doc.text()).set("website", getWebsiteName(doc)),
                        "docs");
                // move the indexed file to another folder
                FileHandler.moveFileWhenIndexed(fileName + ".html");
                // break;
            }
        }

        public void calculateDFs() {
            this.dfTable.forEach((word, df) -> {
                Word prev;
                try {
                    prev = mongoTemplate.findById(new Query(Criteria.where("_id").is(word)), Word.class);
                } catch (Exception e) {
                    prev = new Word(word, 0, 0);
                }
                mongoTemplate.upsert(new Query(Criteria.where("_id").is(word)),
                        new Update().set("df", df + prev.df).set("idf",
                                Math.log(Math.exp(prev.idf) * prev.df + listOfFiles.length)
                                        / Double.valueOf(df + prev.df)),
                        "word");
            });
        }

        private void indexWord(String word, String url, String type, List<Doc> vocab) {
            boolean wordNotFoundForThisURL = true;
            for (int i = 0; i < vocab.size(); i++)
                if (vocab.get(i).word.equals(word)) {
                    vocab.get(i).incrementType(type);
                    wordNotFoundForThisURL = false;
                    break;
                }
            if (wordNotFoundForThisURL)
                vocab.add(new Doc(url, word, type));
        }

        private void findWordsForType(Document doc, String url, String type, List<Doc> vocab) {
            if (type.equals("title"))
                for (String word : Preprocessor.preprocessing(doc.title()))
                    indexWord(word, url, type, vocab);
            else
                for (Element element : doc.getElementsByTag(type))
                    for (String word : Preprocessor.preprocessing(element.text()))
                        indexWord(word, url, type, vocab);
        }

        private void indexWords(Document doc, String url, Integer docSize) {
            String[] types = { "p", "h1", "h2", "h3", "h4", "h5", "h6", "title" };
            List<Doc> vocab = new ArrayList<Doc>();
            for (String type : types)
                findWordsForType(doc, url, type, vocab);
            for (Doc insertme : vocab) {
                insertme.TF = insertme.getTotal() / Double.valueOf(docSize);
                synchronized (this.dfTable) {
                    this.dfTable.put(insertme.word, dfTable.getOrDefault(insertme.word, 0) + 1);
                }
                mongoTemplate.upsert(new Query(Criteria.where("url").is(url).and("word").is(insertme.word)),
                        new Update().set("p", insertme.p).set("h1", insertme.h1).set("h2", insertme.h2)
                                .set("h3", insertme.h3).set("h4", insertme.h4).set("h5", insertme.h5)
                                .set("h6", insertme.h6).set("title", insertme.title).set("TF", insertme.TF),
                        "doc");
            }
        }
    }

}
