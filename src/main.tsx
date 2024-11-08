import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./NotFound.tsx";
import HomePage from "./HomePage.tsx";
import Savings from "./Savings.tsx";
import Loans from "./Loans.tsx";

const router = createBrowserRouter([
  { path: "/", element: <HomePage />, errorElement: <NotFound /> },
  { path: "/savings", element: <Savings /> },
  { path: "/loans", element: <Loans /> },
  { path: "/app", element: <App /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
