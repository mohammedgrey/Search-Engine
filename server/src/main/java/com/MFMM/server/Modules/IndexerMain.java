package com.MFMM.server.Modules;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

import com.MFMM.server.models.Docs;
import com.MFMM.server.models.DocsRepository;
import com.MFMM.server.models.VocabularyRepository;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

import org.jsoup.*;
import org.jsoup.helper.*;
import org.jsoup.nodes.*;
import org.jsoup.select.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;

public class IndexerMain {

    public static void main(String[] args) throws IOException {
        Indexer vocab = new Indexer("server/src/main/java/com/MFMM/server/documents");
        vocab.indexDocuments();
        // vocab.printDocuments();
    }

    static final class Indexer {
        // Members
        File[] listOfFiles;
        Hashtable<String, List<String>> docToWords = new Hashtable<String, List<String>>();
        // private final VocabularyRepository vocabularyRepo;
        // private final DocsRepository docsRepo;
        MongoClient mongoClient;

        public Indexer(String pathToResources) {
            File resourceFolder = new File(pathToResources);
            listOfFiles = resourceFolder.listFiles();
            System.out.println(System.getenv("searchEngineDbURI"));
            ConnectionString connString = new ConnectionString(System.getenv("searchEngineDbURI"));
            MongoClientSettings settings = MongoClientSettings.builder().applyConnectionString(connString)
                    .retryWrites(true).build();
            mongoClient = MongoClients.create(settings);
            // this.database = mongoClient.getDatabase("searchEngine");
        }

        void indexDocuments() throws IOException {
            for (File htmlFile : listOfFiles) {
                System.out.println("DOC:" + htmlFile.getName());
                Document doc = (Document) Jsoup.parse(htmlFile, "UTF-8");
                // -------------------------------get all p tags
                String documentURL = doc.baseUri();
                List<String> documentWords = new ArrayList<>();

                String words = doc.wholeText();
                for (String word : words.split(" "))
                    documentWords.add(word);

                this.docToWords.put(documentURL, documentWords);

                MongoTemplate template = new MongoTemplate(mongoClient, "searchEngine");
                template.save(new Docs(documentURL, documentWords), "docs");
                // docsRepo.save();
                break;
            }
        }

        void printDocuments() {
            docToWords.forEach((k, v) -> {
                System.out.println("URL: " + k);
                v.forEach(l -> System.out.println(l + " "));
            });
        }

    }

}
