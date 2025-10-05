package com.abramu.jakarta.rest;

import java.math.BigDecimal;
import java.util.Map;

import com.abramu.jakarta.services.CurrencySplitter;
import com.abramu.jakarta.services.CurrencyValues;

import jakarta.inject.Inject;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

@Path("split")
public class CalculationResource {

    @Inject
    private CurrencyValues currencyValues;

    @Inject
    private CurrencySplitter currencySplitter;

    @GET
    @Produces({ MediaType.APPLICATION_JSON })
    public Map<BigDecimal, Integer> splitTotal(
        @NotNull
        @Digits(integer=7, fraction=2)
        @DecimalMin("0.01")
        @DecimalMax("1000000")
        @QueryParam("total")
        BigDecimal total
    ) {
        return currencySplitter.split(total, currencyValues.getValues());
    }
}
