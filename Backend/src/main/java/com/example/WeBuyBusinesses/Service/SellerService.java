package com.example.WeBuyBusinesses.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.WeBuyBusinesses.Model.Seller;
import com.example.WeBuyBusinesses.Model.User;
import com.example.WeBuyBusinesses.Repository.SellerRepository;
import com.example.WeBuyBusinesses.Repository.UserRepository;
import com.example.WeBuyBusinesses.Security.JwtUtil;

@Service
public class SellerService {
    private final SellerRepository sellerRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    public SellerService(
        SellerRepository sellerRepository,
        UserRepository userRepository,
        UserService userService,
        JwtUtil jwtUtil) {
        this.sellerRepository = sellerRepository;
        this.userRepository = userRepository;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

   
    public Seller createBusiness(Seller seller, Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            throw new RuntimeException("User not found with ID: " + userId);
        }
        User user = userOptional.get();
        seller.setUser(user);
        return sellerRepository.save(seller);
    }

   
    // Get all businesses (sellers) for a specific user
    public List<Seller> getUserBusinesses(Long userId) {
        return sellerRepository.findByUserId(userId);
    }

    // Get a business by its ID and ensure it belongs to the specified user
    public Optional<Seller> getBusinessById(Long businessId, Long userId) {
        Optional<Seller> seller = sellerRepository.findById(businessId);
        return seller.isPresent() && seller.get().getUser().getId().equals(userId) ? seller : Optional.empty();
    }

    // Delete a business listing
    public boolean deleteBusiness(Long businessId, Long userId) {
        Optional<Seller> seller = sellerRepository.findById(businessId);
        if (seller.isPresent() && seller.get().getUser().getId().equals(userId)) {
            sellerRepository.delete(seller.get());
            return true;
        }
        return false;
    }
}