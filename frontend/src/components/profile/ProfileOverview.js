import { useProfileContext } from "./Profile";
import * as ProfileImage from "./ProfileImage";

export default function ProfileOverview() {

  const { isMe } = useProfileContext();

  return(
    <div className="page-section" style={{minWidth: 300}}>
      {isMe ? <ProfileImage.Editable/> : <ProfileImage.Static/>}
      <div>
        <p>User Overview</p>
      </div>
    </div>
  );
}
