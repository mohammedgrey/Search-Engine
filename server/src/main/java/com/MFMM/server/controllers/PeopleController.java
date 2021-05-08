package com.MFMM.server.controllers;

import java.util.List;
import com.MFMM.server.models.People;
import com.MFMM.server.models.PeopleRepository;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.*;


@RestController
public class PeopleController {
    
    private final PeopleRepository peopleRepository;

    @Autowired
    public PeopleController(PeopleRepository peopleRepository)
    {
        this.peopleRepository = peopleRepository;
    }

    @GetMapping("/people")
    public List<People> getPeople(){
        return peopleRepository.findAll();
    }

    @PostMapping("/people/add")
    public void addPeople(@RequestBody People person){
        peopleRepository.save(person);
        // peopleRepository.save(new People("Mohammed","Saad"));
    }
}
