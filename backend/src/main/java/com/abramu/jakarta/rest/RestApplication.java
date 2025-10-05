package com.abramu.jakarta.rest;

import jakarta.ws.rs.core.Application;
import jakarta.ws.rs.ApplicationPath;

import org.eclipse.microprofile.openapi.annotations.OpenAPIDefinition;
import org.eclipse.microprofile.openapi.annotations.info.Info;

@OpenAPIDefinition(
    info = @Info(
        title = "coding-task-backend API",
        version = "0.0.1",
        description = "Generated OpenAPI documentation"
    )
)
@ApplicationPath("api")
public class RestApplication extends Application {}
