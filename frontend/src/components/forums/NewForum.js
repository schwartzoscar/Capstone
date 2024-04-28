import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import { handleFormErrors } from "../../helpers/formHelpers";
import Base from "../base/Base";
import { RichTextField, SubmitButton, TextField } from "../elements/FormField";
import Button from "../elements/Button";
import ForumImageSection from "./ForumImageSection";

export default function NewForum() {

  const form = useForm({defaultValues: {
    profileImg: '/images/Defaultforumprofile.jpg',
    bannerImg: 'https://t3.ftcdn.net/jpg/03/16/91/28/360_F_316912806_RCeHVmUx5LuBMi7MKYTY5arkE4I0DcpU.jpg'
  }});
  const navigate = useNavigate();

  const createForm = async(data) => {
    const resp = await apiClient.post('/forums/create', data);
    handleResp(resp, respData => {
      navigate('/forums/' + respData.forum.name);
      toast.success('Forum created!');
    }, errors => handleFormErrors(errors, form));
  }

  return(
    <Base>
      <div className="max-w-xl mx-auto">
        <FormProvider {...form}>
          <ForumImageSection editable={true}>
            <TextField name="name" label="Forum Name" validation={{required: "Forum name is required."}}/>
            <RichTextField name="description" label="Description" allowImages={false}/>
            <div className="d-flex justify-content-end g-8 mt-20">
              <Button onClick={() => navigate('/')} className="btn-secondary">Cancel</Button>
              <SubmitButton onClick={createForm} className="btn-primary mt-0">Create</SubmitButton>
            </div>
          </ForumImageSection>
        </FormProvider>
      </div>
    </Base>
  );
}
