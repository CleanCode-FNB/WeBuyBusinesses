package com.example.WeBuyBusinesses.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.WeBuyBusinesses.Dto.ListingDTO;
import com.example.WeBuyBusinesses.Service.ListingService;

@RestController
@RequestMapping("/api/listings")
@CrossOrigin(origins = "http://localhost:3000")
public class ListingController {

    @Autowired
    private ListingService listingService;

    

    @PostMapping
    public ResponseEntity<String> createListing(@RequestBody ListingDTO listingDTO) {
        try {
            listingService.createListing(listingDTO);
            return ResponseEntity.ok("Listing created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating listing: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<ListingDTO>> getAllListings() {
        try {
            List<ListingDTO> listings = listingService.getAllListings();
            return ResponseEntity.ok(listings);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/{listingId}")
    public ResponseEntity<ListingDTO> getListing(@PathVariable Long listingId) {
        try {
            ListingDTO listing = listingService.getListing(listingId);
            if (listing != null) {
                return ResponseEntity.ok(listing);
            } else {
                return ResponseEntity.status(404).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/{listingId}")
    public ResponseEntity<String> updateListing(@PathVariable Long listingId, @RequestBody ListingDTO listingDTO) {
        try {
            boolean updated = listingService.updateListing(listingId, listingDTO);
            if (updated) {
                return ResponseEntity.ok("Listing updated successfully");
            } else {
                return ResponseEntity.status(404).body("Listing not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating listing: " + e.getMessage());
        }
    }

    @DeleteMapping("/{listingId}")
    public ResponseEntity<String> deleteListing(@PathVariable Long listingId) {
        try {
            boolean deleted = listingService.deleteListing(listingId);
            if (deleted) {
                return ResponseEntity.ok("Listing deleted successfully");
            } else {
                return ResponseEntity.status(404).body("Listing not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting listing: " + e.getMessage());
        }
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ListingDTO>> getListingsByCategory(@PathVariable String category) {
        try {
            List<ListingDTO> listings = listingService.getListingsByCategory(category);
            return ResponseEntity.ok(listings);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ListingDTO>> getListingsByStatus(@PathVariable String status) {
        try {
            List<ListingDTO> listings = listingService.getListingsByStatus(status);
            return ResponseEntity.ok(listings);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
