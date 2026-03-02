# 🧠 Smart Inventory Management System

🔗 **Live Demo:** Comming Soon

A full-stack Inventory Management System built with **Next.js (App Router)**, **PostgreSQL**, and **Prisma**, featuring **role-based access control**, **stock tracking**, and **AI-powered reporting**.

Designed with a production-ready architecture focusing on scalability, security, and maintainability.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* HTTP-only cookie storage
* Role-based access control (RBAC)
* Protected routes for Admin & Manager

---

### 👥 Roles

#### **Admin**

* Full dashboard access
* Manage products, categories, suppliers
* Update stock & track movements
* Bulk upload via CSV
* View analytics & generate AI reports

#### **Manager**

* Read-only access
* View products & stock analytics

---

### 📦 Product Management

* Add / Edit / Delete products
* Automatic SKU generation
* Validation:

  * Quantity ≥ 0
  * Price ≥ 0
* Linked with categories & suppliers

---

### 🔄 Stock Movement System

Every stock update is recorded.

**Supported Types:**

* SALE
* RESTOCK
* DAMAGE
* RETURN

Each record includes:

* Quantity
* Timestamp
* Optional notes

---

### 📊 Analytics Dashboard

* Total Products & Stock
* Low Stock Detection
* Category & Supplier Distribution
* Visual charts for insights

---

### 📁 CSV Bulk Upload

* Upload multiple products at once

**Required fields:**

```
name, quantity, price, categoryId, supplierId
```

**Validations:**

* No negative quantity
* No negative price
* Bulk insert via Prisma

---

### 🤖 AI Report Generation

* Inventory summaries
* Low stock alerts
* Extendable for PDF/export reports

---

## 🛠 Tech Stack

### **Frontend**

* Next.js (App Router)
* React
* Tailwind CSS

### **Backend**

* Next.js API Routes
* Prisma ORM
* PostgreSQL

### **Authentication**

* JWT (JSON Web Tokens)

---

## 🗄 Database Schema

### Models

**User**

* id, email, password, role (ADMIN / MANAGER)

**Category**

* id, name

**Supplier**

* id, name, email, phone

**Product**

* id, name, sku, quantity, price
* categoryId, supplierId

**StockMovement**

* id, productId
* type (SALE / RESTOCK / DAMAGE / RETURN)
* quantity, note, createdAt

---

### Relationships

* Product → Category (Many-to-One)
* Product → Supplier (Many-to-One)
* Product → StockMovements (One-to-Many)

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/AdityaRaj-DE/Smart-Inventory-Management-System.git
cd Smart-Inventory-Management-System
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file:

```env
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_secret_key"
```

---

### 4. Run Migrations

```bash
npx prisma migrate dev
```

---

### 5. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

---

## 📌 Project Highlights

* Clean modular architecture
* Secure authentication system
* Scalable database design
* Real-world inventory workflows
* Admin vs Manager access separation

---

## 📈 Future Improvements

* PDF report export
* Email notifications for low stock
* Advanced forecasting using ML
* Multi-warehouse support

---

## 🤝 Contributing

Contributions are welcome. Feel free to fork and submit a PR.

---

## 📄 License

This project is open-source.

---

## 👨‍💻 Author

**Aditya Raj & Shreya Pandey**
