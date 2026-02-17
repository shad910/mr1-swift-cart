# 📘 Assignment 1: SwiftCart - Questions and Answers

---

## 1) What is the difference between `null` and `undefined`?

**Answer:**

যখন কোনো variable ডিক্লেয়ার করা হয়েছে কিন্তু তার কোনো মান দেওয়া হয়নি,
তখন তার মান `undefined` হয়।\
আবার ইচ্ছাকৃতভাবে "খালি" বা "কোনো মান নেই" `null` বোঝাতে ব্যবহার করা হয়।

---

## 2) What is the use of the `map()` function in JavaScript? How is it different from `forEach()`?

**Answer:**

`map()` একটি array প্রতিটি উপাদানের উপর কাজ করে এবং একটি নতুন array
রিটার্ন করে।\
`forEach()` প্রতিটি উপাদানের উপর কাজ করে, কিন্তু নতুন array রিটার্ন করে
না।

---

## 3) What is the difference between `==` and `===`?

**Answer:**

`==` (Loose Equality) শুধু value তুলনা করে।\
`===` (Strict Equality) মান এবং টাইপ দুটোই তুলনা করে।

---

## 4) What is the significance of `async/await` in fetching API data?

**Answer:**

`async/await` ব্যবহার করে আমরা asynchronous কোডকে synchronous-এর মতো
সহজভাবে লিখতে পারি।

---

## 5) Explain the concept of Scope in JavaScript (Global, Function, Block).

**Answer:**

যে variable ফাংশনের বাইরে ডিক্লেয়ার করা হয় এবং সব জায়গা থেকে ব্যবহার করা
যায় তাকে Global Scope বলে।

যে variable ফাংশনের ভিতরে ডিক্লেয়ার করা হয় এবং শুধু সেই ফাংশনের ভিতরে
ব্যবহার করা যায় তাকে Function Scope বলে।

let এবং const দিয়ে {} ব্লকের ভিতরে ডিক্লেয়ার করা ভ্যারিয়েবল শুধু সেই
ব্লকের ভিতরে ব্যবহার করা যায়। এই ধরনের Scope কে Block Scope বলে।

Note: var ব্লক স্কোপ মানে না।

---

# 🛒 SwiftCart - Modern E-Commerce Shopping Platform

A responsive and dynamic e-commerce web application built with modern web technologies. SwiftCart provides a seamless shopping experience with real-time product browsing, category filtering, and an interactive shopping cart system.

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Live Demo](#live-demo)

---

## 📖 About

SwiftCart is a e-commerce platform designed to deliver a modern, intuitive shopping experience. Users can browse products across multiple categories, view detailed product information, manage their shopping cart with persistent storage, and explore trending products. The application fetches real-time product data from the FakeStore API, providing a scalable and realistic e-commerce simulation.

---

## ✨ Features

- **🛍️ Product Browsing**: Browse products organized by categories
- **🔍 Product Details**: View comprehensive product information in a modal popup
- **🛒 Shopping Cart**: Add/remove items with real-time cart updates
- **💾 Persistent Storage**: Cart data saved in browser's localStorage
- **📊 Top Rated Products**: Dedicated section showcasing the highest-rated products
- **📱 Responsive Design**: Fully responsive layout for mobile, tablet, and desktop
- **🎨 Modern UI**: Clean and intuitive interface with smooth transitions
- **⭐ Product Ratings**: Display user ratings and review counts
- **📧 Newsletter Subscription**: Email subscription option in footer
- **🔗 Category Filtering**: Easy navigation through product categories

---

## 🛠️ Technologies Used

### Frontend

| Technology            | Purpose                     | Version |
| --------------------- | --------------------------- | ------- |
| **HTML5**             | Semantic markup structure   | Latest  |
| **CSS3**              | Styling and animations      | Latest  |
| **Tailwind CSS**      | Utility-first CSS framework | 4.1     |
| **DaisyUI**           | Pre-built component library | 5.5.18  |
| **Font Awesome**      | Icon library                | 6.0     |
| **JavaScript (ES6+)** | Interactive functionality   | Latest  |

### API

| Service           | Purpose                               |
| ----------------- | ------------------------------------- |
| **FakeStore API** | Product data, categories, and ratings |

### Storage

| Technology       | Purpose                      |
| ---------------- | ---------------------------- |
| **localStorage** | Client-side cart persistence |

---

## � API Endpoints

All product data is fetched from the **FakeStore API**. Below are the endpoints used in this application:

| Endpoint                         | Method | Purpose                                        | URL                                                      |
| -------------------------------- | ------ | ---------------------------------------------- | -------------------------------------------------------- |
| **Get All Products** 🛍️          | GET    | Fetch all available products                   | `https://fakestoreapi.com/products`                      |
| **Get All Categories** 🛍️        | GET    | Fetch all product categories                   | `https://fakestoreapi.com/products/categories`           |
| **Get Products by Category** 🛍️  | GET    | Fetch products from a specific category        | `https://fakestoreapi.com/products/category/${category}` |
| **Get Single Product Detail** 🛍️ | GET    | Fetch detailed information of a single product | `https://fakestoreapi.com/products/${id}`                |


## �📂 Project Structure

```
mr1-swift-cart/
├── index.html              # Main HTML file
├── README.md               # Project documentation
├── tailwind.config.js      # Tailwind CSS configuration
├── assets/                 # Static assets
│   ├── banner-image.png
│   ├── swift-cart-logo.png
│   ├── alert-error.png
│   └── reference-design/
├── scripts/
│   └── index.js            # Main JavaScript file
└── utilities/              # Utility files (if any)
```

---

## 💻 Usage

### Browsing Products

1. Use the category buttons to filter products by category
2. Products are displayed in a responsive grid layout
3. Each product card shows the image, title, price, and rating

### Viewing Product Details

- Click the **Details** button on any product card
- A modal popup displays comprehensive product information
- View the complete description, specifications, and full rating

### Managing Cart

- Click **Add** button to add items to your cart
- View cart items in the dropdown menu (top-right icon)
- Remove items directly from the cart dropdown
- Cart count is updated in real-time
- Cart data persists even after closing the browser

### Discovering Top Products

- Check the **Trending Products** section on the homepage
- Features the 3 highest-rated products
- Quick access to details and add-to-cart functionality

---

## 🌐 Live Demo

**Live Website**: [SwiftCart - Live Demo](#) _(Add your deployment URL here)_

### Deployed On

- **Planned**: GitHub Pages | Netlify

---

## 👨‍💻 Author

**Md Sahadot Hossen Shad**

- Email: [shadshs91@gmail.com](mailto:shadshs91@gmail.com)
- Twitter: [@shadshs91](https://x.com/shadshs91)
- LinkedIn: [Md Sahadot Hossen Shad](https://www.linkedin.com/in/md-sahadot-hossen-shad-838251345/)
- Instagram: [@shadshs91](https://www.instagram.com/shadshs91/)
- Facebook: [shadshs91](https://www.facebook.com/shadshs91/)

---

**Made with ❤️ by Shad**
