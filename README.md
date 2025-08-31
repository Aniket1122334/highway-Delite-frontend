Highyway Delite

Project Description:
It is a web application designed to provide seamless authentication and user management. Users can signup, verify OTPs, and access a secure dashboard. The project leverages React with TypeScript for the frontend and Node.js with Express.js for the backend.

Tech Stack

Frontend:
React + TypeScript
Bootstrap
Axios
CSS Modules

Backend:
Node.js
Express.js
MongoDB Atlas
Redis
JWT
Joi
Nodemailer
CORS

Authentication
OTP-based verification for both signup and signin
JWT for secure session handling
Joi for request validation

Major Features
OTP Verification
Secure JWT Authentication
Email notifications using Nodemailer
Dashboard accessible only after login

Usage
Signup by providing name, date of birth, and email.
Verify the OTP sent to your email.
On successful verification, user is redirected to the dashboard.
Returning users can signin using OTP.

API Endpoints
POST /api/auth/signup → Send OTP for new user signup
POST /api/auth/verify-signup → Verify OTP and create user
POST /api/auth/signin → Send OTP for existing user
POST /api/auth/verify-signin → Verify OTP and login
POST /api/auth/resend-otp → Resend OTP
GET /api/auth/user → Fetch logged-in user details
POST /api/auth/signout → Logout user

Notes
Redis is used to store temporary OTPs.
JWT ensures secure authentication and session management.
Dashboard and sensitive user details are protected and accessible only after login.
