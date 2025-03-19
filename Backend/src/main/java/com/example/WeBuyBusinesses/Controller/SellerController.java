package com.example.WeBuyBusinesses.Controller;

import com.example.WeBuyBusinesses.Model.Seller;
import com.example.WeBuyBusinesses.Model.User;
import com.example.WeBuyBusinesses.Repository.SellerRepository;
import com.example.WeBuyBusinesses.Service.SellerService;
import com.example.WeBuyBusinesses.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")  
@RestController
@RequestMapping("/api/sellers")
public class SellerController {
    private final SellerService sellerService;
    private final UserService userService;

     private final SellerRepository sellerRepository;

    public SellerController(SellerService sellerService, UserService userService , SellerRepository sellerRepository) {
        this.sellerService = sellerService;
        this.userService = userService;
        this.sellerRepository = sellerRepository;
    }

    
    @PostMapping("/create")
    public ResponseEntity<?> createBusiness(@RequestBody Map<String, Object> requestBody) {
        Long userId = Long.parseLong(requestBody.get("userId").toString()); 
    
        // Retrieve user by userId
        Optional<User> userOptional = userService.getUserById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    
        // Create Seller object
        Seller seller = new Seller();
        seller.setBusinessName((String) requestBody.get("businessName"));
        seller.setCategory((String) requestBody.get("category"));
        seller.setPrice(Double.parseDouble(requestBody.get("price").toString()));
        seller.setAnnualRevenue(Double.parseDouble(requestBody.get("annualRevenue").toString()));
        seller.setStatus((String) requestBody.get("status"));
        seller.setLocation((String) requestBody.get("location"));
        seller.setTrend((String) requestBody.get("trend"));
        seller.setUser(userOptional.get());  
    
        Seller createdSeller = sellerService.createBusiness(seller , userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSeller);
    }
    
    
// Get all businesses (Sellers) for a specific user
public List<Seller> getUserBusinesses(Long userId) {
    // Step 1: Find all businesses that belong to the given userId
    return sellerRepository.findByUserId(userId);
}

// Get a specific business by its ID and ensure it belongs to the user
public Optional<Seller> getBusinessById(Long id, Long userId) {
    Optional<Seller> seller = sellerRepository.findById(id);
    if (seller.isPresent() && seller.get().getUser().getId().equals(userId)) {
        return seller;
    }
    return Optional.empty();
}

// Delete a business (Seller) by its ID, ensuring it belongs to the user
public boolean deleteBusiness(Long id, Long userId) {
    Optional<Seller> seller = sellerRepository.findById(id);
    if (seller.isPresent() && seller.get().getUser().getId().equals(userId)) {
        sellerRepository.deleteById(id);
        return true;
    }
    return false;
}
}