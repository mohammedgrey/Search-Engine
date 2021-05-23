package com.MFMM.server.models;

import java.util.Hashtable;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class Vocabulary {

  @Id
  private String _id;

  // @Field
  // private String word;
  @Field
  public List<Hashtable<String, String>> docs;

  public Vocabulary() {
  }

  // example={
  // word:"death",
  // links:[
  // {
  // 'id''https://www.killme.com'
  // 'p':2,
  // 'h1':1,
  // }
  // ]

  // }

  public Vocabulary(String word, List<Hashtable<String, String>> docs2) {
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
