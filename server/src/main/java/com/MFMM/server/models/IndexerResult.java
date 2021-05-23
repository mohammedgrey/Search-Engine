package com.MFMM.server.models;

public class IndexerResult {
    public String word;
    public String URL;
    public boolean isHeader;

    public IndexerResult() {
    };

    public IndexerResult(String word, String URL, boolean isHeader) {
        this.word = word;
        this.URL = URL;
        this.isHeader = isHeader;
    }
}
