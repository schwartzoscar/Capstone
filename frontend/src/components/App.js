import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TestForm from "./TestForm";
import Home from "./home/Home";
import Profile from "./profile/Profile";

const router = createBrowserRouter([
  { path: "/", element: <Home/> },
  { path: "/profile", element: <Profile/> },
  { path: "/test", element: <TestForm/> },
]);

export default function App() {
  return(
    <RouterProvider router={router}/>
  );
}
