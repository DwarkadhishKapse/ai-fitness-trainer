import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Diet from "./pages/Diet";
import AITrainer from "./pages/AITrainer";
import Workout from "./pages/Workout";
import WorkoutHistory from "./pages/WorkoutHistory";
import WorkoutDetail from "./pages/WorkoutDetail";
import ExerciseDetail from "./pages/ExerciseDetail";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PublicRoute from "./components/layout/PublicRoute";
import AIDiet from "./pages/AIDiet";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <AppLayout />,
            children: [
              {
                path: "dashboard",
                element: <Dashboard />,
              },
              {
                path: "workout",
                element: <Workout />,
              },
              {
                path: "workout-history",
                element: <WorkoutHistory />,
              },
              {
                path: "workout/:workoutId",
                element: <WorkoutDetail />,
              },
              {
                path: "workout/:workoutId/:exerciseId",
                element: <ExerciseDetail />,
              },
              {
                path: "diet",
                element: <Diet />,
              },
              {
                path: "ai-diet",
                element: <AIDiet />,
              },
              {
                path: "ai-trainer",
                element: <AITrainer />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
