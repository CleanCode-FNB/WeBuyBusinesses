package com.example.webuybusinesses.Dto;

import lombok.Data;

@Data
public class CreateSellerBusinessDto {
    private String businessName;
    private String category;
    private double price;
    private double annualRevenue;
    private String location;
    private String trend;
}
