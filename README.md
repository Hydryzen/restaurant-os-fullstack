# RestaurantOS - Full-Stack Admin Dashboard

A complete Restaurant Management System designed for kitchen staff and administrators. It allows real-time tracking of orders, status updates, and daily revenue calculation.

## Tech Stack

**Frontend:**
* React (Vite)
* CSS3 (Custom Dark UI)
* Fetch API for REST communication

**Backend:**
* Java (Spring Boot)
* Spring Data JPA / Hibernate
* PostgreSQL Database

## Key Features

* Real-time Kanban Board: Move orders seamlessly between Pending, Cooking, and Completed.
* Dynamic Revenue Calculation: Automatically calculates total daily revenue based on active orders.
* Full CRUD Functionality: Create, read, update (via modal), and delete orders.
* Order History: View completed orders and export them to CSV for accounting.
* Secure Configuration: Database credentials are protected via `.gitignore`.

## How to Run Locally

### Prerequisites
* Node.js (v18+)
* Java (JDK 17+)
* PostgreSQL (v14+)

### 1. Database Setup
Create a local PostgreSQL database named `restaurant_db`:
```sql
CREATE DATABASE restaurant_db;
