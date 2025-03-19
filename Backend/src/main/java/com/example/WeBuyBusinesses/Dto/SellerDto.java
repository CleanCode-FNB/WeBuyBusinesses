package com.example.WeBuyBusinesses.Dto;

import lombok.Data;

@Data

public class SellerDto {
    private String businessName;
    private String category;
    private double price;
    private double annualRevenue;
    private String status;
    private String location;
    private String trend;
}
