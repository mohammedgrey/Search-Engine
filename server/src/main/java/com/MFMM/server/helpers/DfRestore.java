package com.MFMM.server.helpers;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
//import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
//import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
//import org.springframework.data.mongodb.core.query.Criteria;
//import org.springframework.data.mongodb.core.query.Query;
//import org.springframework.data.mongodb.core.query.Update;
import org.bson.Document;

import com.MFMM.server.database.Database;
import com.MFMM.server.models.Docs;
//import com.MFMM.server.models.Word;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;
//import static org.springframework.data.mongodb.core.aggregation.ArithmeticOperators.*;
//import static org.springframework.data.mongodb.core.aggregation.ConditionalOperators.when;
//import static org.springframework.data.mongodb.core.query.Criteria.where;
//import  org.springframework.data.mongodb.core.MongoOperations;
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
        collection = database.getCollection("doc");
        mongoTemplate = Database.template();
    }

    public void OneShotDFidf() {      
    	Aggregation count = Aggregation.newAggregation(project("$word"),group("$word").count().as("df"));
    	Integer documentsNum = Integer.valueOf( mongoTemplate.findAll(Docs.class).size() );
    	AggregationResults<Document> output = mongoTemplate.aggregate(count, "doc", Document.class);
    	for(Document doc: output.getMappedResults()) {
               mongoTemplate.upsert(new Query(Criteria.where("_id").is(doc.getString("_id"))),
                       new Update().set("df",doc.getInteger("df")).set("idf",Math.log(documentsNum/ Double.valueOf(doc.getInteger("df")))),"word");
        }
    }
}

