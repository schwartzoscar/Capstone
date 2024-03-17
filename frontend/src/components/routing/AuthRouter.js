import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "../home/Home";
import Profile from "../profile/Profile";
import HomeTemp from "../home/HomeTemp";

const router = createBrowserRouter([
  { path: "/", element: <Home/> },
  { path: "/temp", element: <HomeTemp/> },
  { path: "/profile", element: <Profile/> },
  { path: "*", element: <Navigate to="/" replace /> }
]);

export default function AuthRouter() {
  return <RouterProvider router={router}/>;
}
