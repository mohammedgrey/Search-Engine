package com.MFMM.server.controllers;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Hashtable;
import java.util.List;

import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import com.MFMM.server.models.QueryResult;
import com.MFMM.server.Modules.Preprocessor;
import com.MFMM.server.database.Database;
import com.MFMM.server.helpers.Snippet;
import com.MFMM.server.models.Doc;
import com.MFMM.server.models.Docs;
import com.MFMM.server.models.History;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class VocabularyController {

    private MongoTemplate mongoTemplate;

    @Autowired
    public VocabularyController() {
        this.mongoTemplate = Database.template();
    }

    @GetMapping("/search")
    public List<QueryResult> search(@RequestParam(defaultValue = "") String q,
            @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int limit) {
        List<QueryResult> results = new ArrayList<>();
        String qString = "";
        try {
            qString = URLDecoder.decode(q, "UTF-8");
        } catch (UnsupportedEncodingException e) {
        }
        this.mongoTemplate.save(new History(qString), "history");

        String[] toSearchWords = Preprocessor.preprocessing(qString);

        if (toSearchWords.length == 0)
            return Collections.emptyList();

        List<Criteria> orList = new ArrayList<Criteria>();
        for (String word : toSearchWords)
            orList.add((new Criteria()).and("word").is(word));

        List<Doc> docs = this.mongoTemplate
                .find(new Query((new Criteria()).orOperator(orList.toArray(new Criteria[orList.size()])))
                        .skip((page - 1) * limit).limit(limit), Doc.class);
        Hashtable<String, List<String>> UrlkeyWords = new Hashtable<String, List<String>>();
        for (int i = 0; i < docs.size(); i++) {
            Doc result = docs.get(i);
            List<String> listKeywords = UrlkeyWords.getOrDefault(result.url, null);
            if (listKeywords == null) {
                List<String> arrayKeyWords = new ArrayList<>();
                arrayKeyWords.add(result.word);
                UrlkeyWords.put(result.url, arrayKeyWords);
            } else
                listKeywords.add(result.word);
        }
        for (String url : UrlkeyWords.keySet()) {
            Docs Documentpage = mongoTemplate.findById(url, Docs.class);
            List<String> keywords = UrlkeyWords.get(url);
            results.add(new QueryResult(Documentpage._id, Documentpage.title,
                    new Snippet().getSnippet(Documentpage.text.split("\\s+"), keywords), Documentpage.website,
                    keywords));
        }
        return results;
    }

}
