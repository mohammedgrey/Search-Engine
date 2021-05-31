import java.util.*;
public class Preprocessor 
{
  public static void preprocessing(String searchQuery)
  {
    String result = searchQuery.replaceAll("\\p{Punct}", "");
    result = result.toLowerCase();
    String[] words = result.split(" ");
    for (int i = 0;i < words.length; i++) {
      System.out.println(words[i]);
    }
  }
}