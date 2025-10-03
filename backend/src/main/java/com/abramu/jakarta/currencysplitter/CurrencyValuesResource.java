package com.abramu.jakarta.currencysplitter;

import java.math.BigDecimal;
import java.util.List;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("values")
public class CurrencyValuesResource {

    @Inject
    private CurrencyValues currencyValues;

    @GET
    @Produces({ MediaType.APPLICATION_JSON })
    public List<BigDecimal> getCurrencyValues() {
        return currencyValues.getValues();
    }
}
