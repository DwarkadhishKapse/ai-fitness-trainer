# 🏋️ AI Fitness Trainer

An AI-powered fitness platform built with the MERN stack that helps users track workouts, receive real-time exercise feedback using MediaPipe Pose Detection, and generate personalized diet plans with Google Gemini AI.

---

## 🚀 Features

### 🔐 Authentication
- Email & Password Registration
- JWT Authentication
- Protected Routes
- Session Expiration Handling
- Google Sign Up
- Google Login

### 🤖 AI Diet Planner
- Generate personalized diet plans using Gemini AI
- Calories, Protein, Carbs, and Fat recommendations
- Breakfast, Lunch, Dinner, and Snacks suggestions
- Diet history storage
- Delete previous plans
- Expand/Collapse diet cards
- Skeleton loading while generating
- Persistent plans after page refresh

### 🏋️ AI Workout Trainer
Real-time exercise analysis using MediaPipe Pose Detection.

Supported exercises:
- Push Ups
- Squats
- Plank
- Lunges

Features:
- Rep counting
- Stage detection
- Form feedback
- Body visibility checking
- Posture correction

### 📊 Dashboard
- Total workouts
- Total reps
- Favorite exercise
- Weekly progress chart
- Exercise statistics

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- Bcrypt

### AI Technologies
- Google Gemini API
- MediaPipe Pose Landmarker

### Authentication
- Google OAuth
- JSON Web Tokens (JWT)

---

## 📂 Project Structure

```
backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
└── server.js

frontend/
├── components/
├── context/
├── data/
├── hooks/
├── pages/
├── services/
├── trainers/
├── utils/
└── App.jsx
```

---

## ⚡ Installation

### Clone repository

```bash
git clone https://github.com/DwarkadhishKapse/ai-fitness-trainer.git
```

### Install dependencies

```bash
npm install
```

```bash
cd frontend
npm install
```

```bash
cd ../backend
npm install
```

---

## Environment Variables

### Backend `.env`

```env
PORT=
MONGO_URI=
JWT_SECRET=
GEMINI_API_KEY=
GOOGLE_CLIENT_ID=
```

### Frontend `.env`

```env
VITE_API_URL=
VITE_GOOGLE_CLIENT_ID=
```

---

## Run Project

### Backend

```bash
npm run server
```

### Frontend

```bash
npm run client
```

---

## Future Improvements

- Forgot Password with OTP
- User Profile Page
- More AI exercises
- Exercise History
- Dark / Light Theme
- Deployment

---

## Screenshots

<img width="1920" height="871" alt="Screenshot (127)" src="https://github.com/user-attachments/assets/c47972bb-c7b1-4252-b947-e8d318529ba2" />

<img width="1920" height="865" alt="Screenshot (128)" src="https://github.com/user-attachments/assets/3f3b2308-93cc-46ab-93b8-3d8b145b659d" />

<img width="1920" height="863" alt="Screenshot (129)" src="https://github.com/user-attachments/assets/34e66519-b66a-44b1-b993-26d8f6ed4354" />

<img width="1920" height="860" alt="Screenshot (130)" src="https://github.com/user-attachments/assets/ced9f7d8-cb4d-4ff3-b43c-365b38404482" />

<img width="1920" height="860" alt="Screenshot (131)" src="https://github.com/user-attachments/assets/1bd59873-9279-4bbc-99cd-e6343fd78841" />

<img width="1920" height="861" alt="Screenshot (132)" src="https://github.com/user-attachments/assets/7590bcff-2ab1-4a65-b492-21e0863f4021" />

<img width="1920" height="857" alt="Screenshot (133)" src="https://github.com/user-attachments/assets/1a959b68-7616-47cd-b492-49ee78257d9e" />

<img width="1920" height="866" alt="Screenshot (134)" src="https://github.com/user-attachments/assets/e7f403e0-3b57-4eca-938d-54803c375867" />

---

## Author

**Dwarkadhish Kapse**

GitHub:
https://github.com/DwarkadhishKapse

---

⭐ If you found this project helpful, please consider giving it a star!
