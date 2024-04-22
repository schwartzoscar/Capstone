import React, { useState } from 'react';
import RBModal from 'react-bootstrap/Modal';
import { useForm, FormProvider } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import { SubmitButton, TextField, RichTextField } from "../elements/FormField";
import Button from "../elements/Button";

export default function CreatePostModal(props) {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const form = useForm();

  const handleFormSubmit = async(data) => {
    data.images = images;
    const resp = await apiClient.post('/posts/create', data);
    handleResp(resp, () => {
      props.onClose();
      toast.success('Post created!');
    });
  };

  const cancelPost = async() => {
    props.onClose();
  };

  return (
    <RBModal show={props.show} onHide={props.onClose} size="xl">
      <RBModal.Header closeButton>
        <RBModal.Title>Create a New Blog Post</RBModal.Title>
      </RBModal.Header>
      <RBModal.Body>
        <FormProvider {...form}>
          <TextField name="title" label="Title" validation={{ required: "Title is required." }}/>
          <RichTextField name="body" label="Body" setImages={setImages}/>
        </FormProvider>
      </RBModal.Body>
      <RBModal.Footer>
        <Button className="btn-secondary" onClick={cancelPost}>Cancel</Button>
        <SubmitButton onClick={handleFormSubmit} className="btn-primary" />
      </RBModal.Footer>
    </RBModal>
  );
}
