package stvnreis;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;

import com.opencsv.bean.CsvToBeanBuilder;

import stvnreis.model.Produto;

/**
 * @author stevenreis
 * @since 1.0 (28/05/25)
 */
public class Main {

    public static void main(String[] args) throws IOException {

        List<Produto> produtos = new CsvToBeanBuilder(new FileReader("src/main/resources/products.csv"))
                .withType(Produto.class)
                .build()
                .parse();

        for (var produto : produtos) {

            System.out.println(produto.getName());
        }
    }
}