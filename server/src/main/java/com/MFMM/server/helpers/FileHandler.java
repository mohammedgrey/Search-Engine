package com.MFMM.server.helpers;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class FileHandler {
    public static void writeToFile(List<String> data, String filePath) throws IOException {
        BufferedWriter writer = new BufferedWriter(new FileWriter(filePath));
        for (String line : data)
            writer.write(line + "\n");
        writer.close();
    }

    public static void writeToFile(Queue<String> data, String filePath) throws IOException {
        BufferedWriter writer = new BufferedWriter(new FileWriter(filePath));
        for (String line : data)
            writer.write(line + "\n");
        writer.close();
    }

    public static Collection<String> readFromFile(String filePath, int type) throws IOException {
        if (type == 0) {
            List<String> listRead = new ArrayList<>();
            BufferedReader buffReader = new BufferedReader(new InputStreamReader(new FileInputStream(filePath)));
            String line = buffReader.readLine();
            while (line != null) {
                listRead.add(line);
                line = buffReader.readLine();
            }
            buffReader.close();
            return listRead;
        } else {
            Queue<String> queueRead = new LinkedList<>();
            BufferedReader buffReader = new BufferedReader(new InputStreamReader(new FileInputStream(filePath)));
            String line = buffReader.readLine();
            while (line != null) {
                queueRead.add(line);
                line = buffReader.readLine();
            }
            buffReader.close();
            return queueRead;
        }

    }

    // public static Queue<String> readFromFile(String filePath) throws IOException
    // {

    // Queue<String> queueRead = new LinkedList<>();
    // BufferedReader buffReader = new BufferedReader(new InputStreamReader(new
    // FileInputStream(filePath)));
    // String line = buffReader.readLine();
    // while (line != null) {
    // queueRead.add(line);
    // line = buffReader.readLine();
    // }
    // buffReader.close();
    // return queueRead;
    // }
}
