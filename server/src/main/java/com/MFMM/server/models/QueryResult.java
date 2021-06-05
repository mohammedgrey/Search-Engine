package com.MFMM.server.models;

import java.util.List;

public class QueryResult {
    public String url;
    public String title;
    public String snippet;
    public String website;

    public QueryResult(String url, String title, String snippet, String website
    // , List<String> keywords,List<String> missing
    ) {
        this.url = url;
        this.title = title;
        this.snippet = snippet;
        this.website = website;
        // this.keywords = keywords;
        // this.missing = missing;
    }
}

// [
// {
// url:"",
// title:"",
// snippet:"",
// website:"",
// keywords:""
// }
// ]
