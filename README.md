# 🛒 ShopSphere – Full Stack E-Commerce Website

A full-stack e-commerce web application developed using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)**.

## 🌐 Live Demo

- **Frontend:** https://shop-sphere-hazel.vercel.app/
- **Backend:** https://shopsphere-l2ul.onrender.com
- **GitHub Repository:** https://github.com/charishmasasanapuri-droid/ShopSphere

## 📌 Project Overview

ShopSphere is an online shopping platform that allows users to browse products, create accounts, securely log in, manage shopping carts, maintain wishlists, and place orders.

The application also includes an admin dashboard for managing products, users, and customer orders.

## ✨ Features

### User Features
- User registration and login
- JWT-based authentication
- Browse available products
- Search and filter products
- Product sorting
- Add and remove products from cart
- Add and remove wishlist items
- Buy Now functionality
- Checkout and order placement
- View order history
- Product reviews and ratings
- Download order invoices
- Share products

### Admin Features
- Admin login
- Admin dashboard
- Add, update, and delete products
- Manage users
- Manage customer orders
- Inventory and stock management

### Additional Features
- Responsive user interface
- Product image uploads
- Demo payment functionality
- Automatic stock deduction after orders

## 🛠️ Technologies Used

| Frontend | Backend | Database |
|---|---|---|
| React.js | Node.js | MongoDB |
| Vite | Express.js | MongoDB Atlas |
| CSS | JWT | Mongoose |
| Axios | Multer | |

**Tools and Platforms**
- Visual Studio Code
- Git and GitHub
- Vercel – Frontend deployment
- Render – Backend deployment
- MongoDB Atlas – Cloud database

## 📂 Project Structure

```text
ShopSphere/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── ...
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/charishmasasanapuri-droid/ShopSphere.git
cd ShopSphere
```

### 2. Setup the backend

```bash
cd server
npm install
```

Create a `.env` file inside the server folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

Start the backend:

```bash
npm run dev
```

### 3. Setup the frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the local frontend URL displayed in your terminal.

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| PORT | Backend server port |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key used for JWT authentication |

**Security:** Never upload `.env` files, database passwords, or JWT secrets to GitHub.

## 🚀 Deployment

- Frontend hosted on Vercel.
- Backend hosted on Render.
- Database hosted on MongoDB Atlas.

## 🎯 Project Objective

The main objective of ShopSphere is to develop a user-friendly and responsive online shopping platform that provides essential e-commerce functionality, secure authentication, product management, and order processing.

## 👩‍💻 Author

**Charishma Sasanapuri**

---

GitHub: https://github.com/charishmasasanapuri-droid

## 📄 License

This project was developed for educational and learning purposes.
