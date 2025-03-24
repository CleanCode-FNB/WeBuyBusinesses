package com.example.webuybusinesses.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.webuybusinesses.Model.Buyer;

@Repository
public interface BuyerRepository extends JpaRepository<Buyer, Long> {
    Buyer findByUserId(Long userId);
}
