package com.example.WeBuyBusinesses.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.WeBuyBusinesses.Model.Buyer;
import com.example.WeBuyBusinesses.Repository.BuyerRepository;

@Service
public class BuyerService {

    @Autowired
    private BuyerRepository buyerRepository;

    // Get all buyers
    public List<Buyer> getAllBuyers() {
        return buyerRepository.findAll();
    }

    // Get buyer by ID
    public Optional<Buyer> getBuyerById(Long id) {
        return buyerRepository.findById(id);
    }

    // Add new buyer
    public Buyer addBuyer(Buyer buyer) {
        return buyerRepository.save(buyer);
    }

    // Update existing buyer
    public Buyer updateBuyer(Long id, Buyer buyerDetails) {
        Optional<Buyer> buyerOptional = buyerRepository.findById(id);
        if (buyerOptional.isPresent()) {
            Buyer buyer = buyerOptional.get();
            buyer.setName(buyerDetails.getName());
            buyer.setEmail(buyerDetails.getEmail());
            buyer.setPhoneNumber(buyerDetails.getPhoneNumber());
            buyer.setAddress(buyerDetails.getAddress());
            return buyerRepository.save(buyer);
        } else {
            return null;
        }
    }

    // Delete buyer
    public void deleteBuyer(Long id) {
        buyerRepository.deleteById(id);
    }
}