package com.MFMM.server.controllers;

import java.util.List;

import com.MFMM.server.models.Docs;
import com.MFMM.server.models.DocsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DocsController {

    private final DocsRepository docsRepo;

    @Autowired
    public DocsController(DocsRepository docsRepo) {
        this.docsRepo = docsRepo;
    }

    @GetMapping("/documents")
    @CrossOrigin
    public List<Docs> getDocs() {
        return docsRepo.findAll();
    }

}
