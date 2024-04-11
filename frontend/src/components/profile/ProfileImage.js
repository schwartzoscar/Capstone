import { useState } from 'react';
import { useAuthContext } from "../../contexts/AuthContext";
import { useProfileContext } from "./Profile";
import { getSpacesImage } from "../../helpers/imageHelpers";
import ImageCropModal from "../elements/ImageCropModal";

export function Static() {

  const { visitedUser } = useProfileContext();

  return(
    <div className="img-responsive profile-img-full">
      <img src={getSpacesImage(visitedUser.profile_img)} alt={`${visitedUser.username}'s Avatar`}/>
    </div>
  );
}

export function Editable() {

  const { currentUser } = useAuthContext();
  const [show, setShow] = useState(false);

  return(
    <>
      <div className="img-responsive profile-img-full is-editable" onClick={() => setShow(true)}>
        <div className="profile-img-edit-icon"/>
        <div className="profile-img-edit-overlay"/>
        <img src={getSpacesImage(currentUser.profile_img)} alt="Update Profile Image"/>
      </div>
      <ImageCropModal show={show} setShow={setShow}/>
    </>
  );
}
