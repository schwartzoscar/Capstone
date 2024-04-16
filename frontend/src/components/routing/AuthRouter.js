import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "../home/Home";
import Profile from "../profile/Profile";

const router = createBrowserRouter([
  { path: "/", element: <Home/> },
  { path: "/profile", element: <Profile/>, children: [
    { path: ":userId", element: <Profile/> }
  ]},
  { path: "/profile/:userId", element: <Profile/> },
  { path: "*", element: <Navigate to="/" replace /> }
]);

export default function AuthRouter() {
  return <RouterProvider router={router}/>;
}
