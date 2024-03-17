import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Base from '../../components/base/Base';

export default function Profile() {

  const params = useParams();
  const [isMe, setIsMe] = useState(true);

  useEffect(() => {
    const visitor = (params.hasOwnProperty('userId') && params.userId !== "me")
    setIsMe(!visitor)
  }, [params]);

  return(
    <div>
      <h1>Profile Page</h1>
       <Base>
        <div>
        </div>
      </Base>   
    </div>
  );
}
