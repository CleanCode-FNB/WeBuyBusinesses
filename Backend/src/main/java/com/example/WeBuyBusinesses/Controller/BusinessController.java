package com.example.webuybusinesses.Controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.web.bind.annotation.*;
import com.example.webuybusinesses.Dto.CreateSellerBusinessDto;
import com.example.webuybusinesses.Dto.BuyBusinessDto;
import com.example.webuybusinesses.Model.Seller;
import com.example.webuybusinesses.Services.BusinessService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // Add allowCredentials
@RestController
@RequestMapping("/api/business")
public class BusinessController {
    private final BusinessService businessService;

    public BusinessController(BusinessService businessService) {
        this.businessService = businessService;
    }
// BusinessController.java
@PostMapping("/create")
public ResponseEntity<Seller> createBusiness(@RequestBody CreateSellerBusinessDto dto,
                                            @RequestParam Long userId) {
    org.springframework.security.core.Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    System.out.println("Create - Authentication: " + (auth != null ? auth.getName() : "null"));
    System.out.println("Create - Authorities: " + (auth != null ? auth.getAuthorities() : "null"));
    System.out.println("Create - Session ID: " + (auth != null && auth.getDetails() != null 
        ? ((WebAuthenticationDetails) auth.getDetails()).getSessionId() : "null"));
    
    try {
        Seller seller = businessService.createBusiness(dto, userId);
        return ResponseEntity.ok(seller);
    } catch (Exception e) {
        System.out.println("Create - Error: " + e.getMessage());
        throw e; // Let Spring handle the exception properly
    }
}

@PutMapping("/update/{sellerId}")
public ResponseEntity<?> updateBusiness(@PathVariable Long sellerId,
                                       @RequestBody CreateSellerBusinessDto dto,
                                       @RequestParam Long userId) {
    try {
        Seller seller = businessService.updateBusiness(sellerId, dto, userId);
        return ResponseEntity.ok(seller);
    } catch (RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(ex.getMessage());
    }
}

@DeleteMapping("/delete/{sellerId}")
public ResponseEntity<?> deleteBusiness(@PathVariable Long sellerId,
                                       @RequestParam Long userId) {
    try {
        businessService.deleteBusiness(sellerId, userId);
        return ResponseEntity.ok().build();
    } catch (RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(ex.getMessage());
    }
}

@PostMapping("/buy")
public ResponseEntity<?> buyBusiness(@RequestBody BuyBusinessDto dto,
                                    @RequestParam Long userId) {
    try {
        Seller seller = businessService.buyBusiness(dto, userId);
        if ("OFFER_REJECTED".equals(seller.getStatus())) {
            return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body("Offer is less than the asking price");
        }
        return ResponseEntity.ok(seller);
    } catch (RuntimeException ex) {
        System.out.println("Error in /buy: " + ex.getMessage());
        if ("Insufficient funds".equals(ex.getMessage())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST) // 400
                .body(ex.getMessage());
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR) // 500 for other errors
            .body(ex.getMessage());
    }
}
 

    @GetMapping("/seller/{userId}")
    public ResponseEntity<List<Seller>> getSellerBusinesses(@PathVariable Long userId) {
        List<Seller> businesses = businessService.getSellerBusinesses(userId);
        return ResponseEntity.ok(businesses);
    }

    @GetMapping("/available")
    public ResponseEntity<List<Seller>> getAvailableBusinesses() {
        List<Seller> businesses = businessService.getAvailableBusinesses();
        return ResponseEntity.ok(businesses);
    }
}
