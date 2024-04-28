import { useState } from 'react';
import { useFormContext } from "react-hook-form";
import { apiClient, formDataHeaders } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import { getForumProfileImage, getForumBannerImage } from "../../helpers/imageHelpers";
import ImageRounded from "../elements/ImageRounded";
import ImageCropModal from "../elements/ImageCropModal";

export function Static(props) {

  const { children, profileSrc, bannerSrc } = props;

  return(
    <div className="page-section">
      <div className="forum-banner-wrapper">
        <ImageRounded editable={false} src={getForumProfileImage(profileSrc)} alt="Forum Profile Image"/>
        <div className="forum-banner-image img-responsive">
          <img src={getForumBannerImage(bannerSrc)} alt="Forum Banner Image"/>
        </div>
      </div>
      {children}
    </div>
  );
}

export function Editable(props) {

  const { children } = props;
  const { setValue, watch } = useFormContext();
  const [profileShow, setProfileShow] = useState(false);
  const [bannerShow, setBannerShow] = useState(false);
  const profileSrc = watch('profileImg');
  const bannerSrc = watch('bannerImg');

  const onSubmit = async(blob, type) => {
    const data = new FormData();
    data.append(type, blob, 'forum-temp.jpg');
    const resp = await apiClient.post('/forums/uploadTemp', data, formDataHeaders);
    handleResp(resp, data => {
      setValue(`${type}Img`, data.url);
      setProfileShow(false);
      setBannerShow(false);
    });
  }

  const toggleBannerModal = () => {
    setBannerShow(true);
  }

  return(
    <div className="page-section">
      <div className="forum-banner-wrapper">
        <ImageRounded
          editable={true} src={getForumProfileImage(profileSrc)} alt="Forum Profile Image"
          onSubmit={blob => onSubmit(blob, 'profile')} show={profileShow} setShow={setProfileShow}
        />
        <div className="forum-banner-image img-responsive is-editable" onClick={toggleBannerModal}>
          <div className="forum-banner-image-icon"/>
          <div className="forum-banner-image-overlay"/>
          <img src={getForumBannerImage(bannerSrc)} alt="Forum Banner Image"/>
        </div>
        <ImageCropModal show={bannerShow} setShow={setBannerShow} onSubmit={blob => onSubmit(blob, 'banner')}/>
      </div>
      {children}
    </div>
  );
}
