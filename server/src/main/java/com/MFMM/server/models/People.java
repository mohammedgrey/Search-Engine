package com.MFMM.server.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class People {

  
  @Id private String id;

  @Field private String firstName;
  @Field private String lastName;

  public People(){}
  public People(String firstName,String lastName)
  {
      this.setFirstName(firstName);
      this.setLastName(lastName);
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }
  

}