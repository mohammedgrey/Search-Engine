package com.MFMM.server.helpers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.bson.Document;

import com.MFMM.server.database.Database;
import com.MFMM.server.models.Docs;
import com.MFMM.server.models.Word;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;

public class DfRestore {
    public static void main(String[] args) {
        DfRestore DfRestoreAgent = new DfRestore();
        DfRestoreAgent.OneShotDFidf();

    }

    MongoTemplate mongoTemplate;
    MongoCollection<Document> collection;
    MongoDatabase database;

    public DfRestore() {
        MongoClient mongoClient = Database.getMongoClient();
        database = mongoClient.getDatabase("searchEngine");
        collection = database.getCollection("word");
        mongoTemplate = Database.template();
    }

    public void OneShotDFidf() {
        Aggregation count = Aggregation.newAggregation(project("$word"), group("$word").count().as("df"));
        Integer documentsNum = Integer.valueOf(mongoTemplate.findAll(Docs.class).size());
        AggregationResults<Document> output = mongoTemplate.aggregate(count, "doc", Document.class);
        List<Word> wordsToGetDFTo = new ArrayList<>(documentsNum);
        for (Document doc : output.getMappedResults())
            wordsToGetDFTo.add(new Word(doc.getString("_id"), doc.getInteger("df"),
                    Math.log(documentsNum / Double.valueOf(doc.getInteger("df")))));
        mongoTemplate.insert(wordsToGetDFTo, "word");
        // for (Document doc : output.getMappedResults()) {

        // mongoTemplate.upsert(new
        // Query(Criteria.where("_id").is(doc.getString("_id"))),
        // new Update().set("df", doc.getInteger("df")).set("idf",
        // Math.log(documentsNum / Double.valueOf(doc.getInteger("df")))),
        // "word");
        // }
    }
}
