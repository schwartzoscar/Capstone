import { ToastContainer } from 'react-toastify';
import { AuthProvider } from "../contexts/AuthContext";
import AppRouter from "./routing/AppRouter";

export default function App() {
  return(
    <AuthProvider>
      <AppRouter/>
      <ToastContainer/>
    </AuthProvider>
  );
}
