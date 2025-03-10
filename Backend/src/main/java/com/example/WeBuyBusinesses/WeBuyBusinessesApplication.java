package com.example.WeBuyBusinesses;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.example.WeBuyBusinesses")
public class WeBuyBusinessesApplication {

	public static void main(String[] args) {
		SpringApplication.run(WeBuyBusinessesApplication.class, args);
	}

}
