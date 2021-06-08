package com.MFMM.server.helpers;

import java.util.*;

import com.MFMM.server.database.Database;
import com.MFMM.server.models.Docs;

import org.springframework.data.mongodb.core.MongoTemplate;

public class IndexerState {

    public static void main(String[] args) {
        IndexerState manageIndexerState = new IndexerState();
        manageIndexerState.moveDocumentsToIndexed();

    }

    MongoTemplate mongoTemplate;

    public IndexerState() {
        mongoTemplate = Database.template();
    }

    public void moveDocumentsToIndexed() {
        List<Docs> resultsFound = this.mongoTemplate.findAll(Docs.class);
        for (Docs result : resultsFound) {
            FileHandler.moveFileWhenIndexed(new URIHandler().encode(result._id) + ".html");
        }
    }
}
