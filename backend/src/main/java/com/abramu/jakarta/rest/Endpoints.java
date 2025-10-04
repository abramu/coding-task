package com.abramu.jakarta.rest;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import com.abramu.jakarta.services.CurrencySplitter;
import com.abramu.jakarta.services.CurrencyValues;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

@Path("")
public class Endpoints {

    @Inject
    private CurrencyValues currencyValues;

    @Inject
    private CurrencySplitter currencySplitter;

    @GET
    @Produces({ MediaType.APPLICATION_JSON })
    @Path("values")
    public List<BigDecimal> getCurrencyValues() {
        return currencyValues.getValues();
    }

    @GET
    @Produces({ MediaType.APPLICATION_JSON })
    @Path("split")
    public Map<String, Integer> splitTotal(@QueryParam("total") BigDecimal total) {
        return currencySplitter.split(total, getCurrencyValues());
    }
}
