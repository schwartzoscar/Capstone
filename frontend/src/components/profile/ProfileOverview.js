import { useAuthContext } from "../../contexts/AuthContext";
import { useProfileContext } from "./Profile";

export default function ProfileOverview() {

  const { currentUser } = useAuthContext();
  const { isMe } = useProfileContext();

  return(
    <div className="page-section" style={{minWidth: 300}}>
      <p>right</p>
    </div>
  );
}
