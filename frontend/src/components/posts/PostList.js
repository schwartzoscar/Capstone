import { useState, useEffect } from 'react';
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import { useAuthContext } from "../../contexts/AuthContext";

export default function PostList() {

  const [{ currentUser }] = useAuthContext();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    apiClient.post('/posts/list', {userId: currentUser.id}).then(resp => {
      handleResp(resp, data => setPosts(data.posts));
    });
  }, [currentUser]);

  return(
    <div>

    </div>
  );
}
