import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./index.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authslice";
import { Header } from "./components";
import { Outlet } from "react-router-dom";


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-col">
      <div className="w-full flex flex-col">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  ) : null;
}

export default App;
