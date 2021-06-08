package com.MFMM.server.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

public class Word {
	@Id
	private String _id;

	@Field
	public Integer df;

	@Field
	public Double idf;

	public Word(String word, Integer df, Double idf) {
		this._id = word;
		this.df = df;
		this.idf = idf;
	}
}
