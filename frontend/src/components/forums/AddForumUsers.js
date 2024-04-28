import { useMemo } from 'react';
import { useFormContext } from "react-hook-form";
import { SelectField } from "../elements/FormField";
import AddForumUser from "./AddForumUser";

export default function AddForumUsers() {

  const { watch } = useFormContext();
  const selected = watch('users');

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
        {addedUsers}
      </div>
    </div>
  );
}
