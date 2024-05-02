import clsx from 'clsx';
import ImageCropModal from "../elements/ImageCropModal";

export default function ImageRounded(props) {

  const { editable, src, alt, onSubmit, show, setShow } = props;

  const toggleModal = () => {
    if(editable) setShow(true);
  }

  return(
    <>
      <div className={clsx("img-responsive profile-img-full", {"is-editable": editable})} onClick={toggleModal}>
        {editable && <div className="profile-img-edit-icon"/>}
        {editable && <div className="profile-img-edit-overlay"/>}
        <img src={src} alt={alt}/>
      </div>
      {editable && <ImageCropModal show={show} setShow={setShow} onSubmit={onSubmit} aspect={1} circular={true}/>}
    </>
  );
}
