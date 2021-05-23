package com.MFMM.server.models;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocsRepository extends MongoRepository<Docs, String> {

}
