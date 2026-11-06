# ShopSphere - Full Stack E-Commerce Website

## Project Overview

ShopSphere is a full-stack e-commerce web application developed using the MERN Stack (MongoDB, Express.js, React.js, and Node.js). The application allows users to browse products, register, log in securely using JWT authentication, manage shopping carts, place orders, and maintain wishlists. An admin dashboard is also provided to manage products, users, and customer orders.

---

## Features

- User Registration and Login
- JWT Authentication
- Product Listing and Search
- Product Details Page
- Shopping Cart
- Wishlist Management
- Order Placement
- Admin Dashboard
- Product Image Upload
- Responsive User Interface

---

## Technologies Used

### Frontend
- React.js
- React Router
- Redux Toolkit
- Axios
- CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- Multer

### Database
- MongoDB Atlas
- Mongoose

---

## Project Structure

```
ShopSphere/
│
├── client/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/charishmasasanapuri-droid/ShopSphere.git
```

### Install Frontend

```bash
cd client
npm install
```

### Install Backend

```bash
cd ../server
npm install
```

---

## Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=
MONGO_URI=
JWT_SECRET=
```

---

## Run the Project

### Backend

```bash
cd server
npm start
```

### Frontend

```bash
cd client
npm run dev
```

---

## Future Enhancements

- Online Payment Integration
- Product Reviews
- AI Product Recommendation
- Multi Vendor Support
- Mobile Application
- Chat Support

---

## Author

**Charishma Sasanapuri**

Student Internship Project
