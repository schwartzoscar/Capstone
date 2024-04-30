import { ToastContainer } from 'react-toastify';
import { AuthProvider } from "../contexts/AuthContext";
import { CurrentForumProvider } from "../contexts/CurrentForumContext";
import AppRouter from "./routing/AppRouter";

export default function App() {
  return(
    <AuthProvider>
      <CurrentForumProvider>
        <AppRouter/>
        <ToastContainer/>
      </CurrentForumProvider>
    </AuthProvider>
  );
}
