import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "../home/Home";
import Profile from "../profile/Profile";
import BlogCreation from "../blog/BlogCreation";
import News from "../news/news";
import Forum from "../forums/Forum";
import NewForum from "../forums/NewForum";
import EditForum from "../forums/EditForum";

const router = createBrowserRouter([
  { path: "/", element: <Home/> },
  { path: "/profile", element: <Profile/>, children: [
    { path: ":userId", element: <Profile/> }
  ]},
  { path: "/profile/:userId", element: <Profile/> },
  { path: "/create-blog", element: <BlogCreation/> },
  { path: "/forum", children: [
    { path: '', element: <Navigate to="/" replace /> },
    { path: 'new', element: <NewForum/> },
    { path: ':forumName', element: <Forum/> },
    { path: ':forumName/edit', element: <EditForum/> }
  ]},
  { path: "/news", element: <News/>},
  { path: "*", element: <Navigate to="/" replace /> }
]);

export default function AuthRouter() {
  return <RouterProvider router={router}/>;
}
