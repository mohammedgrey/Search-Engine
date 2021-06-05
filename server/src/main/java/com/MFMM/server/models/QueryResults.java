package com.MFMM.server.models;

import java.util.List;

public class QueryResults {

    public int totalResultsFound;
    public List<QueryResult> results;

    public QueryResults(int totalResultsFound, List<QueryResult> results) {
        this.totalResultsFound = totalResultsFound;
        this.results = results;
    }

}
