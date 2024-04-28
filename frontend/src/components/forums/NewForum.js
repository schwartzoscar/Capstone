import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import { handleFormErrors } from "../../helpers/formHelpers";
import Base from "../base/Base";
import { RichTextField, SubmitButton, SwitchField, TextField } from "../elements/FormField";
import Button from "../elements/Button";
import ForumImageSection from "./ForumImageSection";
import AddForumUsers from "./AddForumUsers";

export default function NewForum() {

  const form = useForm({defaultValues: {
    profileImg: '/images/Defaultforumprofile.jpg',
    bannerImg: 'https://t3.ftcdn.net/jpg/03/16/91/28/360_F_316912806_RCeHVmUx5LuBMi7MKYTY5arkE4I0DcpU.jpg',
    users: {},
    public: false
  }});
  const navigate = useNavigate();

  const createForm = async(data) => {
    const resp = await apiClient.post('/forums/create', data);
    handleResp(resp, respData => {
      navigate('/forum/' + respData.forum.name);
      toast.success('Forum created!');
    }, errors => handleFormErrors(errors, form));
  }

  return(
    <Base>
      <div className="max-w-xl mx-auto">
        <FormProvider {...form}>
          <ForumImageSection editable={true}>
            <TextField name="name" label="Forum Name" validation={{required: "Forum name is required."}}/>
            <RichTextField name="description" label="Description" allowImages={false}
                           placeholder="What is this forum about?"
            />
            <SwitchField name="public" label="Make this forum public?" className="pt-4"
                         tooltip="Public forms allow anyone to become a member and make posts."
            />
            <AddForumUsers/>
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
