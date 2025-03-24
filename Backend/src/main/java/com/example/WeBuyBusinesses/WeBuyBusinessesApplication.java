package com.example.webuybusinesses;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@EnableJpaRepositories("com.example.webuybusinesses.Repository")
public class WebuybusinessesApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebuybusinessesApplication.class, args);
	}

}
