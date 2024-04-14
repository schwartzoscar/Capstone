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

  const followUser = useCallback(async() => {
    const resp = await apiClient.post('/profile/follow', {userId: visitedUser?._id});
    handleResp(resp, () => {
      getUserStats();
    });
  }, [visitedUser, getUserStats]);

  return(
    <div className="page-section" style={{minWidth: 300}}>
      <ProfileImage/>
      <div className="mt-20">
        <p>Joined {formatDate(visitedUser.created_at)}</p>
        { !loading && <>
          <p>Total Posts: {userStats.posts}</p>
          <p>Following: {userStats.following}</p>
          <p>Followers: {userStats.followers}</p>
          {!isMe && <p onClick={followUser}>Follow</p>}
        </> }
      </div>
    </div>
  );
}
