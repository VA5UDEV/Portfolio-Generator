import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Hero from "./pages/Hero";
import Home from "./pages/Home";
import Login from "./components/Login";
import ForgetPass from "./pages/ForgetPass";
import Signup from "./pages/Signup";
import AuthLayout from "./components/AuthLayout";
import PortfolioBuilder from "./components/portfolio-builder/PortfolioBuilder";
import PortfolioForm from "./components/PortfolioForm";
import TemplateSelector from "./components/TemplateSelector";
import PortfolioPreview from "./components/PortfolioPreview";
import ExportPortfolio from "./components/ExportPortfolio";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/home",
        element: (
          <AuthLayout authentication={true}>
            <Home />
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
        children: [
          {
            path: "/builder/form",
            element: <PortfolioForm />,
          },
          {
            path: "/builder/template",
            element: <TemplateSelector />,
          },
          {
            path: "/builder/preview",
            element: <PortfolioPreview />,
          },
          {
            path: "/builder/export",
            element: <ExportPortfolio />,
          },
        ],
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
