package com.MFMM.server.database;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

import org.springframework.data.mongodb.core.MongoTemplate;

public class Database {

    public static MongoTemplate template() {
        ConnectionString connString = new ConnectionString(System.getenv("searchEngineDbURI"));
        MongoClientSettings settings = MongoClientSettings.builder().applyConnectionString(connString).retryWrites(true)
                .build();
        MongoClient mongoClient = MongoClients.create(settings);
        return new MongoTemplate(mongoClient, "searchEngine");
    }

}
