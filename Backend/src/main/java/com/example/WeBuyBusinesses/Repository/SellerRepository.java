package com.example.WeBuyBusinesses.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.WeBuyBusinesses.Model.Seller;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {
    List<Seller> findByUserId(Long userId);
}

