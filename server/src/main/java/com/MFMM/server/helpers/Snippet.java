import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.HashSet;
import java.util.Hashtable;

public class snippetGetter {
    final Integer STRING_MIN_WORDS = 40;
    final Integer STRING_MIN_LENGTH = STRING_MIN_WORDS * 5;

    private String getStringOfQueue(Queue<String> queue, Integer end) {
        Integer limitCounter = Integer.valueOf(0);
        StringBuilder result = new StringBuilder();
        for (String word : queue) {
            if (limitCounter == end)
                break;
            result.append(word + " ");
            limitCounter++;
        }

        return result.toString().substring(0, result.length() - 1);
    }

    private String extendSnippet(String resultText, String[] wholeText, Integer startIndex, Integer numberOfElements) {
        Integer counter = Integer.valueOf(0);
        if (startIndex != 0) {
            for (int i = startIndex - 1; i >= 0; i--) {
                resultText = wholeText[i] + " " + resultText;
                counter++;
                if (counter == STRING_MIN_WORDS)
                    return resultText;
            }
        }
        if (startIndex + numberOfElements < wholeText.length && counter != STRING_MIN_WORDS) {
            for (int i = startIndex + numberOfElements; i < wholeText.length; i++) {
                resultText = resultText + " " + wholeText[i];
                counter++;
                if (counter == STRING_MIN_WORDS)
                    return resultText;
            }
        }

        return resultText;
    }

    public String getSnippet(String[] wholeText, List<String> keywords) {

        // Initialize needed data structures
        Queue<String> matchQueue = new LinkedList<String>();
        Hashtable<String, Integer> processedKeyWords = new Hashtable<String, Integer>();
        HashSet<String> allKeyWords = new HashSet<String>(keywords);
        // Initialize result variables
        String result = new String("");
        Integer minSize = Integer.MAX_VALUE;
        Integer maxKeyWord = Integer.MIN_VALUE;
        Integer startIndex = 0;

        // Initialize Traversing variables
        boolean matchFound = false;
        boolean isKeyWord = false;
        Integer nonkeyWordSize = 0;
        Integer keyWordSize = 0;

        for (String word : wholeText) {

            // (1) Check if word is keyword
            isKeyWord = allKeyWords.contains(word);
            if (isKeyWord) {
                String currentNormalizingWord = word;
                /// (2.1) Check if the keyword is the left of queue
                Outloop: while (currentNormalizingWord.equals(matchQueue.peek())) {

                    // Store cuurent result as the best
                    if (matchQueue.size() - nonkeyWordSize < minSize && maxKeyWord <= keyWordSize) {
                        minSize = matchQueue.size() - nonkeyWordSize;
                        maxKeyWord = keyWordSize;
                        result = getStringOfQueue(matchQueue, minSize);
                    }

                    if (!currentNormalizingWord.equals(word) && processedKeyWords.get(currentNormalizingWord) == 1)
                        break;
                    //// (2.1.1) Remove the word from queue
                    boolean isNotKeyWord = true;
                    keyWordSize--;
                    while (isNotKeyWord) {
                        startIndex++;
                        matchQueue.remove();
                        if (matchQueue.isEmpty()) {
                            matchFound = false; // Don't insert to queue untill you find a keyword
                            break Outloop;
                        }
                        isNotKeyWord = !allKeyWords.contains(matchQueue.peek()); // Break if the word is a keyword
                    }
                    processedKeyWords.put(currentNormalizingWord, processedKeyWords.get(currentNormalizingWord) - 1); // Decrement
                                                                                                                      // current
                                                                                                                      // word
                                                                                                                      // counter
                    currentNormalizingWord = matchQueue.peek(); // New keyword to look for
                }

                /// (2.2) Add new keyword to hashtable
                processedKeyWords.put(word, processedKeyWords.getOrDefault(word, 0) + 1);
                keyWordSize++;
                matchFound = true;
                nonkeyWordSize = 0;
            } else {
                nonkeyWordSize++;
            }

            // (2) Inset to queue
            if (matchFound || isKeyWord)
                matchQueue.add(word);
        }

        // Check if the length is equal zero
        if (result.length() == 0 && matchQueue.size() != 0) {
            Integer counter = Integer.valueOf(0);
            StringBuilder snippetBuilder = new StringBuilder();
            for (String word : matchQueue) {
                snippetBuilder.append(word + " ");
                counter++;
                if (counter == STRING_MIN_WORDS) {
                    result = snippetBuilder.toString();
                    break;
                }
            }

            result = snippetBuilder.toString();
        } else if (result.length() == 0 && matchQueue.size() == 0) {
            Integer counter = Integer.valueOf(0);
            StringBuilder snippetBuilder = new StringBuilder();
            for (String word : wholeText) {
                snippetBuilder.append(word + " ");
                counter++;
                if (counter == STRING_MIN_WORDS) {
                    result = snippetBuilder.toString();
                    break;
                }
            }
        } else if (result.length() < STRING_MIN_LENGTH) // Check if the string is long enough
            return extendSnippet(result, wholeText, startIndex, minSize);

        return result;
    }
}
