package com.example.WeBuyBusinesses.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.WeBuyBusinesses.Model.Sell;
import com.example.WeBuyBusinesses.Service.SellService;

@RestController
@RequestMapping("/api/sells")
public class SellController {
    
    @Autowired
    private SellService sellService;

    // Endpoint to save a new sell
    @PostMapping
    public ResponseEntity<Sell> createSell(@RequestBody Sell sell) {
        Sell savedSell = sellService.saveSell(sell);
        return new ResponseEntity<>(savedSell, HttpStatus.CREATED);
    }

    // Endpoint to get all sells
    @GetMapping
    public ResponseEntity<List<Sell>> getAllSells() {
        List<Sell> sells = sellService.getAllSells();
        return new ResponseEntity<>(sells, HttpStatus.OK);
    }

    // Endpoint to get a specific sell by regCode
    @GetMapping("/{regCode}")
    public ResponseEntity<Sell> getSell(@PathVariable String regCode) {
        Sell sell = sellService.getSellByRegCode(regCode);
        if (sell != null) {
            return new ResponseEntity<>(sell, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint to delete a sell by regCode
    @DeleteMapping("/{regCode}")
    public ResponseEntity<Void> deleteSell(@PathVariable String regCode) {
        sellService.deleteSell(regCode);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
