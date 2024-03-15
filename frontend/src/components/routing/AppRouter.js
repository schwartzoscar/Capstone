import { useAuthContext } from "../../contexts/AuthContext";
import AuthRouter from "./AuthRouter";
import NoAuthRouter from "./NoAuthRouter";

export default function AppRouter() {

  const { currentUser } = useAuthContext();

  return currentUser ? <AuthRouter/> : <NoAuthRouter/>;
}
