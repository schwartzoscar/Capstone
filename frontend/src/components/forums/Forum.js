import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from "../../contexts/AuthContext";
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import Base from "../base/Base";
import PostList from "../posts/PostList";
import { Static as ForumImageSection } from "./ForumImageSection";
import RichTextReadOnly from "../elements/RichTextReadOnly";
import Button from "../elements/Button";

export default function Forum() {

  const { forumName } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const [forum, setForum] = useState(null);

  const getForum = async() => {
    const resp = await apiClient.post('/forums/get', {forumName: forumName.toLowerCase()});
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

  const joinForum = async() => {

  }

  const leaveForum = async() => {

  }

  const forumRole = useMemo(() => {
    if(!forum) return null;
    let role = null;
    forum.users.forEach(user => {
      if(user._id === currentUser._id) {
        role = user.forum_role;
      }
    });
    return role;
  }, [forum, currentUser._id]);

  const forumActionBtn = useMemo(() => {
    if(!forum) return null;
    if(forum.public && !forumRole) {
      return <Button className="btn-primary" onClick={joinForum}>Join Forum</Button>
    } else if(forumRole && forumRole !== 'creator') {
      return <Button className="btn-secondary" onClick={leaveForum}>Leave Forum</Button>
    }
  }, [forum, forumRole]);

  // TODO loading wrapper
  if(!forum) return null;

  return(
    <Base>
      <div className="max-w-xl mx-auto">
        <ForumImageSection profileSrc={forum.profile_img} bannerSrc={forum.banner_img}>
          <div className="mb-8 d-flex justify-content-between">
            <div className="forum-name">
              <span>{forum.name}</span>
              {!forum.public && <span className="fas fa-lock ml-8"/>}
            </div>
            {forumActionBtn}
          </div>
          {forum.description && <div className="forum-description">
            <RichTextReadOnly content={forum.description}/>
          </div>}
        </ForumImageSection>
        <div className="page-section mt-20">
          <PostList iSProps={{postData: {forumId: forum._id}}}/>
        </div>
      </div>
    </Base>
  );
}
