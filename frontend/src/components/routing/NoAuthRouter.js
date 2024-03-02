import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  { path: "/login", element: <div><h1>Login Screen</h1></div> },
  { path: "/register", element: <div><h1>Register Screen</h1></div> },
  { path: "*", element: <Navigate to="/login" replace /> }
]);

export default function NoAuthRouter() {
  return <RouterProvider router={router}/>;
}
