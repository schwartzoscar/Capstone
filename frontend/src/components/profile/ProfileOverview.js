import { useAuthContext } from "../../contexts/AuthContext";

export default function ProfileOverview() {

  const { currentUser } = useAuthContext();

  return(
    <div className="page-section" style={{minWidth: 300}}>
      <p>right</p>
    </div>
  );
}
