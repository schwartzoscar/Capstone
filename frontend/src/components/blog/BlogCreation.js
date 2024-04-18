import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useForm, FormProvider } from "react-hook-form";
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import { SubmitButton, TextField } from "../elements/FormField";

export default function BlogCreation() {

  const navigate = useNavigate();
  const form = useForm();

  // Function to handle form submission
  const handleFormSubmit = async(data) => {
    // Make an API call to your server to create a new blog post
    const resp = await apiClient.post('/blogs', data);
    // Handle the response as needed (e.g., show a success message, redirect the user)
    handleResp(resp, () => {
      navigate('/');
      toast.success('Post created!');
    });
  };

  return (
    <div className="page-container" id="blog-creation-page">
      <div className="d-flex g-20 mt-20 flex-grow-1">
        <div className="page-section">
          <h3>Create a New Blog Post</h3>
          <FormProvider {...form}>
            <TextField name="title" label="Title" validation={{ required: "Title is required." }}/>
            <TextField name="content" type="textarea" label="Content" rows={5}/>
            <SubmitButton onClick={handleFormSubmit} className="btn-primary"/>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
