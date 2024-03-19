import { useAuthContext } from "../../contexts/AuthContext";
import { useProfileContext } from "./Profile";

export default function ProfileContent() {

  const { currentUser } = useAuthContext();
  const { isMe } = useProfileContext();

  return(
    <div className="page-section flex-grow-1">
      <p>left</p>
    </div>
  );
}
