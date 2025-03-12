package com.example.WeBuyBusinesses;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

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

    // Constructor
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

    // Getters and Setters
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public double getAnnualProfits() { return annualProfits; }
    public void setAnnualProfits(double annualProfits) { this.annualProfits = annualProfits; }

    public String getRegistrationCode() { return registrationCode; }
    public void setRegistrationCode(String registrationCode) { this.registrationCode = registrationCode; }

    public int getNumberOfEmployees() { return numberOfEmployees; }
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

    // Main method 
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter business price (R): ");
        double price = scanner.nextDouble();

        System.out.println("Enter annual profits (R): ");
        double annualProfits = scanner.nextDouble();
        scanner.nextLine();  // Consume newline

        System.out.println("Enter registration code: ");
        String registrationCode = scanner.nextLine();

        System.out.println("Enter number of employees: ");
        int numberOfEmployees = scanner.nextInt();

        System.out.println("Enter customer statistics (e.g., total customers per year): ");
        int customerStatistics = scanner.nextInt();
        scanner.nextLine();  // Consume newline

        System.out.println("Enter business location: ");
        String location = scanner.nextLine();

        System.out.println("Enter business industry: ");
        String industry = scanner.nextLine();

        System.out.println("Enter business description: ");
        String description = scanner.nextLine();

        // Create a new Sell object with user inputs
        Sell business = new Sell(price, annualProfits, registrationCode, numberOfEmployees,
                customerStatistics, location, industry, description);

        // Display business details
        System.out.println("\n-----------------------------------------------------------------------");
        System.out.println("\n---- Business Details ----");
        System.out.println("Price: R" + business.getPrice());
        System.out.println("Annual Profits: R" + business.getAnnualProfits());
        System.out.println("Registration Code: " + business.getRegistrationCode());
        System.out.println("Number of Employees: " + business.getNumberOfEmployees());
        System.out.println("Customer Statistics: " + business.getCustomerStatistics());
        System.out.println("Location: " + business.getLocation());
        System.out.println("Industry: " + business.getIndustry());
        System.out.println("Description: " + business.getDescription());
        System.out.println("\n-----------------------------------------------------------------------");
        // Adding an image
        //System.out.println("\nEnter an image URL for the business: ");
       // String imageUrl = scanner.nextLine();
        //business.addImage(imageUrl);

        // Sending a message
        //System.out.println("Enter a message to the seller: ");
        //String message = scanner.nextLine();
        //business.sendMessage(message);

        // Display added images and messages
        //System.out.println("\nImage URLs: " + business.getImageUrls());
        //System.out.println("Messages: " + business.getMessages());

        scanner.close();
    }
}
