# 🛍️ Products Project
<p align="center">
  <img src="https://ih1.redbubble.net/image.658262050.2481/flat,750x,075,f-pad,750x1000,f8f8f8.u7.jpg" alt="Angular logo" width="200"/>
</p> 

A modern e-commerce web application built with **Angular**, featuring a comprehensive product management system, secure user authentication, and an interactive shopping cart.

---

## 🚀 Features

- 🔐 **User Authentication**: Secure login and registration system with route protection.
- 🛒 **Shopping Cart**: Add, remove, and manage products in the cart with real-time updates.
- 📦 **Product Management**: Browse products in a card layout with individual product detail views.
- 💰 **Discount Calculations**: Custom discount pipe to display discounted prices.
- ⚙️ **Service-Based Architecture**: State and operations handled using Angular services.
- 🧭 **Responsive Navigation**: Easy-to-use navigation bar and footer.
- ❌ **404 Page**: Custom not-found page for unknown routes.

---

## 🧱 Project Structure

### 📁 Core Components

#### 🛍️ Products Management

- `products-cards` — Displays product listings in a card format  
- `product-details` — Shows detailed information for individual products  
- `models/product.ts` — Defines the product data model  
- `services/product.service.ts` — Handles all product-related operations  

#### 🛒 Shopping Cart

- `cart` — Component for managing items added to the cart  
- `services/cart.service.ts` — Manages cart logic and state  

#### 🔐 User Authentication

- `login` — User login component  
- `register` — New user registration component  
- `guards` — Authentication guards for route protection  

#### 📌 Navigation & Layout

- `navbar` — Application’s main navigation bar  
- `footer` — Site footer  
- `not-found` — 404 error page  

---

### 🛠️ Additional Features

#### 🧮 Custom Pipes

- `pipes/discount.pipe.ts` — Calculates and displays product discounts  

---

## 📦 Technical Details

- Built with **Angular**
- Follows **component-based** architecture
- Implements **service-based** state management
- Includes **route guards** for secure navigation
- Adheres to **Angular best practices** and style conventions

---
