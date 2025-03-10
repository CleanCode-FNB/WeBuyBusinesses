package com.example.WeBuyBusinesses.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.WeBuyBusinesses.Model.Buyer;
import com.example.WeBuyBusinesses.Service.BuyerService;

@RestController
@RequestMapping("/api/buyers")
public class BuyerController {

@Autowired
    private BuyerService buyerService;

    // Get all buyers
    @GetMapping
    public List<Buyer> getAllBuyers() {
        return buyerService.getAllBuyers();
    }

    // Get a single buyer by ID
    @GetMapping("/{id}")
    public ResponseEntity<Buyer> getBuyerById(@PathVariable("id") Long id) {
        Optional<Buyer> buyer = buyerService.getBuyerById(id);
        if (buyer.isPresent()) {
            return new ResponseEntity<>(buyer.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Add a new buyer
    @PostMapping
    public ResponseEntity<Buyer> addBuyer(@RequestBody Buyer buyer) {
        Buyer newBuyer = buyerService.addBuyer(buyer);
        return new ResponseEntity<>(newBuyer, HttpStatus.CREATED);
    }

    // Update an existing buyer
    @PutMapping("/{id}")
    public ResponseEntity<Buyer> updateBuyer(@PathVariable("id") Long id, @RequestBody Buyer buyerDetails) {
        Buyer updatedBuyer = buyerService.updateBuyer(id, buyerDetails);
        if (updatedBuyer != null) {
            return new ResponseEntity<>(updatedBuyer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a buyer
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBuyer(@PathVariable("id") Long id) {
        buyerService.deleteBuyer(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
