# Signup/SignIn Page with Note List

## Project Overview
This is a **full-stack application** that enables users to securely sign up, sign in, and manage personal notes. It features **email OTP verification**, **JWT-based authentication**, and a **notes management system** where users can create, view, and delete their notes.

**Live Preview:** [Signup/Signin Demo](https://highway-delite-frontend-seven.vercel.app/signin)

---


## Tech Stack
- **Frontend:** React + TypeScript  
- **Backend:** Node.js, Express  
- **Database:** MongoDB Atlas  
- **Authentication & Validation:** JSON Web Token (JWT), Joi, dotenv  
- **Email Service:** Nodemailer  
- **Other Tools:** CORS  

---

## Features

### Authentication & OTP Verification
- **Signup:**
  - Users provide **name, date of birth, and email** in correct format.  
  - OTP is sent to the provided email.  
  - Upon entering the correct OTP, a **JWT token is generated** and the user is saved in MongoDB.  

- **Signin:**
  - Users enter their email.  
  - If the user does not exist: **"Please signup / User not found"** is shown.  
  - If the user exists, an OTP is sent to the registered email.  
  - Upon entering the correct OTP, users are authenticated and redirected to the **Dashboard**.

### Notes Management
- **Create Notes:** Add a note with a heading and message.  
- **View Notes:** Display a list of all notes associated with the logged-in user.  
- **Delete Notes:** Authenticated users can delete their existing notes.  

---

## Environment Variables

To run this project, you need to set the following environment variables:

```env
MONGODB_URL=<Your MongoDB Atlas connection string>
SALT1=<Random long number for OTP security>
SALT2=<Random long number for OTP security>
SECRET=<JWT secret key>
EMAIL_HOST=<Email host>
EMAIL_PORT=<Nodemailer port>
EMAIL_USER=<Author's email>
EMAIL_PASS=<Email password>



Project Structure

├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── utils
│   ├── app.js
│   └── server.js
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.tsx
│   └── vite.config.ts
└── README.md


