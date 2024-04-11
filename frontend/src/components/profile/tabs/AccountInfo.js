import { useState, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useAuthContext } from "../../../contexts/AuthContext";
import { useProfileContext } from "../Profile";
import { apiClient } from "../../../helpers/requestHelpers";
import { handleResp } from "../../../helpers/responseHelpers";
import { SubmitButton, TextField } from "../../elements/FormField";
import Button from "../../elements/Button";
import PasswordStrength from "../../elements/PasswordStrength";

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
    mode: "onChange",
    defaultValues: {
      username: currentUser.username,
      email: currentUser.email
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
      <div id="account-info-form">
        <TextField name="username" label="Username" validation={{ required: "Username is required." }}/>
        <TextField name="email" label="Email" validation={{ required: "Email is required." }}/>
        <div className="d-flex gc-8 flex-wrap">
          <div className="flex-grow-1">
            <TextField name="password" label="Password" type="password"/>
            <PasswordStrength/>
          </div>
          <TextField name="confirmPassword" label="Confirm Password" type="password" className="flex-grow-1"/>
        </div>
        <div className="d-flex g-8">
          <Button onClick={() => setEditing(false)} className="btn-secondary">Cancel</Button>
          <SubmitButton onClick={updateProfile} className="btn-primary mt-0">Save</SubmitButton>
        </div>
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
