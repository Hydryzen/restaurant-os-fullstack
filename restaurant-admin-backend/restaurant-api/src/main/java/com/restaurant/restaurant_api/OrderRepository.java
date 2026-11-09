package com.restaurant.restaurant_api;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // THIS LINE IS REQUIRED
    List<Order> findByStatus(String status); 
}