package com.MFMM.server.models;

public class IndexerResult {
    public String word;
    public String URL;
    public boolean isHeader1;
    public boolean isHeader2;
    public boolean isHeader3;
    public boolean isHeader4;
    public boolean isHeader5;
    public boolean isHeader6;
    public boolean isTitle;
    public boolean isPlainText;

    public IndexerResult() {
    };

    public IndexerResult(String word, String URL, boolean isHeader1, boolean isHeader2, boolean isHeader3,
            boolean isHeader4, boolean isHeader5, boolean isHeader6, boolean isPlainText, boolean isTitle) {
        this.word = word;
        this.URL = URL;
        this.isHeader1 = isHeader1;
        this.isHeader2 = isHeader2;
        this.isHeader3 = isHeader3;
        this.isHeader4 = isHeader4;
        this.isHeader5 = isHeader5;
        this.isHeader6 = isHeader6;

        this.isPlainText = isPlainText;
        this.isTitle = isTitle;
    }
}
