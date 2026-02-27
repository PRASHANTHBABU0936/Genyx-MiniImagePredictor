# Mini Image Prediction Web App

A full-stack web application that allows users to register, log in, upload an image, receive a mock AI prediction, and view their history on a stylized, glassmorphic dashboard. 

## Features
- **JWT Authentication:** Secure Register/Login system.
- **Protected Routes:** Both API endpoints and Frontend pages are protected.
- **Image Upload:** Local multipart form upload handling with `multer`.
- **Mock AI Prediction:** Generates a randomized prediction label for uploaded images.
- **Premium UI:** Custom vanilla CSS utilizing glassmorphism, gradients, hover effects, and modern aesthetics.
- **Responsive Dashboard:** Shows a grid of all predictions and their timestamps.

## Tech Stack
- **Frontend:** React (Vite), React Router DOM, Axios, Lucide React (Icons)
- **Backend:** Node.js, Express, Mongoose, JSON Web Tokens (JWT), Bcrypt.js, Multer
- **Database:** MongoDB (using local default or standard URI)

## Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Make sure MongoDB is running locally on port `27017` (the app connects to `mongodb://localhost:27017/minipredict` by default). Alternatively, customize the connection by defining a `MONGO_URI` environment variable.
4. Start the backend Node server:
   ```bash
   npm start
   ```
   *(Creates an `uploads/` folder dynamically if it doesn't exist)*
   The server will run on `http://localhost:5000`.

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
4. Click the local host link provided (usually `http://localhost:5173`) to view the application.

## End-to-End Flow Validation
- **Register:** Create a new user account.
- **Login:** Log in to get the JWT token (stored automatically in localStorage).
- **Upload:** Drag & drop or select an image on the "Predict" page. 
- **Wait:** See the image and mock AI prediction result.
- **Dashboard:** Navigate to the Dashboard menu to see a grid of all previously uploaded images and their timestamps.
