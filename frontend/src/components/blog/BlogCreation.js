import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useForm, FormProvider } from "react-hook-form";
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import { SubmitButton, TextField, RichTextField } from "../elements/FormField";
import Button from "../elements/Button";

export default function BlogCreation() {

  const navigate = useNavigate();
  const form = useForm();
  const [images, setImages] = useState([]);
  const [cancelLoading, setCancelLoading] = useState(false);

  // Function to handle form submission
  const handleFormSubmit = async(data) => {
    data.images = images;
    // Make an API call to your server to create a new blog post
    const resp = await apiClient.post('/posts/create', data);
    // Handle the response as needed (e.g., show a success message, redirect the user)
    handleResp(resp, () => {
      navigate('/');
      toast.success('Post created!');
    });
  };

  const cancelPost = async() => {
    setCancelLoading(true);
    const resp = await apiClient.post('/posts/deleteImages', { images });
    setCancelLoading(false);
    handleResp(resp, () => {
      navigate('/');
    });
  }

  return (
    <div className="page-container" id="blog-creation-page">
      <div className="d-flex g-20 mt-20 justify-content-center">
        <div className="page-section">
          <h3>Create a New Blog Post</h3>
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
