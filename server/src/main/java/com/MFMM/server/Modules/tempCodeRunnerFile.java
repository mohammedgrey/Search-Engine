
            // dfTable.forEach((word, df) -> {
            // Word prev;
            // try {
            // prev = mongoTemplate.findById(new Query(Criteria.where("_id").is(word)),
            // Word.class);
            // } catch (Exception e) {
            // prev = new Word(word, 0, 0);
            // }
            // mongoTemplate.upsert(new Query(Criteria.where("_id").is(word)),
            // new Update().set("df", df + prev.df).set("idf",
            // Math.log(Math.exp(prev.idf) * prev.df + listOfFiles.length)
            // / Double.valueOf(df + prev.df)),
            // "word");
            // });