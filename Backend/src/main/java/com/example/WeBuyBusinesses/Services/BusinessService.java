package com.example.webuybusinesses.Services;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.example.webuybusinesses.Dto.CreateSellerBusinessDto;
import com.example.webuybusinesses.Dto.BuyBusinessDto;
import com.example.webuybusinesses.Model.Seller;
import com.example.webuybusinesses.Model.Buyer;
import com.example.webuybusinesses.Model.User;
import com.example.webuybusinesses.Repository.SellerRepository;
import com.example.webuybusinesses.Repository.BuyerRepository;
import com.example.webuybusinesses.Repository.UserRepository;

import java.util.List;

@Service
public class BusinessService {
    private final SellerRepository sellerRepository;
    private final BuyerRepository buyerRepository;
    private final UserRepository userRepository;

    public BusinessService(SellerRepository sellerRepository, 
                          BuyerRepository buyerRepository,
                          UserRepository userRepository) {
        this.sellerRepository = sellerRepository;
        this.buyerRepository = buyerRepository;
        this.userRepository = userRepository;
    }

   // BusinessService.java
public Seller createBusiness(CreateSellerBusinessDto dto, Long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));
    
    System.out.println("BusinessService - User ID: " + user.getId() + ", Role: " + user.getRole());
    System.out.println("BusinessService - Security Context Role: " + SecurityContextHolder.getContext().getAuthentication().getAuthorities());
    
    // Remove this check since Spring Security already enforces it
    // if (!user.getRole().equalsIgnoreCase("BUSINESSSELLER")) {
    //     throw new RuntimeException("Only sellers can create businesses");
    // }

    Seller seller = new Seller();
    seller.setBusinessName(dto.getBusinessName());
    seller.setCategory(dto.getCategory());
    seller.setPrice(dto.getPrice());
    seller.setAnnualRevenue(dto.getAnnualRevenue());
    seller.setLocation(dto.getLocation());
    seller.setTrend(dto.getTrend());
    seller.setStatus("AVAILABLE");
    seller.setUser(user);

    return sellerRepository.save(seller);
}

public Seller updateBusiness(Long sellerId, CreateSellerBusinessDto dto, Long userId) {
    Seller seller = sellerRepository.findById(sellerId)
        .orElseThrow(() -> new RuntimeException("Business not found"));

    if (!seller.getUser().getId().equals(userId)) {
        throw new RuntimeException("You can only update your own businesses");
    }

    if (!seller.getStatus().equals("AVAILABLE")) {
        throw new RuntimeException("Business can only be updated if its status is AVAILABLE");
    }

    seller.setBusinessName(dto.getBusinessName());
    seller.setCategory(dto.getCategory());
    seller.setPrice(dto.getPrice());
    seller.setAnnualRevenue(dto.getAnnualRevenue());
    seller.setLocation(dto.getLocation());
    seller.setTrend(dto.getTrend());

    return sellerRepository.save(seller);
}

public void deleteBusiness(Long sellerId, Long userId) {
    Seller seller = sellerRepository.findById(sellerId)
        .orElseThrow(() -> new RuntimeException("Business not found"));

    if (!seller.getUser().getId().equals(userId)) {
        throw new RuntimeException("You can only delete your own businesses");
    }

    if (!seller.getStatus().equals("AVAILABLE")) {
        throw new RuntimeException("Business can only be deleted if its status is AVAILABLE");
    }

    sellerRepository.delete(seller);
}

public Seller buyBusiness(BuyBusinessDto dto, Long buyerUserId) {
    System.out.println("buyBusiness - Start: sellerId=" + dto.getSellerId() + ", buyerUserId=" + buyerUserId + ", offeredPrice=" + dto.getOfferedPrice());
   
    Seller seller = sellerRepository.findById(dto.getSellerId())
        .orElseThrow(() -> new RuntimeException("Business not found"));
    System.out.println("buyBusiness - Seller found: price=" + seller.getPrice() + ", status=" + seller.getStatus());
 
    Buyer buyer = buyerRepository.findByUserId(buyerUserId);
    if (buyer == null) {
        System.out.println("buyBusiness - Buyer not found");
        throw new RuntimeException("Buyer profile not found");
    }
    System.out.println("buyBusiness - Buyer found: funds=" + buyer.getAvailableFunds());
 
    if (!seller.getStatus().equals("AVAILABLE")) {
        System.out.println("buyBusiness - Status check failed: " + seller.getStatus());
        throw new RuntimeException("Business is not available for purchase");
    }
 
    if (dto.getOfferedPrice() < seller.getPrice()) {
        System.out.println("buyBusiness - Offer too low: " + dto.getOfferedPrice() + " < " + seller.getPrice());
        seller.setStatus("OFFER_REJECTED");
        return seller;
    }
 
    if (buyer.getAvailableFunds() < seller.getPrice()) {
        System.out.println("buyBusiness - Insufficient funds: " + buyer.getAvailableFunds() + " < " + seller.getPrice());
        throw new RuntimeException("Insufficient funds");
    }
 
    System.out.println("buyBusiness - Processing purchase");
    buyer.setAvailableFunds(buyer.getAvailableFunds() - seller.getPrice());
    seller.setStatus("SOLD");
   
    System.out.println("buyBusiness - Saving buyer: new funds=" + buyer.getAvailableFunds());
    buyerRepository.save(buyer);
    System.out.println("buyBusiness - Saving seller: status=" + seller.getStatus());
    sellerRepository.save(seller);
   
    System.out.println("buyBusiness - Complete");
    return seller;
}

    public List<Seller> getSellerBusinesses(Long userId) {
        return sellerRepository.findByUserId(userId);
    }

    public List<Seller> getAvailableBusinesses() {
        return sellerRepository.findAll()
            .stream()
            .filter(s -> s.getStatus().equals("AVAILABLE"))
            .toList();
    }
}
