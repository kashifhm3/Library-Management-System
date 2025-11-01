# Library Management System (LMS)

A modern, responsive web application to manage a library's book catalog, user information, and loan transactions. This project features distinct roles for Students and Administrators, each with a tailored dashboard and functionalities.

## Table of Contents
1.  [Features](#features)
2.  [Tech Stack](#tech-stack)
3.  [Project Structure](#project-structure)
4.  [Setup and Running the Project](#setup-and-running-the-project)
5.  [API Specification](#api-specification)
6.  [Database Schema](#database-schema)
7.  [Testing Checklist](#testing-checklist)
8.  [Security & Non-Functional Requirements](#security--non-functional-requirements)

---

## Features

### For Students (Members)
- **Secure Login**: Authenticate with a student-specific role.
- **Dashboard**: View currently borrowed books and their due dates.
- **Catalog Search**: Search the library's collection by title or author.
- **Book Details**: View detailed information about each book.
- **Borrowing**: Borrow available books directly from the details page.
- **Profile Management**: (Stubbed) Manage personal information.
- **Fines & History**: (Stubbed) View borrowing history and outstanding fines.

### For Admins (Librarians)
- **Secure Login**: Authenticate with an admin-specific role.
- **Admin Dashboard**: Get an at-a-glance overview of library statistics (KPIs).
- **Catalog Management**: Full CRUD (Create, Read, Update, Delete) functionality for the book catalog.
- **User Management**: (Stubbed) Manage student and staff accounts.
- **Circulation Management**: (Stubbed) Manually issue, return, and renew books.
- **Reporting**: (Stubbed) Generate and export library usage reports.

---

## Tech Stack

-   **Frontend**: React, TypeScript, Tailwind CSS
-   **State Management**: React Context API
-   **Backend Simulation**: All backend logic and data are mocked within the frontend for demonstration purposes.

---

## Project Structure
The project is organized as a single-page React application.

```
/
|-- public/
|-- src/
|   |-- components/      # Reusable React components
|   |-- context/         # React Context for global state (Auth)
|   |-- data/            # Mock data for books and users
|   |-- docs/            # Project documentation
|   |   |-- api.md
|   |   |-- database.sql
|   |   |-- diagrams/
|   |-- hooks/           # Custom React hooks
|   |-- pages/           # Page-level components
|   |-- types/           # TypeScript type definitions
|   |-- App.tsx          # Main application component with routing
|   |-- index.css
|   |-- index.tsx        # Application entry point
|-- index.html
|-- package.json
|-- README.md
```

---

## Setup and Running the Project

This is a self-contained web application. No build steps are required.

1.  **Open `index.html`**: This file contains the complete application and will run in any modern web browser.
2.  **Login Credentials**: Use the following credentials from the mock data (`src/data/mockData.ts`):
    *   **Admin**:
        *   Email: `admin@example.com`
        *   Password: `admin`
    *   **Student**:
        *   Email: `student@example.com`
        *   Password: `password`

---

## API Specification
The application logic simulates calls to a RESTful API. See the full specification in [docs/api.md](./docs/api.md).

---

## Database Schema
The database schema is designed for PostgreSQL. See the full DDL (Data Definition Language) script in [docs/database.sql](./docs/database.sql).

---

## Testing Checklist
A manual testing checklist for key user flows.

**Authentication**
- [ ] User can select 'Student' role on the login page.
- [ ] User can select 'Admin' role on the login page.
- [ ] Login fails with incorrect credentials, showing an inline error.
- [ ] Login fails if the selected role does not match the user's actual role.
- [ ] A logged-in Student is redirected to the Student Dashboard.
- [ ] A logged-in Admin is redirected to the Admin Dashboard.
- [ ] A logged-out user cannot access protected dashboard pages.

**Student Flow**
- [ ] Student can view their loaned books on the dashboard.
- [ ] Student can search for books.
- [ ] Student can view the details of a book.
- [ ] Student can borrow an available book.
- [ ] Student cannot borrow an already borrowed book.

**Admin Flow**
- [ ] Admin can view library KPIs on the dashboard.
- [ ] Admin can navigate to the "Manage Books" page.
- [ ] Admin can add a new book to the catalog.
- [ ] Admin can edit an existing book's details.
- [ ] Admin can delete a book from the catalog.

---

## Security & Non-Functional Requirements

-   **Authentication**: Passwords in a real system should be hashed with `bcrypt` or `argon2`. The mock server mimics JWT-based authentication with role claims.
-   **Authorization**: Role-based access control is enforced on the client-side, simulating server-side middleware.
-   **Input Validation**: Forms include basic `required` validation. In a real application, this would be backed by server-side validation.
-   **Performance**: The application is highly responsive due to its client-side nature. Virtualized lists should be used for very large catalogs.
-   **Backups**: The database strategy should include daily automated backups with weekly snapshots stored off-site.
