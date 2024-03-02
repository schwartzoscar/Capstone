import { AuthProvider } from "../contexts/AuthContext";
import AppRouter from "./routing/AppRouter";

export default function App() {
  return(
    <AuthProvider>
      <AppRouter/>
    </AuthProvider>
  );
}
