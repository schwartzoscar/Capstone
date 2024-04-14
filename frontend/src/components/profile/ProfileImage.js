import { useState } from 'react';
import clsx from 'clsx';
import { useProfileContext } from "./Profile";
import { getSpacesImage } from "../../helpers/imageHelpers";
import ImageCropModal from "../elements/ImageCropModal";

export default function ProfileImage() {

  const { isMe, visitedUser } = useProfileContext();
  const [show, setShow] = useState(false);

  const toggleModal = () => {
    if(isMe) setShow(true);
  }

  let src = '/images/Defaultprofile.jpg';
  if(visitedUser.profile_img) src = getSpacesImage(visitedUser.profile_img);

  return(
    <>
      <div className={clsx("img-responsive profile-img-full", {"is-editable": isMe})} onClick={toggleModal}>
        {isMe && <div className="profile-img-edit-icon"/>}
        {isMe && <div className="profile-img-edit-overlay"/>}
        <img src={src} alt={isMe ? "Update Profile Image" : `${visitedUser.username}'s Avatar`}/>
      </div>
      {isMe && <ImageCropModal show={show} setShow={setShow}/>}
    </>
  );
}
