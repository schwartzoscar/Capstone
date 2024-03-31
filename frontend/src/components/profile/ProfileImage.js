import { useState } from 'react';
import { useAuthContext } from "../../contexts/AuthContext";
import { getSpacesImage } from "../../helpers/imageHelpers";
import ImageSelectModal from "../elements/ImageSelectModal";

export function Static() {

  const { currentUser } = useAuthContext();

  return(
    <div className="img-responsive profile-img-full">
      <img src={getSpacesImage(currentUser.profile_img)} alt={`${currentUser.username}'s Avatar`}/>
    </div>
  );
}

export function Editable() {

  const { currentUser } = useAuthContext();
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="img-responsive profile-img-full is-clickable" onClick={() => setShow(true)}>
        <img src={getSpacesImage(currentUser.profile_img)} alt="My Avatar"/>
      </div>
      <ImageSelectModal show={show} setShow={setShow}/>
    </>
  );
}
