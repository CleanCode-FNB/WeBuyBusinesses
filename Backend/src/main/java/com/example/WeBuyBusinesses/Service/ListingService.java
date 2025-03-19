package com.example.WeBuyBusinesses.Service;

import com.example.WeBuyBusinesses.Dto.ListingDTO;
import com.example.WeBuyBusinesses.Model.Listing;
import com.example.WeBuyBusinesses.Repository.ListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ListingService {

    @Autowired
    private ListingRepository listingRepository;

    public void createListing(ListingDTO listingDTO) {
        Listing listing = new Listing();
        listing.setBusinessName(listingDTO.getBusinessName());
        listing.setCategory(listingDTO.getCategory());
        listing.setPrice(listingDTO.getPrice());
        listing.setStatus(listingDTO.getStatus());
        listing.setLocation(listingDTO.getLocation());
        listingRepository.save(listing);
    }

    public List<ListingDTO> getAllListings() {
        List<Listing> listings = listingRepository.findAll();
        return listings.stream().map(this::convertToDTO).toList();
    }

    public ListingDTO getListing(Long id) {
        Optional<Listing> listing = listingRepository.findById(id);
        return listing.map(this::convertToDTO).orElse(null);
    }

    public boolean updateListing(Long id, ListingDTO listingDTO) {
        Optional<Listing> listing = listingRepository.findById(id);
        if (listing.isPresent()) {
            Listing updatedListing = listing.get();
            updatedListing.setBusinessName(listingDTO.getBusinessName());
            updatedListing.setCategory(listingDTO.getCategory());
            updatedListing.setPrice(listingDTO.getPrice());
            updatedListing.setStatus(listingDTO.getStatus());
            updatedListing.setLocation(listingDTO.getLocation());
            listingRepository.save(updatedListing);
            return true;
        }
        return false;
    }

    public boolean deleteListing(Long id) {
        Optional<Listing> listing = listingRepository.findById(id);
        if (listing.isPresent()) {
            listingRepository.delete(listing.get());
            return true;
        }
        return false;
    }

    public List<ListingDTO> getListingsByCategory(String category) {
        List<Listing> listings = listingRepository.findByCategory(category);
        return listings.stream().map(this::convertToDTO).toList();
    }

    public List<ListingDTO> getListingsByStatus(String status) {
        List<Listing> listings = listingRepository.findByStatus(status);
        return listings.stream().map(this::convertToDTO).toList();
    }

    private ListingDTO convertToDTO(Listing listing) {
        ListingDTO dto = new ListingDTO();
        dto.setId(listing.getId());  // Use id instead of listingId
        dto.setBusinessName(listing.getBusinessName());
        dto.setCategory(listing.getCategory());
        dto.setPrice(listing.getPrice());
        dto.setStatus(listing.getStatus());
        dto.setLocation(listing.getLocation());
        return dto;
    }
}
