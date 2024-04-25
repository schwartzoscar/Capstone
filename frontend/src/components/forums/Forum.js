import { useParams } from 'react-router-dom';
import Base from "../base/Base";
import PostList from "../posts/PostList";

export default function Forum() {

  const { forumName } = useParams();

  return(
    <Base>
      <div className="max-w-xl mx-auto">
        <div className="page-section">
          <p>forum overview</p>
        </div>
        <div className="page-section">
          <PostList iSProps={{ postData: {forumName} }}/>
        </div>
      </div>
    </Base>
  );
}
