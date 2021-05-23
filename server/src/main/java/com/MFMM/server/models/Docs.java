package com.MFMM.server.models;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class Docs {

    @Id
    private String id;

    @Field
    private String URL;
    @Field
    private List<String> words;

    public Docs() {
    }

    public Docs(String URL, List<String> words) {
        this.URL = URL;
        this.words = words;
    }

    public String getURL() {
        return this.URL;
    }

    public void setURL(String URL) {
        this.URL = URL;
    }

}