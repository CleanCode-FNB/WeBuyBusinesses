package com.example.WeBuyBusinesses.Controller;

import com.example.WeBuyBusinesses.Model.Seller;
import com.example.WeBuyBusinesses.Model.User;
import com.example.WeBuyBusinesses.Repository.SellerRepository;
import com.example.WeBuyBusinesses.Security.JwtUtil;
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
      private final JwtUtil jwtUtil;
     private final SellerRepository sellerRepository;

    public SellerController(SellerService sellerService, UserService userService , JwtUtil jwtUtil ,SellerRepository sellerRepository) {
        this.sellerService = sellerService;
        this.userService = userService;
        this.sellerRepository = sellerRepository;
        this.jwtUtil = jwtUtil;
    }

    
    @PostMapping("/create")
    public ResponseEntity<?> createBusiness(
        @RequestBody Seller seller,
        @RequestHeader("Authorization") String token) {
        try {
            String actualToken = token.replace("Bearer ", "");
            Long userId = jwtUtil.extractUserId(actualToken);  // This now validates expiration as well
            Optional<User> userOptional = userService.getUserById(userId);
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }
            seller.setUser(userOptional.get());
            Seller createdSeller = sellerService.createBusiness(seller, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdSeller);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating listing: " + e.getMessage());
        }
    }
    
    
 // Get all businesses (Sellers) for a specific user
@GetMapping("/listings")
public ResponseEntity<?> getUserBusinesses(@RequestHeader("Authorization") String token) {
    try {
        String actualToken = token.replace("Bearer ", "");
        Long userId = jwtUtil.extractUserId(actualToken);  // This now validates expiration as well
        Optional<User> userOptional = userService.getUserById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
        List<Seller> businesses = sellerService.getUserBusinesses(userId);
        return ResponseEntity.status(HttpStatus.OK).body(businesses);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error retrieving listings: " + e.getMessage());
    }
}

// Get a specific business by its ID
@GetMapping("/view/{id}")
public ResponseEntity<?> getBusinessById(@PathVariable Long id, @RequestHeader("Authorization") String token) {
    try {
        String actualToken = token.replace("Bearer ", "");
        Long userId = jwtUtil.extractUserId(actualToken);  // This now validates expiration as well
        Optional<Seller> seller = sellerService.getBusinessById(id, userId);
        if (seller.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(seller.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Business not found or doesn't belong to the user.");
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error retrieving the business: " + e.getMessage());
    }
}

// Delete a business listing
@DeleteMapping("/delete/{id}")
public ResponseEntity<?> deleteBusiness(@PathVariable Long id, @RequestHeader("Authorization") String token) {
    try {
        String actualToken = token.replace("Bearer ", "");
        Long userId = jwtUtil.extractUserId(actualToken);  // This now validates expiration as well
        boolean isDeleted = sellerService.deleteBusiness(id, userId);
        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.OK).body("Business deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Business not found or doesn't belong to the user.");
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error deleting the business: " + e.getMessage());
    }
}
}