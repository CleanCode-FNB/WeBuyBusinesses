package com.example.WeBuyBusinesses.Service;

import com.example.WeBuyBusinesses.Model.Sell;
import com.example.WeBuyBusinesses.Repository.SellRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SellService {
    
    @Autowired
    private SellRepository sellRepository;

    // Save a new Sell entry to the database
    public Sell saveSell(Sell sell) {
        return sellRepository.save(sell);
    }

    // Get all Sell entries
    public List<Sell> getAllSells() {
        return sellRepository.findAll();
    }

    // Get a Sell entry by regCode
    public Sell getSellByRegCode(String regCode) {
        return sellRepository.findById(regCode).orElse(null);
    }

    // Delete a Sell entry by regCode
    public void deleteSell(String regCode) {
        sellRepository.deleteById(regCode);
    }
}
