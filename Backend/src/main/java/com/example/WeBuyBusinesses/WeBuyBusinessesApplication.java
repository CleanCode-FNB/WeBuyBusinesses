package com.example.WeBuyBusinesses;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.example.WeBuyBusinesses")
@EntityScan("com.example.WeBuyBusinesses.Model") 
public class WeBuyBusinessesApplication {

	public static void main(String[] args) {
		SpringApplication.run(WeBuyBusinessesApplication.class, args);
	}

}
