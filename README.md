# Full-Stack Expense Tracker

A production-ready Expense Tracking application built with the MERN stack (MongoDB, Express, React, Node.js). This project demonstrates a decoupled architecture where a React single-page application communicates seamlessly with an independent Express API connected to a MongoDB cloud cluster.

## 🚀 Features
* **Asynchronous CRUD Operations:** Built with RESTful API endpoints for robust data handling.
* **Dynamic State Management:** Real-time updates for total balances, income, and expenses without page reloads.
* **Data Visualization:** Custom, responsive progress bars dynamically calculate and display expense breakdowns by category.
* **Database Isolation:** Utilizes MongoDB Atlas with Mongoose schema validation to enforce strict data structures.

## 💻 Tech Stack
* **Frontend:** React (built with Vite), Axios for HTTP requests, raw CSS for responsive design.
* **Backend:** Node.js, Express.js for REST routing.
* **Database:** MongoDB Atlas (Cloud Cluster), Mongoose for object data modeling (ODM).

## 📂 Project Architecture
```text
expense-tracker/
├── backend/                  # Independent Node.js microservice
│   ├── config/db.js          # MongoDB Atlas connection handshake
│   ├── models/Transaction.js # Mongoose schema validation
│   ├── routes/                 # REST API endpoints
│   └── server.js             # Express server and middleware
└── frontend/                 # React SPA
    ├── src/
    │   ├── components/       # Modular UI components (Chart, List)
    │   ├── App.jsx           # Main state controller
    │   └── main.jsx          # App entry point
