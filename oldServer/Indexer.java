import java.io.*;
import org.jsoup.*;
import org.jsoup.helper.*;
import org.jsoup.nodes.*;
import org.jsoup.select.*;
import java.util.*;

public class Indexer
{
    public static void main(String[] args) throws IOException {
        Vocabulary vocab = new Vocabulary("server/resources");
        vocab.ReadHTML();
        vocab.PrintDic();
    }   

    static final class Vocabulary
    {
        // Members
        File[] listOfFiles;
        Hashtable<String, Vector<String>> wordToDoc = new Hashtable<String, Vector<String>>();

        // Methods
        public Vocabulary(String pathToResources) {
            File resourceFolder = new File(pathToResources);
            listOfFiles = resourceFolder.listFiles();
            // for (int i = 0; i < listOfFiles.length; i++) {
            //     if (listOfFiles[i].isFile()) {
            //       System.out.println("File " + listOfFiles[i].getPath());
            //     } else if (listOfFiles[i].isDirectory()) {
            //       System.out.println("Directory " + listOfFiles[i].getName());
            //     }
            //   }
        }

        void ReadHTML() throws IOException
        {
            for (File htmlFile : listOfFiles) {
                System.out.println("DOC:" + htmlFile.getName());
                Document doc = Jsoup.parse(htmlFile, "UTF-8");
                Elements pTags = doc.getElementsByTag("p");
                for (Element pTag : pTags) {
                    for (String word : pTag.text().split(" ")) {
                        Vector<String> docs = wordToDoc.get(word);
                        if(docs == null)
                        {
                            docs = new Vector<String>();
                            wordToDoc.put(word,docs);                           
                        }  
                        if(! docs.contains(htmlFile.getName())) docs.add(htmlFile.getName());                          
                    } 
                }
            }
        }

        void PrintDic()
        {
            wordToDoc.forEach((k,v) -> {
                System.out.println("WORD: "+k);
                v.forEach(l -> System.out.println("   DOC: " + l));
            });
        }
    }
}