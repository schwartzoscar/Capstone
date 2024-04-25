import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "../home/Home";
import Profile from "../profile/Profile";
import BlogCreation from "../blog/BlogCreation";

const router = createBrowserRouter([
  { path: "/", element: <Home/> },
  { path: "/profile", element: <Profile/>, children: [
    { path: ":userId", element: <Profile/> }
  ]},
  { path: "/profile/:userId", element: <Profile/> },
  { path: "/create-blog", element: <BlogCreation/> },
  { path: "*", element: <Navigate to="/" replace /> }
]);

export default function AuthRouter() {
  return <RouterProvider router={router}/>;
}
