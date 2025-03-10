package com.example.WeBuyBusinesses.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.WeBuyBusinesses.Model.Buyer;

public interface BuyerRepository extends JpaRepository<Buyer, Long> {
}
