import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useForm, FormProvider } from "react-hook-form";
import { useCurrentForumContext } from "../../contexts/CurrentForumContext";
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import {SubmitButton, TextField, RichTextField, SelectField} from "../elements/FormField";
import Button from "../elements/Button";
import Base from "../base/Base";

export default function BlogCreation() {

  const navigate = useNavigate();
  const { currentForum } = useCurrentForumContext();
  const form = useForm();
  const [images, setImages] = useState([]);
  const [cancelLoading, setCancelLoading] = useState(false);

  const handleFormSubmit = async(data) => {
    data.images = images;
    if(currentForum) data.forum = currentForum._id;
    const resp = await apiClient.post('/posts/create', data);
    handleResp(resp, () => {
      navigate(currentForum ? `/forum/${currentForum.name}` : '/');
      toast.success('Post created!');
    });
  };

  const cancelPost = async() => {
    setCancelLoading(true);
    const resp = await apiClient.post('/posts/deleteImages', { images });
    setCancelLoading(false);
    handleResp(resp, () => {
      navigate(currentForum ? `/forum/${currentForum.name}` : '/');
    });
  }

  const onForumSelect = (forumOption, formOnChange) => {
    formOnChange(forumOption.value);
  }

  return (
    <Base>
      <div className="max-w-xl mx-auto">
        <div className="page-section">
          <FormProvider {...form}>
            <TextField name="title" label="Title" validation={{ required: "Title is required." }}/>
            <RichTextField name="content" label="Body" setImages={setImages}/>
            {!currentForum && (
              <SelectField name="forum" label="Forum" optionsUrl="/posts/forumOptions" onChangeOverride={onForumSelect}/>
            )}
            <div className="d-flex justify-content-end g-8 mt-20">
              <Button className="btn-secondary" onClick={cancelPost} loading={cancelLoading}>Cancel</Button>
              <SubmitButton onClick={handleFormSubmit} className="btn-primary mt-0" disabled={cancelLoading}/>
            </div>
          </FormProvider>
        </div>
      </div>
    </Base>
  );
}
