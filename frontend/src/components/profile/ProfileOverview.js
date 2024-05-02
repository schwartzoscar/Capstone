import { useEffect, useState, useCallback } from 'react';
import { useProfileContext } from "./Profile";
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import { formatDate } from "../../helpers/dateTimeHelpers";
import ProfileImage from "./ProfileImage";

export default function ProfileOverview() {

  const { isMe, visitedUser } = useProfileContext();
  const [userStats, setUserStats] = useState({posts: 0, following: 0, followers: 0});
  const [loading, setLoading] = useState(false);

  const getUserStats = useCallback(async() => {
    setLoading(true);
    const resp = await apiClient.post('/profile/getStats', {userId: visitedUser?._id});
    handleResp(resp, data => {
      setUserStats(data.stats);
      setLoading(false);
    });
  }, [visitedUser]);

  useEffect(() => {
    getUserStats();
  }, [visitedUser, getUserStats]);

  const followUpdate = useCallback(async(follow = true) => {
    const route = `/profile/${follow ? 'follow' : 'unfollow'}`;
    const resp = await apiClient.post(route, {userId: visitedUser?._id});
    handleResp(resp, () => {
      getUserStats();
    });
  }, [visitedUser, getUserStats]);


  //This is just for looking at the following/followers count in console
  console.log("userStats:", userStats);

  return(
    <div className="page-section" style={{minWidth: 300}}>
      <ProfileImage/>
      <div className="mt-20">
        <p>Joined {formatDate(visitedUser.created_at)}</p>
        { !loading && <>
          <p>Total Posts: {userStats.posts}</p>
          <p>Following: {userStats.following_count}</p>
          <p>Followers: {userStats.followers_count}</p>
          {!isMe && (
            <div className="link-primary is-clickable" onClick={() => followUpdate(true)}>
              <span className="fas fa-plus mr-4"/>
              <span>Follow</span>
            </div>
          )}
        </> }
      </div>
    </div>
  );
}
