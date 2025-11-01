# API Specification for Library Management System

This document outlines the RESTful API for the Library Management System.

**Base URL**: `/api/v1`

**Authentication**: All endpoints, except `/auth/login` and `/auth/register`, require a `Bearer Token` in the `Authorization` header. The token is a JSON Web Token (JWT) obtained upon successful login.

---

## Authentication

### `POST /auth/login`
Authenticates a user and returns a JWT.

-   **Request Body**:
    ```json
    {
      "email": "student@example.com",
      "password": "password",
      "role": "student"
    }
    ```
-   **Success Response (200 OK)**:
    ```json
    {
      "token": "ey...",
      "user": {
        "id": "u1",
        "name": "Kashif (Student)",
        "email": "student@example.com",
        "role": "student"
      }
    }
    ```
-   **Error Response (401 Unauthorized)**:
    ```json
    {
      "error": "Invalid credentials or role mismatch."
    }
    ```

### `POST /auth/register`
Registers a new student user. Admin registration is disabled via the API.

-   **Request Body**:
    ```json
    {
      "name": "New Student",
      "email": "new@example.com",
      "password": "newpassword123"
    }
    ```
-   **Success Response (201 Created)**: Returns the same response as login.

---

## Books (Catalog)

### `GET /books`
Get a list of all books. Supports filtering and searching.

-   **Query Parameters**:
    -   `q` (string): Search query for title or author.
    -   `category` (string): Filter by category.
    -   `available` (boolean): Filter by availability.
-   **Success Response (200 OK)**:
    ```json
    {
      "books": [
        {
          "id": "1",
          "isbn": "978-0132350884",
          "title": "Clean Code",
          "author": "Robert C. Martin",
          "status": "Available",
          "..."
        }
      ]
    }
    ```

### `GET /books/:id`
Get details for a single book.

-   **Success Response (200 OK)**:
    ```json
    {
      "id": "1",
      "isbn": "978-0132350884",
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "status": "Available",
      "description": "...",
      "coverUrl": "..."
    }
    ```

### `POST /books` (Admin only)
Add a new book to the catalog.

-   **Request Body**: `Book` object without `id` and `status`.
-   **Success Response (201 Created)**: Returns the newly created book object.

### `PUT /books/:id` (Admin only)
Update an existing book.

-   **Request Body**: `Book` object with updated fields.
-   **Success Response (200 OK)**: Returns the updated book object.

### `DELETE /books/:id` (Admin only)
Delete a book from the catalog.

-   **Success Response (204 No Content)**

---

## Circulation (Admin only)

### `POST /circulation/issue`
Issue a book to a member.

-   **Request Body**:
    ```json
    {
      "bookId": "b1",
      "memberId": "u1",
      "dueDate": "2025-12-25"
    }
    ```
-   **Success Response (200 OK)**:
    ```json
    {
      "transactionId": "t123",
      "message": "Book issued successfully."
    }
    ```

### `POST /circulation/return`
Return a borrowed book.

-   **Request Body**:
    ```json
    {
      "transactionId": "t123"
    }
    ```
-   **Success Response (200 OK)**:
    ```json
    {
      "message": "Book returned successfully.",
      "fine": 0.00
    }
    ```

---

## Reservations (Student only)

### `POST /reservations`
Create a reservation for a book.

-   **Request Body**:
    ```json
    {
      "bookId": "b5"
    }
    ```
-   **Success Response (201 Created)**:
    ```json
    {
      "reservationId": "r456",
      "message": "You are #1 in the queue."
    }
    ```

---

## Users (Admin only)

### `GET /users`
Get a list of all users.

-   **Success Response (200 OK)**: Returns an array of user objects.

### `PUT /users/:id`
Update a user's details (e.g., activate/deactivate, change role).

-   **Success Response (200 OK)**: Returns the updated user object.
