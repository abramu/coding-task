package com.abramu.jakarta.currencysplitter;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;

import org.eclipse.microprofile.config.inject.ConfigProperty;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class CurrencyValues {

    @Inject
    @ConfigProperty(name = "currency.values")
    private List<String> valuesList;

    /**
     * Returns a list of all banknote or coin values in descending order.
     * The values are sourced from a MicroProfile ConfigSource using the name "currency.values".
     * See https://download.eclipse.org/microprofile/microprofile-config-3.1/microprofile-config-spec-3.1.html#default_configsources.
     * 
     * @return A list of all currency values in descending order.
     */
    public List<BigDecimal> getValues() {
        return valuesList.stream()
            .map(BigDecimal::new)
            .sorted(Comparator.reverseOrder())
            .toList();
    }
}
