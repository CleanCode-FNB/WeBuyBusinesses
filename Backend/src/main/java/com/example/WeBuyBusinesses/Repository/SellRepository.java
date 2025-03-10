package com.example.WeBuyBusinesses.Repository;

import com.example.WeBuyBusinesses.Model.Sell;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellRepository extends JpaRepository<Sell, String> {
    // Custom queries can be added here
}
