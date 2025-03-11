package com.example.WeBuyBusinesses;

import java.util.ArrayList;
import java.util.List;

public class Sell {
    private double price;
    private double annualProfits;
    private String registrationCode;
    private int numberOfEmployees;
    private int customerStatistics;
    private String location;
    private String industry;
    private String description;
    private List<String> imageUrls;
    private List<String> messages;

    //Constructor
    public Sell(double price, double annualProfits, String registrationCode, int numberOfEmployees,
                int customerStatistics, String location, String industry, String description) {
        this.price = price;
        this.annualProfits = annualProfits;
        this.registrationCode = registrationCode;
        this.numberOfEmployees = numberOfEmployees;
        this.customerStatistics = customerStatistics;
        this.location = location;
        this.industry = industry;
        this.description = description;
        this.imageUrls = new ArrayList<>();
        this.messages = new ArrayList<>();
    }

    //Getters and Setters
    public double getPrice () { return price; }
    public void setPrice(double price) { this.price = price; }

    public double getAnnualProfits () { return annualProfits; }
    public void setAnnualProfits(double annualProfits) { this.annualProfits = annualProfits; }

    public String getRegistrationCode () { return registrationCode; }
    public void setRegistrationCode(String registrationCode) { this.registrationCode = registrationCode; }

    public int getNumberOfEmployees () { return numberOfEmployees; }
    public void setNumberOfEmployees(int numberOfEmployees) { this.numberOfEmployees = numberOfEmployees; }

    public int getCustomerStatistics() { return customerStatistics; }
    public void setCustomerStatistics(int customerStatistics) { this.customerStatistics = customerStatistics; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getIndustry() { return industry; }
    public void setIndustry(String industry) { this.industry = industry; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    // Image Upload Feature
    public void addImage(String imageUrl) {
        imageUrls.add(imageUrl);
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    // Messaging Feature
    public void sendMessage(String message) {
        messages.add(message);
    }

    public List<String> getMessages() {
        return messages;
    }
}

