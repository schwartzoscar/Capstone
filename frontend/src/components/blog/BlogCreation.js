import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useForm, FormProvider } from "react-hook-form";
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import { SubmitButton, TextField, RichTextField } from "../elements/FormField";
import Button from "../elements/Button";

export default function BlogCreation({ onClose }) {
  const navigate = useNavigate();
  const form = useForm();
  const [images, setImages] = useState([]);
  const [cancelLoading, setCancelLoading] = useState(false);

  const handleFormSubmit = async(data) => {
    data.images = images;
    const resp = await apiClient.post('/posts/create', data);
    handleResp(resp, () => {
      onClose();
      toast.success('Post created!');
    });
  };

  const cancelPost = async() => {
    setCancelLoading(true);
    const resp = await apiClient.post('/posts/deleteImages', { images });
    setCancelLoading(false);
    handleResp(resp, () => {
      onClose();
    });
  }

  return (
    <div className="blog-creation-modal">
      <div className="modal-content" style={{ width: '80%', height: '50%',  margin: 'auto' }}>
        <div className="modal-header">
          <h3>Create a New Blog Post</h3>
        </div>
        <div className="modal-body">
          <FormProvider {...form}>
            <TextField name="title" label="Title" validation={{ required: "Title is required." }}/>
            <RichTextField name="body" label="Body" setImages={setImages}/>
            <div className="d-flex justify-content-end gc-8 pt-8">
              <Button className="btn-secondary" onClick={cancelPost} loading={cancelLoading}>Cancel</Button>
              <SubmitButton onClick={handleFormSubmit} className="btn-primary mt-0" disabled={cancelLoading}/>
            </div>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
