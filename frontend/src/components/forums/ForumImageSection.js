import { useState } from 'react';
import clsx from 'clsx';
import { useFormContext } from "react-hook-form";
import { apiClient, formDataHeaders } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import { getSpacesImage } from "../../helpers/imageHelpers";
import ImageRounded from "../elements/ImageRounded";
import ImageCropModal from "../elements/ImageCropModal";

export default function ForumImageSection(props) {

  const { editable, children } = props;
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
      setValue(`${type}Img`, getSpacesImage(data.url));
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
          editable={editable} src={profileSrc} alt="Forum Profile Image"
          onSubmit={blob => onSubmit(blob, 'profile')} show={profileShow} setShow={setProfileShow}
        />
        <div className={clsx("forum-banner-image img-responsive", {"is-editable": editable})} onClick={toggleBannerModal}>
          {editable && <div className="forum-banner-image-icon"/>}
          {editable && <div className="forum-banner-image-overlay"/>}
          <img src={bannerSrc} alt="Forum Banner Image"/>
        </div>
        {editable && <ImageCropModal show={bannerShow} setShow={setBannerShow} onSubmit={blob => onSubmit(blob, 'banner')}/>}
      </div>
      {children}
    </div>
  );
}
