package com.MFMM.server.controllers;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

import org.springframework.data.mongodb.core.query.Query;

import com.MFMM.server.models.QueryResult;
import com.MFMM.server.models.QueryResults;
import com.MFMM.server.Modules.Preprocessor;
import com.MFMM.server.database.Database;
import com.MFMM.server.helpers.ArrayStringMethods;
import com.MFMM.server.helpers.Snippet;
import com.MFMM.server.models.Doc;
import com.MFMM.server.models.Docs;
import com.MFMM.server.models.History;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.web.bind.annotation.CrossOrigin;
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
    @CrossOrigin
    public QueryResults search(@RequestParam(defaultValue = "") String q, @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit) {
        List<QueryResult> results = new ArrayList<>();
        String qString = "";
        try {
            qString = URLDecoder.decode(q, "UTF-8");
        } catch (UnsupportedEncodingException e) {
        }

        String[] toSearchWords = Preprocessor.preprocessing(qString);

        if (toSearchWords.length == 0)
            return new QueryResults(0, Collections.emptyList());

        List<Criteria> orList = new ArrayList<Criteria>();
        for (String word : toSearchWords)
            orList.add((new Criteria()).and("word").is(word));

        List<Doc> docs = this.mongoTemplate
                .find(new Query((new Criteria()).orOperator(orList.toArray(new Criteria[orList.size()]))), Doc.class);

        if (docs == null || docs.size() == 0)
            return new QueryResults(0, Collections.emptyList());

        // save to the history of all users
        try {
            this.mongoTemplate.insert(new History("" + qString.trim()), "history");
        } catch (Exception e) {
        }
        // Hashtable<String, List<String>> UrlkeyWords = new Hashtable<String,
        // List<String>>();
        // get the unique urls
        HashSet<String> URLsSet = new HashSet<String>();
        for (int i = 0; i < docs.size(); i++)
            URLsSet.add(docs.get(i).url);
        int totalResultsFound = URLsSet.size();
        System.out.println("Found urls number is " + totalResultsFound);

        // {
        // Doc result = docs.get(i);
        // List<String> listKeywords = UrlkeyWords.getOrDefault(result.url, null);
        // if (listKeywords == null) {
        // List<String> arrayKeyWords = new ArrayList<>();
        // arrayKeyWords.add(result.word);
        // UrlkeyWords.put(result.url, arrayKeyWords);
        // } else
        // listKeywords.add(result.word);
        // }

        List<Criteria> orURLs = new ArrayList<Criteria>();
        for (String url : URLsSet)
            orURLs.add((new Criteria()).and("_id").is(url));

        List<Docs> Documentpages = this.mongoTemplate
                .find(new Query((new Criteria()).orOperator(orURLs.toArray(new Criteria[orURLs.size()]))).limit(limit)
                        .skip((page - 1) * limit), Docs.class);

        for (Docs Documentpage : Documentpages) {
            // Docs Documentpage = null;
            // try {
            // Documentpage = mongoTemplate.findById(url, Docs.class);
            // } catch (Exception e) {
            // }
            // if (Documentpage != null) {
            // List<String> keywords = UrlkeyWords.get(url);

            // get the original and missing keywords from the stemmed ones
            // List<String> originalKeyWords = new ArrayList<>();
            // List<String> missingKeyWords = new ArrayList<>();

            // for (String wordSearched : qString.split("\\s+")) {
            // String[] potentialWords = Preprocessor.preprocessing(wordSearched);
            // if (potentialWords.length != 0)
            // if (keywords.contains(potentialWords[0]))
            // originalKeyWords.add(wordSearched);
            // else
            // missingKeyWords.add(wordSearched);
            // }

            results.add(new QueryResult(Documentpage._id, Documentpage.title, new Snippet().getSnippet(
                    ArrayStringMethods.concatArrays(Documentpage.title.replaceAll("\\<.*?\\>", "").split("\\s+"),
                            Documentpage.text.replaceAll("\\<.*?\\>", "").split("\\s+")),
                    Arrays.asList(ArrayStringMethods.concatArrays(toSearchWords, qString.split("\\s+")))),
                    Documentpage.website));

            // }

        }
        return new QueryResults(totalResultsFound, results);
    }

}
