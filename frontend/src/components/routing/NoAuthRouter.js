import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from "../registration/Login";

const router = createBrowserRouter([
  { path: "/login", element: <Login/> },
  { path: "/register", element: <div><h1>Register Screen</h1></div> },
  { path: "*", element: <Navigate to="/login" replace /> }
]);

export default function NoAuthRouter() {
  return <RouterProvider router={router}/>;
}
