package com.abramu.jakarta.hello;

import java.util.List;

import org.eclipse.microprofile.config.inject.ConfigProperty;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

@Path("values")
public class HelloWorldResource {

    @Inject
    @ConfigProperty(name = "currency.values")
    private List<Double> currencyValues;

    @GET
    @Produces({ MediaType.APPLICATION_JSON })
    public Hello values(@QueryParam("name") String name) {
        return new Hello(currencyValues);
    }
}
