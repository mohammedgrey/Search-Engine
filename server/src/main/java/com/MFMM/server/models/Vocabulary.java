package com.MFMM.server.models;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("vocabulary")
public class Vocabulary {

  @Id
  private String _id;

  @Field
  public List<Doc> docs;

  public Vocabulary() {
  }

  public Vocabulary(String word, List<Doc> docs2) {
    this.docs = docs2;
    this._id = word;
  }

  public String getWord() {
    return _id;
  }

  public void setWord(String word) {
    this._id = word;
  }

}
