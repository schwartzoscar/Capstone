import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import Base from "../base/Base";
import PostList from "../posts/PostList";

export default function Forum() {

  const { forumName } = useParams();
  const [forum, setForum] = useState(null);

  const getForum = async() => {
    const resp = await apiClient.post('/forums/get', {forumName});
    handleResp(resp, data => {
      setForum(data.forum)
    });
  }

  useEffect(() => {
    getForum();
  }, [forumName]);

  // TODO loading wrapper
  if(!forum) return null;

  return(
    <Base>
      <div className="max-w-xl mx-auto">
        <div className="page-section mb-20">
          <p>forum overview</p>
        </div>
        <div className="page-section">
          <PostList iSProps={{ postData: {forumName} }}/>
        </div>
      </div>
    </Base>
  );
}
