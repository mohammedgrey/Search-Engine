package com.MFMM.server.models;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("docs")
public class Docs {

    @Id
    private String _id; // url
    @Field
    private List<String> words;
    @Field
    private String title;
    @Field
    private String text;
    @Field
    private String website;

    public Docs() {
    }

    public Docs(String url, List<String> words, String title, String text, String website) {
        this._id = url;
        this.words = words;
        this.title = title;
        this.text = text;
        this.website = website;
    }

    public String getURL() {
        return this._id;
    }

    public void setURL(String URL) {
        this._id = URL;
    }

}