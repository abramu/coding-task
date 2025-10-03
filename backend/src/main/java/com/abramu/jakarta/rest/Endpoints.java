package com.abramu.jakarta.rest;

import java.math.BigDecimal;
import java.util.List;

import com.abramu.jakarta.services.CurrencyValues;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("")
public class Endpoints {

    @Inject
    private CurrencyValues currencyValues;

    @GET
    @Produces({ MediaType.APPLICATION_JSON })
    @Path("values")
    public List<BigDecimal> getCurrencyValues() {
        return currencyValues.getValues();
    }
}
