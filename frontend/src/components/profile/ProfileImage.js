import { useState } from 'react';
import clsx from 'clsx';
import { useProfileContext } from "./Profile";
import { getProfileImage } from "../../helpers/imageHelpers";
import ImageCropModal from "../elements/ImageCropModal";

export default function ProfileImage() {

  const { isMe, visitedUser } = useProfileContext();
  const [show, setShow] = useState(false);

  const toggleModal = () => {
    if(isMe) setShow(true);
  }

  return(
    <>
      <div className={clsx("img-responsive profile-img-full", {"is-editable": isMe})} onClick={toggleModal}>
        {isMe && <div className="profile-img-edit-icon"/>}
        {isMe && <div className="profile-img-edit-overlay"/>}
        <img src={getProfileImage(visitedUser.profile_img)} alt={isMe ? "Update Profile Image" : `${visitedUser.username}'s Avatar`}/>
      </div>
      {isMe && <ImageCropModal show={show} setShow={setShow}/>}
    </>
  );
}
