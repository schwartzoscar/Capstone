import { useParams } from 'react-router-dom';
import Base from "../base/Base";

export default function Forum() {

  const { forumName } = useParams();

  return(
    <Base>
      <div className="max-w-xl mx-auto">
        <div className="page-section">
          <p>test</p>
        </div>
      </div>
    </Base>
  );
}
