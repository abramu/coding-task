package com.abramu.jakarta.services;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;

class CurrencySplitterTest {
    
    @Test
    void testSplit() {
        final var currencySplitter = new CurrencySplitter();

        var result = currencySplitter.split(
            new BigDecimal("143.59"),
            asBigDecimals("200", "100", "50", "20", "10", "5", "2", "1", "0.5", "0.2", "0.1", "0.05", "0.02", "0.01")
        );
        var expected = Map.of("100", 1, "20", 2, "2", 1, "1", 1, "0.5", 1, "0.05", 1, "0.02", 2);
        assertEquals(expected, result);

        result = currencySplitter.split(
            new BigDecimal("100"),
            asBigDecimals("200")
        );
        expected = Map.of();
        assertEquals(expected, result);
    }

    List<BigDecimal> asBigDecimals(String ...values) {
        final var list = new ArrayList<BigDecimal>();
        
        for (var value : values) {
            list.add(new BigDecimal(value));
        }

        return list;
    }
}
