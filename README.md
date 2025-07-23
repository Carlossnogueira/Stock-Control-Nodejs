# 📦 Stock Management System

This is a simple inventory control system designed for study purposes. It helps manage product quantities, track stock movements, and ensure that inventory data remains accurate and up-to-date.

Any contributions or suggestions are welcome!


## 🎯 Project Objectives

- Register new products
- Track product quantities in real-time
- Handle stock entries and exits
- User authentication and access control


## 🧠 How It Works

This system is a stock management API built with Fastify and Prisma (PostgreSQL), using a clean architecture approach with separation of concerns between controllers, use-cases, and repositories.

### 🔁 Main Flow

1. **Request Validation**  
   All incoming data is validated using [Zod](https://zod.dev/) to ensure type safety and proper error reporting.

2. **Controller Layer**  
   Handles HTTP requests/responses. If the request is valid, it delegates the operation to the corresponding use-case.

3. **Use-Case Layer**  
   Contains business logic such as checking for duplicates, entity existence, or preventing deletions if linked data exists.

4. **Repository Layer**  
   Responsible for direct communication with the database using [Prisma ORM](https://www.prisma.io/). Repositories follow a shared interface with common methods like `create`, `findById`, `findByName`, `getAll`, `update`, and `remove`.

5. **Database**  
   The system uses a PostgreSQL database accessed via Prisma, with clear relationships between entities like `Product`, `Category`, `Supplier`, and `Movement`.

---

### 🧪 Example Use Case: Creating a Product

1. The client sends a `POST /products` request with JSON payload:
   ```json
   {
     "name": "Mouse Gamer",
     "sku": "MS-GR-101",
     "quantity": 10,
     "min_quantity": 2,
     "max_quantity": 100,
     "price_cost": 50.00,
     "price_sale": 99.90,
     "category_id": 1,
     "supplier_id": 3
   }


1 - The controller validates the payload using Zod.

2 - The use-case checks if the product already exists by name.

3 - If valid, the repository inserts the product into the database.

4- A success response (201 Created) is returned to the client.


### 🧩 Entities Overview

- Category: groups products logically

- Product: holds stock information, prices, and relationships with category and supplier

- Supplier: represents providers of products

- Movement: logs inventory entries and exits (e.g., restocks, sales)

- User: tracks which user performed each movement

## 🛠️ Technologies Used

- **Backend:** NodeJs Fastify
- **Database:** PostgreSQL
