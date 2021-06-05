package com.MFMM.server.controllers;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

import com.MFMM.server.database.Database;
import com.MFMM.server.models.History;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HistoryController {

    private MongoTemplate template;

    @Autowired
    public HistoryController() {
        template = Database.template();
    }

    @GetMapping("/history")
    @CrossOrigin
    public List<History> getHistory(@RequestParam(defaultValue = "") String q) {
        String qString = "";
        try {
            qString = URLDecoder.decode(q, "UTF-8");
        } catch (UnsupportedEncodingException e) {
        }
        Criteria regex = Criteria.where("_id").regex("^" + qString, "i");
        return template.find(new Query().addCriteria(regex).limit(10), History.class);
    }

}
