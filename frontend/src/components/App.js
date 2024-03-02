import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TestForm from "./TestForm";
import Home from "./home/Home";
import Profile from "./profile/Profile";
import Login from "./registration/Login";

const router = createBrowserRouter([
  { path: "/", element: <Home/> },
  { path: "/profile", element: <Profile/> },
  { path: "/test", element: <TestForm/> },
  { path: "/login", element: <Login/> },
]);

export default function App() {
  return(
    <RouterProvider router={router}/>
  );
}
