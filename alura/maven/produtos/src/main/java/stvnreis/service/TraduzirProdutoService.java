package stvnreis.service;

import space.dynomake.libretranslate.Language;
import space.dynomake.libretranslate.Translator;
import stvnreis.model.Produto;

public class TraduzirProdutoService {

    public void traduzir(Produto produto) {

        produto.setName(translateToPortuguese(produto.getName()));
        produto.setCategory(translateToPortuguese(produto.getCategory()));
        produto.setDescription(translateToPortuguese(produto.getDescription()));
    }

    String translateToPortuguese(String value) {

        return Translator.translate(Language.ENGLISH, Language.PORTUGUESE, value);
    }
}
