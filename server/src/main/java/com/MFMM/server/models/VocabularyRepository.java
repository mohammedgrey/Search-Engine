package com.MFMM.server.models;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VocabularyRepository extends MongoRepository<Vocabulary, String> {

}
