package com.MFMM.server.helpers;

import java.util.Hashtable;
import java.util.Arrays;
import java.util.List;

public class URIHandler {
	Hashtable<String,Integer> vocab_to_code;
    Hashtable<Integer,String> code_to_vocab;
    String[] alphabet = {"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","=","/","-",".","?",":","@","0","1","2","3","4","5","6","7","8","9","A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z","<",">","'","^",";","°","\\","","!","\"","#","$","%","&","'","£","(",")","[","]","*","+",",","{","|","}","~","¡","¢","£","¥"};
    
    
    public URIHandler()
    {
        Integer counter = Integer.valueOf(0);
        vocab_to_code = new Hashtable<String,Integer>();
        code_to_vocab = new Hashtable<Integer,String>();
        for (int i = 0; i < alphabet.length; i++) {
            vocab_to_code.put(alphabet[i], counter);
            code_to_vocab.put(counter,alphabet[i]);
            counter++;
        }
    } 
    
    public static String normalizeURI(String url)
    {
        String copyString = url;

        // Removing space
        url = url.strip();

        // Lowering case the url
        url = url.toLowerCase();
        
        int prevLength = url.length();
        // Removing https/http
        url = url.replace("https://", "");
        String prefix;
        if(prevLength != url.length())
        {
            prefix = "https://";
        } 
        else
        {
            url = url.replace("http://", "");
            if(prevLength != url.length())
            {
                prefix = "http://";
            }
            else
            {
                prefix = "";
            }
        }

        if(prefix.length() != 0) copyString = copyString.substring(prefix.length());
        prefix = prefix.replace("https://", "http://"); //Limitting protocols
        

        // Removing www.
        prevLength = url.length();
        url = url.replace("www.", "");
        if(prevLength != url.length()) copyString = copyString.substring(4);
        
        // Regain User and passwords in url
        String [] splittedUrl = url.split("@");
        if(splittedUrl.length > 1)
        {
            url = copyString.split("@")[0] + "@";
            for (int i = 1; i < splittedUrl.length; i++) {
                url += splittedUrl[i];
            }
        }

        // Remove index.html
        url = url.replace("index.html", "");

        // Replace duplicate slashes
        url = url.replace("//", "/");

        // Removing Fragments
        url = url.split("#")[0];

        // Removing Default port 80
        url = url.replace(":80", "");

        // Query paramaters
        String [] queryAndParamters =  url.split("\\?");
        if(queryAndParamters.length > 1)
        {
            // Sotring paramters
            List<String> parametersList = Arrays.asList(queryAndParamters[1].split("&"));
            java.util.Collections.sort(parametersList);

            url = queryAndParamters[0] + "?";
            for (String param : parametersList) {
                url += param + "&";
            }
        }
        else
        {
            url = url.replace("\\?", "");
        }

        // Remove double dots
        url = url.replace("/..", "");

        // Add / 
        if (url.charAt(url.length()-1) != '/') url += '/';

        
        return  prefix + url;
    }
    
    public String encode(String txt)
    {
        StringBuilder numbersString = new StringBuilder();
        for (int i = 0; i < txt.length(); i++) {
            String value = String.valueOf(vocab_to_code.get(String.valueOf(txt.charAt(i))));
            if(value.length() == 1) value = "0" + value ;
            numbersString.append(value); 
        }
            
        return numbersString.toString();
    }
    
    public String decode(String txt)
    {
        StringBuilder numbersString = new StringBuilder();
        for (int i = 0; i < txt.length() - 1; i+=2) {
            numbersString.append(String.valueOf(code_to_vocab.get(Integer.parseInt(txt.substring(i, i+2))))); 
        }
            
        return numbersString.toString();
    }
    
}
