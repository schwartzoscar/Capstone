import { useState } from 'react';
import { toast } from "react-toastify";
import { useAuthContext } from "../../contexts/AuthContext";
import { useProfileContext } from "./Profile";
import { apiClient, formDataHeaders } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import { getProfileImage } from "../../helpers/imageHelpers";
import ImageRounded from "../elements/ImageRounded";

export default function ProfileImage() {

  const { refreshUser } = useAuthContext();
  const { isMe, visitedUser } = useProfileContext();
  const [show, setShow] = useState(false);

  const onSubmit = async(blob) => {
    const data = new FormData();
    data.append('file', blob, 'profile.jpg');
    const resp = await apiClient.post('/profile/updateImage', data, formDataHeaders);
    handleResp(resp, () => {
      toast.success('Profile image updated successfully.')
      refreshUser();
      setShow(false);
    });
  }

  return(
    <ImageRounded
      editable={isMe} src={getProfileImage(visitedUser.profile_img)}
      alt={isMe ? "Update Profile Image" : `${visitedUser.username}'s Avatar`}
      onSubmit={onSubmit} show={show} setShow={setShow}
    />
  );
}
