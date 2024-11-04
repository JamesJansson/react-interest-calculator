import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./NotFound.tsx";
import HomePage from "./HomePage.tsx";

const router = createBrowserRouter([
  { path: "/", element: <HomePage />, errorElement: <NotFound /> },
  { path: "/app", element: <App /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
