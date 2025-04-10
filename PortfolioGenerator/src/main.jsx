import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./components/Login";
import ForgetPass from "./pages/ForgetPass";
import Signup from "./pages/Signup";
import ViewTemplates from "./pages/ViewTemplates";
import AuthLayout from "./components/AuthLayout";
import PortfolioBuilder from "./components/portfolio-builder/PortfolioBuilder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: (
          <AuthLayout authentication={true}>
            <Dashboard />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/forgot",
        element: (
          <AuthLayout authentication={false}>
            <ForgetPass />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/builder",
        element: (
          <AuthLayout authentication={true}>
            <PortfolioBuilder />
          </AuthLayout>
        ),
      },
      {
        path: "/templates",
        element: (
          <AuthLayout authentication={true}>
            <ViewTemplates />
          </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
