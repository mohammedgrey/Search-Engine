package com.MFMM.server.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.*;

@Document("history")
public class History {
    @Id
    public String _id;

    public History() {
    }

    public History(String sentence) {
        this._id = sentence;
    }
}
