package com.example.WeBuyBusinesses.Model;

//import javax.persistence.Entity;
//import javax.persistence.Id;
import jakarta.persistence.*;

@Entity
public class Sell {

    @Id
    private String regCode; // Unique identifier for a business
    private double price;
    private int employees;
    private String customerStats;
    private String location;

    // Constructor
    public Sell(String regCode, double price, int employees, String customerStats, String location) {
        this.regCode = regCode;
        this.price = price;
        this.employees = employees;
        this.customerStats = customerStats;
        this.location = location;
    }

    // Getters and Setters
    public String getRegCode() {
        return regCode;
    }

    public void setRegCode(String regCode) {
        this.regCode = regCode;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getEmployees() {
        return employees;
    }

    public void setEmployees(int employees) {
        this.employees = employees;
    }

    public String getCustomerStats() {
        return customerStats;
    }

    public void setCustomerStats(String customerStats) {
        this.customerStats = customerStats;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return "Sell{" +
               "regCode='" + regCode + '\'' +
               ", price=" + price +
               ", employees=" + employees +
               ", customerStats='" + customerStats + '\'' +
               ", location='" + location + '\'' +
               '}';
    }
}
