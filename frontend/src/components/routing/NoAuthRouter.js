import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from "../registration/Login";
import Register from "../registration/Register"

const router = createBrowserRouter([
  { path: "/login", element: <Login/> },
  { path: "/register", element: <Register/> },
  { path: "*", element: <Navigate to="/login" replace /> }
]);

export default function NoAuthRouter() {
  return <RouterProvider router={router}/>;
}
