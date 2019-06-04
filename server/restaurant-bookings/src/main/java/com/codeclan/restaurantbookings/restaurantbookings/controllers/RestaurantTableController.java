package com.codeclan.restaurantbookings.restaurantbookings.controllers;

import com.codeclan.restaurantbookings.restaurantbookings.models.RestaurantTable;
import com.codeclan.restaurantbookings.restaurantbookings.repositories.RestaurantTableRepository.RestaurantTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurant-tables")
public class RestaurantTableController {

    @Autowired
    RestaurantTableRepository restaurantTableRepository;

    @GetMapping
    @CrossOrigin
    public List<RestaurantTable> getAllRestaurantTables() {
        return restaurantTableRepository.findAll();
    }

    @GetMapping(value="/seating/{number}")
    public List<RestaurantTable> getTablesBySeating(@PathVariable int number){
        return restaurantTableRepository.findTablesBySeating(number);
    }
}
