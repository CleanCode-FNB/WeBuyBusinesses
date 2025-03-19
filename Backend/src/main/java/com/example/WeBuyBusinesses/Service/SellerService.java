package com.example.WeBuyBusinesses.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.WeBuyBusinesses.Model.Seller;
import com.example.WeBuyBusinesses.Model.User;
import com.example.WeBuyBusinesses.Repository.SellerRepository;
import com.example.WeBuyBusinesses.Repository.UserRepository;

@Service
public class SellerService {
    private final SellerRepository sellerRepository;
    private final UserRepository userRepository;

    public SellerService(SellerRepository sellerRepository, UserRepository userRepository) {
        this.sellerRepository = sellerRepository;
        this.userRepository = userRepository;
    }

  // Create a new business (Seller)
  public Seller createBusiness(Seller seller, Long userId) {
    // Step 1: Find the user by userId
    Optional<User> userOptional = userRepository.findById(userId);
    if (!userOptional.isPresent()) {
        throw new RuntimeException("User not found with ID: " + userId);
    }

    // Step 2: Set the user for the seller
    User user = userOptional.get();
    seller.setUser(user);

    // Step 3: Save the seller and return it
    return sellerRepository.save(seller);
}

    public Optional<Seller> updateBusiness(Long id, Seller updatedSeller, String email) {
        Optional<Seller> existingSeller = sellerRepository.findById(id);
        Optional<User> userOptional = userRepository.findByEmail(email);
        
        if (existingSeller.isEmpty() || userOptional.isEmpty() || !existingSeller.get().getUser().getEmail().equals(email)) {
            return Optional.empty();
        }

        Seller seller = existingSeller.get();
        seller.setBusinessName(updatedSeller.getBusinessName());
        seller.setCategory(updatedSeller.getCategory());
        seller.setPrice(updatedSeller.getPrice());
        seller.setAnnualRevenue(updatedSeller.getAnnualRevenue());
        seller.setStatus(updatedSeller.getStatus());
        seller.setLocation(updatedSeller.getLocation());
        seller.setTrend(updatedSeller.getTrend());
        
        return Optional.of(sellerRepository.save(seller));
    }

    public List<Seller> getUserBusinesses(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        return userOptional.map(user -> sellerRepository.findByUserId(user.getId())).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Optional<Seller> getBusinessById(Long id, String email) {
        Optional<Seller> seller = sellerRepository.findById(id);
        if (seller.isPresent() && seller.get().getUser().getEmail().equals(email)) {
            return seller;
        }
        return Optional.empty();
    }

    public boolean deleteBusiness(Long id, String email) {
        Optional<Seller> seller = sellerRepository.findById(id);
        if (seller.isPresent() && seller.get().getUser().getEmail().equals(email)) {
            sellerRepository.deleteById(id);
            return true;
        }
        return false;
    }
}