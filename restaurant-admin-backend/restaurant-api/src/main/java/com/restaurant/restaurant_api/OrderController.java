package com.restaurant.restaurant_api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    // GET: Send all orders to React
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // GET: Send only completed orders to React
    @GetMapping("/history")
    public List<Order> getOrderHistory() {
        return orderRepository.findByStatus("Completed");
    }

    // POST: Receive a new order from React and save it
    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderRepository.save(order);
    }

    // PUT: Update an order
    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable Long id, @RequestBody Order orderDetails) {
        Order order = orderRepository.findById(id).orElseThrow();
        
        order.setStatus(orderDetails.getStatus());
        order.setType(orderDetails.getType());
        order.setItems(orderDetails.getItems());
        order.setPrice(orderDetails.getPrice());
        
        return orderRepository.save(order);
    }

    // DELETE: Remove an order from the database
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderRepository.deleteById(id);
    }
} // <--- This is the closing brace for the class that was missing!