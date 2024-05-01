import { useRef, useState, useCallback } from "react";
import { useFilePicker } from 'use-file-picker';
import ReactCrop from "react-image-crop";
import { FileAmountLimitValidator, FileTypeValidator, FileSizeValidator } from 'use-file-picker/validators';
import { useDebounce } from "../../helpers/asyncHelpers";
import { updateCanvas } from "../../helpers/imageHelpers";
import Modal from "./Modal";
import Button from "./Button";

export default function ImageCropModal(props) {

  const { show, setShow, onSubmit, aspect, circular } = props;
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [currentBlob, setCurrentBlob] = useState(null);
  const [updating, setUpdating] = useState(false);

  const { openFilePicker, filesContent, loading, errors } = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: false,
    validators: [
      new FileAmountLimitValidator({ max: 1 }),
      new FileTypeValidator(['jpg', 'png']),
      new FileSizeValidator({ maxFileSize: 50 * 1024 * 1024 /* 50 MB */ })
    ],
  });

  useDebounce(() => {
    if(completedCrop && imgRef.current && canvasRef.current) {
      setUpdating(true);
      updateCanvas(imgRef.current, canvasRef.current, completedCrop, blob => {
        setUpdating(false);
        setCurrentBlob(blob);
      });
    }
  }, [completedCrop]);

  const updateProfileImg = useCallback(async() => {
    setUpdating(true);
    if(currentBlob && onSubmit) await onSubmit(currentBlob);
    setUpdating(false);
  }, [currentBlob, onSubmit]);

  if(loading) return <div>Loading...</div>;
  if(errors.length) return <div>Error...</div>;

  return (
    <Modal title={props.title ?? "Upload Image"} show={show} setShow={setShow} onSave={updateProfileImg} saveBtnProps={{loading: updating}}>
      <Button onClick={() => openFilePicker()} className="btn-primary">Select Image</Button>
      {filesContent.map((file, index) => (
        <div key={index} className="img-responsive profile-img-crop">
          <ReactCrop
            crop={crop}
            onChange={(_, pc) => setCrop(pc)}
            onComplete={(c) => setCompletedCrop(c)}
            minHeight={100}
            circularCrop={circular ?? false}
            aspect={aspect ?? null}
          >
            <img ref={imgRef} src={file.content} alt={file.name}/>
          </ReactCrop>
          <canvas className="d-none" ref={canvasRef}/>
        </div>
      ))}
    </Modal>
  );
}
