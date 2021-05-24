package com.MFMM.server.controllers;

import java.util.List;

import com.MFMM.server.models.Vocabulary;
import com.MFMM.server.models.VocabularyRepository;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

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

}
