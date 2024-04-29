import { useEffect, useState } from "react";
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuthContext } from "../../contexts/AuthContext";
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";
import { handleFormErrors } from "../../helpers/formHelpers";
import Base from "../base/Base";
import { RichTextField, SubmitButton, TextField } from "../elements/FormField";
import Button from "../elements/Button";
import { Editable as ForumImageSection } from "./ForumImageSection";
import AddForumUsers from "./AddForumUsers";

export default function EditForum() {

  const form = useForm({defaultValues: {
    profileImg: null,
    bannerImg: null,
    users: {}
  }});
  const navigate = useNavigate();
  const { forumName } = useParams();
  const { currentUser } = useAuthContext();
  const [forum, setForum] = useState(null);

  const getForum = async() => {
    const resp = await apiClient.post('/forums/get', {forumName: forumName.toLowerCase()});
    handleResp(resp, data => {
      setForum(data.forum);
    }, () => {
      toast.error("This forum does not exist.");
      navigate('/');
    });
  }

  useEffect(() => {
    getForum();
  }, [forumName]);

  useEffect(() => {
    if(forum) {
      form.setValue('name', forum.name);
      form.setValue('description', forum.description);
      form.setValue('profileImg', forum.profile_img);
      form.setValue('bannerImg', forum.banner_img);
      let users = {}
      for(const user of forum.users) {
        if(user.forum_role === 'creator' && user._id !== currentUser._id) {
          navigate(`/forum/${forum.name}`);
          toast.error('You do not have permission to edit this forum.');
          break;
        }
        if(user.forum_role !== 'creator') {
          users[user._id] = user.forum_role;
        }
      }
      form.setValue('users', users);
    }
  }, [forum, currentUser._id]);

  const updateForm = async(data) => {
    const resp = await apiClient.post('/forums/update', {forumId: forum._id, ...data});
    handleResp(resp, respData => {
      navigate('/forum/' + respData.forum.name);
      toast.success('Forum updated!');
    }, errors => handleFormErrors(errors, form));
  }

  // TODO loading wrapper
  if(!forum) return null;

  return(
    <Base>
      <div className="max-w-xl mx-auto">
        <FormProvider {...form}>
          <ForumImageSection editable={true}>
            <TextField name="name" label="Forum Name" disabled={true} validation={{
              required: "Forum name is required.",
              pattern: {value: /^\S+$/g, message: "Forum name cannot contain spaces."}
            }}/>
            <RichTextField name="description" label="Description" allowImages={false}
                           placeholder="What is this forum about?" initialValue={forum.description}
            />
            <AddForumUsers/>
            <div className="d-flex justify-content-end g-8 mt-20">
              <Button onClick={() => navigate(`/forum/${forum?.name}`)} className="btn-secondary">Cancel</Button>
              <SubmitButton onClick={updateForm} className="btn-primary mt-0">Update</SubmitButton>
            </div>
          </ForumImageSection>
        </FormProvider>
      </div>
    </Base>
  );
}
