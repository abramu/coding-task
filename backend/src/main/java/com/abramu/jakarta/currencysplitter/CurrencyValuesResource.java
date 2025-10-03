package com.abramu.jakarta.currencysplitter;

import java.util.List;

import org.eclipse.microprofile.config.inject.ConfigProperty;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("values")
public class CurrencyValuesResource {

    @Inject
    @ConfigProperty(name = "currency.values")
    private List<Double> valuesList;

    @GET
    @Produces({ MediaType.APPLICATION_JSON })
    public CurrencyValues values() {
        return new CurrencyValues(valuesList);
    }
}
