import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "../home/Home";
import Profile from "../profile/Profile";
import TestForm from "../TestForm";

const router = createBrowserRouter([
  { path: "/", element: <Home/> },
  { path: "/profile", element: <Profile/> },
  { path: "/test", element: <TestForm/> },
  { path: "*", element: <Navigate to="/" replace /> }
]);

export default function AuthenticatedRouter() {
  return <RouterProvider router={router}/>;
}
