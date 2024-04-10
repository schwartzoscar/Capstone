import { useState, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useAuthContext } from "../../../contexts/AuthContext";
import { useProfileContext } from "../Profile";
import { apiClient } from "../../../helpers/requestHelpers";
import { handleResp } from "../../../helpers/responseHelpers";
import { SubmitButton, TextField } from "../../elements/FormField";
import Button from "../../elements/Button";

export default function AccountInfo() {

  const { currentUser } = useAuthContext();
  const { isMe, visitedUser } = useProfileContext();
  const [editing, setEditing] = useState(false);

  const actions = useMemo(() => {
    if(!isMe || editing) return null;
    return <Button onClick={() => setEditing(true)} className="btn-primary">Edit</Button>;
  }, [isMe, editing]);

  return(
    <div>
      <p className="tab-content-header">Account Info</p>
      {editing ? <Editable setEditing={setEditing}/> : <Static profile={isMe ? currentUser : visitedUser}/>}
      {actions}
    </div>
  );
}

function Editable({ setEditing }) {

  const { currentUser, refreshUser } = useAuthContext();
  const form = useForm({
    defaultValues: {
      username: currentUser.username
    }
  });

  const updateProfile = async(data) => {
    const resp = await apiClient.post('/profile/update', data);
    handleResp(resp, () => {
      setEditing(false);
      refreshUser();
    });
  }

  return(
    <FormProvider {...form}>
      <TextField name="username" label="Username"/>
      <div>
        <Button onClick={() => setEditing(false)} className="btn-secondary">Cancel</Button>
        <SubmitButton onClick={updateProfile} className="btn-primary">Save</SubmitButton>
      </div>
    </FormProvider>
  );
}

function Static({ profile }) {
  return(
    <div>
      <p>Username</p>
      <p>{profile.username}</p>
    </div>
  );
}
