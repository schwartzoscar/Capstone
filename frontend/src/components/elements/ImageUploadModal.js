import { useState } from "react";
import { useFilePicker } from 'use-file-picker';
import { FileAmountLimitValidator, FileTypeValidator, FileSizeValidator } from 'use-file-picker/validators';
import Modal from "./Modal";
import Button from "./Button";

export default function ImageUploadModal(props) {

  const { title, show, setShow, onSave: saveCallback } = props;
  const [uploading, setUploading] = useState(false);

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

  const onSave = async() => {
    setUploading(true);
    if(saveCallback) await saveCallback(filesContent);
    setUploading(false);
  }

  if(loading) return <div>Loading...</div>;
  if(errors.length) return <div>Error...</div>;

  return (
    <Modal title={title ?? "Upload Image"} show={show} setShow={setShow} onSave={onSave} saveBtnProps={{ loading: uploading }}>
      <Button onClick={() => openFilePicker()} className="btn-primary">Select Image</Button>
      {filesContent.map((file, index) => (
        <div key={index} className="img-responsive profile-img-crop">
          <img src={file.content} alt={file.name}/>
        </div>
      ))}
    </Modal>
  );
}
