# Student Management System

## About the Project

The application allows users to:

* Add new students
* View all students
* Update student details
* Delete students
* Add marks for students
* View student details along with their marks
* Browse students using pagination

The project is built using React.js for the frontend, Node.js and Express.js for the backend, and PostgreSQL as the database.

---

## Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL (Supabase)

---

## Database Design

I used two separate tables:

### Students

Stores student information such as:

* First Name
* Last Name
* Email
* Phone Number

### Marks

Stores marks information such as:

* Subject Name
* Marks Obtained

The `marks` table is linked to the `students` table using a foreign key (`student_id`).

This keeps the database normalized and avoids storing duplicate information.

---

## API Features

### Student APIs

* Create Student
* Get All Students
* Get Student By ID
* Update Student
* Delete Student

### Marks APIs

* Add Marks for a Student
* View Marks with Student Details

### Pagination

Student listing supports pagination using:

```http
GET /api/students?page=1&limit=6
```

The response includes:

* Total Records
* Current Page
* Total Pages

---

## Project Structure

```text
client/
server/
schema.sql
README.md
```

---

## Setup Instructions

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the server folder:

```env
DATABASE_URL=your_database_connection_string
PORT=5000
```

---

## Database Setup

Run the SQL queries from the `schema.sql` file in your PostgreSQL database.

This will create the required tables for the project.

---

## Assumptions

* Each student can have multiple marks records.
* Email addresses are unique.
* Marks are stored in a separate table for better database design.
* Basic validation is implemented on both frontend and backend.

---

## What I Learned

While working on this assignment, I practiced:

* PostgreSQL database design
* REST API development
* React and API integration
* Pagination implementation
* Managing relationships between database tables

---

## Author

Kaushiki Singh
