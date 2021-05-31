package com.MFMM.server.models;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.*;

@Document("doc")
public class Doc {
    @Field
    public String url; // url
    @Indexed
    public String word; // indexed
    @Field
    public int p;
    @Field
    public int h1;
    @Field
    public int h2;
    @Field
    public int h3;
    @Field
    public int h4;
    @Field
    public int h5;
    @Field
    public int h6;
    @Field
    public int title;
    @Field
    public double TF;

    public Doc() {
    }

    public Doc(String url, String word) {
        this.url = url;
        this.word = word;
        this.TF = 0;
        this.title = 0;
        this.h1 = 0;
        this.h2 = 0;
        this.h3 = 0;
        this.h4 = 0;
        this.h5 = 0;
        this.h6 = 0;
        this.p = 0;
    }

    public Doc(String url, String word, String type) {
        this(url, word);
        this.incrementType(type);
    }

    public void incrementType(String type) {

        switch (type) {
            case "h1":
                this.h1++;
                break;
            case "h2":
                this.h2++;
                break;
            case "h3":
                this.h3++;
                break;
            case "h4":
                this.h4++;
                break;
            case "h5":
                this.h5++;
                break;
            case "h6":
                this.h6++;
                break;
            case "p":
                this.p++;
                break;
            case "title":
                this.title++;
                break;

            default:
                break;
        }

    }
    
    public Integer getTotal()
    {
    	return this.h1 + this.h2 + this.h3 + this.h4 + this.h5 + this.h6 + this.p + this.title;
    }
    

    // example={
    // word:"death",
    // IDF: '2'
    // links:[
    // {
    // 'id''https://www.killme.com'
    // 'p':2,
    // 'h1':1,
    // 'TF':'3'
    // }
    // ]

    // }

}
