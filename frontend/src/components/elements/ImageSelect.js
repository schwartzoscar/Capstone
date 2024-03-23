import { useState } from 'react';
import { useFilePicker } from 'use-file-picker';
import Modal from "./Modal";

import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
  ImageDimensionsValidator,
} from 'use-file-picker/validators';

export default function ImageSelect() {
  const { openFilePicker, filesContent, loading, errors } = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: true,
    validators: [
      new FileAmountLimitValidator({ max: 1 }),
      new FileTypeValidator(['jpg', 'png']),
      new FileSizeValidator({ maxFileSize: 50 * 1024 * 1024 /* 50 MB */ }),
      new ImageDimensionsValidator({
        maxHeight: 900, // in pixels
        maxWidth: 1600,
        // minHeight: 600,
        // minWidth: 768,
      }),
    ],
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errors.length) {
    console.log(errors);
    return <div>Error...</div>;
  }

  return (
    <div>
      <button onClick={() => openFilePicker()}>Select files </button>
      <br />
      {filesContent.map((file, index) => (
        <div key={index}>
          <h2>{file.name}</h2>
          <img alt={file.name} src={file.content}></img>
          <br />
        </div>
      ))}
    </div>
  );
}

// export default function ImageSelect(props) {
//
//   const [show, setShow] = useState(false);
//
//   return(
//     <Modal title={props.title ?? "Upload Image"} show={show} setShow={setShow}>
//
//     </Modal>
//   );
// }
