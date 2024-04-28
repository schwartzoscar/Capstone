import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import Base from "../base/Base";
import PostList from "../posts/PostList";

export default function Forum() {

  const { forumName } = useParams();
  const navigate = useNavigate();
  const [forum, setForum] = useState(null);

  const getForum = async() => {
    const resp = await apiClient.post('/forums/get', {forumName});
    handleResp(resp, data => {
      setForum(data.forum);
    }, () => {
      toast.error("This forum does not exist.");
      navigate('/');
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
