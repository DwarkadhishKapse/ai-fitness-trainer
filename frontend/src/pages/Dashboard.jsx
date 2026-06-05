import React, { useEffect } from "react";
import api from "../services/api";

const Dashboard = () => {
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/dashboard/stats");

        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    };
    fetchStats()
  }, []);

  return (
    <section>
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      <p className="mt-2 text-slate-400">
        View your workout summary, calories, progress charts, and AI trainer
        activity.
      </p>
    </section>
  );
};

export default Dashboard;
