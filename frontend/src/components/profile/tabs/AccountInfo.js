import { useState, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useAuthContext } from "../../../contexts/AuthContext";
import { useProfileContext } from "../Profile";
import { apiClient } from "../../../helpers/requestHelpers";
import { handleResp } from "../../../helpers/responseHelpers";
import { handleFormErrors, setFormError } from "../../../helpers/formHelpers";
import { SubmitButton, TextField } from "../../elements/FormField";
import Button from "../../elements/Button";
import PasswordStrength from "../../elements/PasswordStrength";
import InfoBlock from "../../elements/InfoBlock";
import { PASSWORD_TOOLTIP } from "../../elements/Tooltip";

export default function AccountInfo() {

  const { currentUser } = useAuthContext();
  const { isMe, visitedUser } = useProfileContext();
  const [editing, setEditing] = useState(false);

  const actions = useMemo(() => {
    if(!isMe || editing) return null;
    return <Button onClick={() => setEditing(true)} className="btn-primary mt-12">Edit</Button>;
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
  const [passValid, setPassValid] = useState(false);
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      username: currentUser.username,
      email: currentUser.email
    }
  });

  const updateProfile = async(data) => {
    if(!passValid) {
      setFormError('password', 'Password does not meet complexity requirements.', form);
      return;
    }
    const resp = await apiClient.post('/profile/updateAccountInfo', data);
    handleResp(resp, () => {
      setEditing(false);
      refreshUser();
    }, errors => handleFormErrors(errors, form));
  }

  return(
    <FormProvider {...form}>
      <div id="account-info-form">
        <TextField name="username" label="Username" validation={{ required: "Username is required." }}/>
        <TextField name="email" label="Email" validation={{ required: "Email is required." }}/>
        <div className="password-fields">
          <div>
            <TextField name="password" label="Password" type="password" tooltip={PASSWORD_TOOLTIP}/>
            <PasswordStrength name="password" setPassValid={setPassValid}/>
          </div>
          <TextField name="confirm" label="Confirm Password" type="password"/>
        </div>
        <div className="d-flex g-8">
          <Button onClick={() => setEditing(false)} className="btn-secondary">Cancel</Button>
          <SubmitButton onClick={updateProfile} className="btn-primary mt-0" disableOnInvalid>Save</SubmitButton>
        </div>
      </div>
    </FormProvider>
  );
}

function Static({ profile }) {
  return(
    <div>
      <InfoBlock title="Username">{profile.username}</InfoBlock>
      <InfoBlock title="Email">{profile.email}</InfoBlock>
    </div>
  );
}
