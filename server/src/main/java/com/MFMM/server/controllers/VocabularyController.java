package com.MFMM.server.controllers;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Hashtable;
import java.util.List;
import java.util.Optional;

import com.MFMM.server.models.Docs;
import com.MFMM.server.models.DocsRepository;
import com.MFMM.server.models.IndexerResult;
import com.MFMM.server.models.Vocabulary;
import com.MFMM.server.models.VocabularyRepository;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.*;

@RestController
public class VocabularyController {

    private final VocabularyRepository vocabularyRepo;

    @Autowired
    public VocabularyController(VocabularyRepository vocabularyRepo) {
        this.vocabularyRepo = vocabularyRepo;
    }

    @GetMapping("/words")
    public List<Vocabulary> getWords() {
        return vocabularyRepo.findAll();
    }

    @PostMapping("/words/add")
    public void addWord(@RequestBody IndexerResult indexerResult) {
        String word = indexerResult.word;
        // TODO: ADD preprocessing to the word here

        Optional<Vocabulary> vocabRepo = vocabularyRepo.findById(word);
        if (vocabRepo.isPresent()) {
            // if the word is alredy present we need to update the indexer
        } else {
            // if the word is not present then we will add it

            // TODO: insert the document in the Docs if it's not there
            // final DocsRepository docsRepo;
            // docsRepo.save(new Docs(indexerResult.URL,Arrays.asList(word)))
            Hashtable<String, String> doc = new Hashtable<String, String>();
            doc.put("id", indexerResult.word);
            doc.put("p", indexerResult.isHeader ? "0" : "1");
            doc.put("h1", indexerResult.isHeader ? "1" : "0");
            List<Hashtable<String, String>> docs = new ArrayList<>();
            docs.add(doc);
            vocabularyRepo.save(new Vocabulary(word, docs));
        }
    }
}
