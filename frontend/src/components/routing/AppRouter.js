import { useAuthContext } from "../../contexts/AuthContext";
import AuthRouter from "./AuthRouter";
import NoAuthRouter from "./NoAuthRouter";

export default function AppRouter() {

  const [{ accessToken }] = useAuthContext();

  return accessToken ? <AuthRouter/> : <NoAuthRouter/>;
}
