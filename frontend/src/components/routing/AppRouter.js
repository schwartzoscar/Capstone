import { useAuthContext } from "../../contexts/AuthContext";
import AuthenticatedRouter from "./AuthenticatedRouter";
import UnauthenticatedRouter from "./UnauthenticatedRouter";

export default function AppRouter() {

  const [{ accessToken }] = useAuthContext();

  return accessToken ? <AuthenticatedRouter/> : <UnauthenticatedRouter/>;
}
