package com.MFMM.server.Modules;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.MFMM.server.models.Doc;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

import org.jsoup.*;
import org.jsoup.nodes.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

public class IndexerMain {

    public static void main(String[] args) throws IOException {
        Indexer vocab = new Indexer("server/src/main/java/com/MFMM/server/documents");
        vocab.indexDocuments();
    }

    static final class Indexer {
        // Members
        File[] listOfFiles;
        MongoTemplate mongoTemplate;

        public Indexer(String pathToResources) {
            File resourceFolder = new File(pathToResources);
            listOfFiles = resourceFolder.listFiles();
            ConnectionString connString = new ConnectionString(System.getenv("searchEngineDbURI"));
            MongoClientSettings settings = MongoClientSettings.builder().applyConnectionString(connString)
                    .retryWrites(true).build();
            MongoClient mongoClient = MongoClients.create(settings);
            mongoTemplate = new MongoTemplate(mongoClient, "searchEngine");
        }

        public String getWebsiteName(Document doc) {
            for (Element element : doc.getElementsByTag("meta")) {
                String propertyAttr = element.attr("property");
                if (propertyAttr != null && propertyAttr.equals("og:site_name"))
                    return element.attr("content") == null ? "" : element.attr("content");
            }
            return "";
        }

        public void indexDocuments() throws IOException {
            for (File htmlFile : listOfFiles) {
                // System.out.println("DOC:" + htmlFile.getName());
                Document doc = (Document) Jsoup.parse(htmlFile, "UTF-8");
                String documentURL = doc.baseUri(); // TODO: replace this with the hashURL function
                List<String> documentWords = new ArrayList<>();
                String[] words = (doc.wholeText()).split("\\s+");
                // TODO: Add preprocessing to "words" here
                indexWords(doc, documentURL);
                for (String word : words)
                    documentWords.add(word);
                // Save persistently to the database
                mongoTemplate.upsert(
                        new Query(Criteria.where("_id").is(documentURL)), new Update().set("words", documentWords)
                                .set("title", doc.title()).set("text", doc.text()).set("website", getWebsiteName(doc)),
                        "docs");
                break;
            }
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
                for (String word : doc.title().split("\\s+"))
                    indexWord(word, url, type, vocab);
            else
                for (Element element : doc.getElementsByTag(type))
                    for (String word : element.text().split("\\s+"))
                        indexWord(word, url, type, vocab);
        }

        private void indexWords(Document doc, String url) {
            String[] types = { "p", "h1", "h2", "h3", "h4", "h5", "h6", "title" };
            List<Doc> vocab = new ArrayList<Doc>();
            for (String type : types)
                findWordsForType(doc, url, type, vocab);
            for (Doc insertme : vocab) // TODO .set("TF", withTheRightNumber)
                mongoTemplate.upsert(new Query(Criteria.where("url").is(url).and("word").is(insertme.word)),
                        new Update().set("p", insertme.p).set("h1", insertme.h1).set("h2", insertme.h2)
                                .set("h3", insertme.h3).set("h4", insertme.h4).set("h5", insertme.h5)
                                .set("h6", insertme.h6).set("title", insertme.title).set("TF", insertme.TF),
                        "doc");
        }
    }

}
// TODO implement IDF might need to add a field for it in Doc.java, but it will
// be a repeated number for several rows I guess. Not sure where it should be
// put in the code.
