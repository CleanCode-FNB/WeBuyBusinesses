package com.example.WeBuyBusinesses.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.WeBuyBusinesses.Model.Listing;


public interface ListingRepository extends JpaRepository<Listing, Long> {
    // You can define custom queries here if needed

    List<Listing> findByCategory(String category);
    List<Listing> findByStatus(String status);
}
