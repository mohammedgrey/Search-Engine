package com.MFMM.server.models;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.*;

@Document("history")
public class History {
    @Field
    public String sentence;

    public History() {
    }

    public History(String sentence) {
        this.sentence = sentence;
    }

}
