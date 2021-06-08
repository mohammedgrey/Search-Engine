package com.MFMM.server.helpers;

import java.util.ArrayList;
import java.util.List;

public class ArrayStringMethods {
    // from https://www.javatpoint.com/how-to-merge-two-arrays-in-java
    public static String[] concatArrays(String[] firstArray, String[] secondArray) {
        int fal = firstArray.length; // determines length of firstArray
        int sal = secondArray.length; // determines length of secondArray
        String[] result = new String[fal + sal]; // resultant array of size first array and second array
        System.arraycopy(firstArray, 0, result, 0, fal);
        System.arraycopy(secondArray, 0, result, fal, sal);
        return result;
    }

    public static List<String> concatLists(List<String> l1, List<String> l2) {
        List<String> newList = new ArrayList<String>(l1);
        newList.addAll(l2);
        return newList;
    }

}
