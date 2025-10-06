package com.abramu.jakarta.services;

import java.math.BigDecimal;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CurrencySplitter {
    
    /**
     * Optimally splits a provided sum of money into banknotes and coins.
     * The possible values of all banknotes/coins must be provided in descending order, e.g. "5, 2, 1".
     * The result is a Map with the required banknote/coin values as keys.
     * The associated value is the required amount of that specific banknote/coin.
     * 
     * @param total The sum of money to be split.
     * @param currencyValues All values of the banknotes/coins that the total can be split into.
     * @return A Map containing the amount of all banknotes/coins the total has been split into.
     */
    public Map<BigDecimal, Integer> split(BigDecimal total, List<BigDecimal> currencyValues) {
        final var map = new HashMap<BigDecimal, Integer>();
        Optional<BigDecimal> remainder = Optional.empty();
        
        for (var currencyValue : currencyValues) {
            final var dividend = remainder.orElse(total);
            final var result = dividend.divideAndRemainder(currencyValue);
            final var quotient = result[0].intValue();
            final var newRemainder = result[1];
            
            if (quotient > 0) {
                map.put(currencyValue, quotient);
                remainder = Optional.of(newRemainder);
            }
        }

        return map;
    }
}
