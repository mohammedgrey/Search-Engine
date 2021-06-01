package com.MFMM.server.controllers;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

import org.springframework.data.mongodb.core.query.Query;

import com.MFMM.server.models.QueryResult;
import com.MFMM.server.Modules.Preprocessor;
import com.MFMM.server.database.Database;
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
    public List<QueryResult> search(@RequestParam String q) {
        List<QueryResult> results = new ArrayList<>();
        String qString = "";
        try {
            qString = URLDecoder.decode(q, "UTF-8");
        } catch (UnsupportedEncodingException e) {
        }
        this.mongoTemplate.save(new History(qString), "history");
        String[] toSearchWords = Preprocessor.preprocessing(qString);
        List<Criteria> orList = new ArrayList<Criteria>();
        for (String word : toSearchWords)
            orList.add((new Criteria()).and("word").is(word));
        List<Doc> docs = this.mongoTemplate
                .find(new Query((new Criteria()).orOperator(orList.toArray(new Criteria[orList.size()]))), Doc.class);
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
            Docs page = mongoTemplate.findById(url, Docs.class);
            List<String> keywords = UrlkeyWords.get(url);
            results.add(new QueryResult(page._id, page.title, getSnippet(page.text, keywords), page.website, keywords));
        }
        return results;

    }

    private String getSnippet(String wholeText, List<String> keywords) {
        // TODO: Find a snippet from the wholeText that contains most of the key words
        // and resturn it instead of the wholeText
        return wholeText;
    }

}
