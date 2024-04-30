import { useMemo } from 'react';
import { useFormContext } from "react-hook-form";
import { useAuthContext } from "../../contexts/AuthContext";
import { SelectField } from "../elements/FormField";
import AddForumUser from "./AddForumUser";
import Select from "../elements/Select";

export default function AddForumUsers() {

  const { currentUser } = useAuthContext();
  const { watch } = useFormContext();
  const selected = watch('users');

  const creatorOption = {label: 'Creator', value: 'creator'};

  const onSelect = (users, formOnChange) => {
    let newUsers = {};
    users.forEach(user => {
      newUsers[user.value] = selected[user.value] ?? {username: user.label, role: 'member'};
    });
    formOnChange(newUsers);
  }

  const addedUsers = useMemo(() => Object.entries(selected).map(([id, user]) => (
    <AddForumUser key={id} id={id} username={user.username} role={user.role}/>
  )), [selected]);

  return(
    <div>
      <SelectField name="users" label="Users" optionsUrl="/forums/userOptions" isMulti onChangeOverride={onSelect}/>
      <div className="forum-add-users">
        <div className="forum-added-user">
          <p>{currentUser.username}</p>
          <Select defaultValue={creatorOption} options={[creatorOption]} isDisabled/>
        </div>
        {addedUsers}
      </div>
    </div>
  );
}
