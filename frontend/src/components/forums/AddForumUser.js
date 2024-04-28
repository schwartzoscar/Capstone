import { useMemo } from 'react';
import { useFormContext } from "react-hook-form";
import Select from "../elements/Select";

export default function AddForumUser(props) {

  const { setValue } = useFormContext();

  const roleOptions = [
    {label: 'Moderator', value: 'moderator'},
    {label: 'Member', value: 'member'}
  ];

  const defaultValue = useMemo(() => {
    let defaultOption = null;
    roleOptions.forEach(option => {
      if(option.value === props.role) defaultOption = option;
    });
    return defaultOption;
  }, [roleOptions, props.role]);

  const setRole = option => {
    setValue(`users.${props.id}`, option.value);
  }

  return(
    <div className="forum-added-user">
      <p>{props.username}</p>
      <Select defaultValue={defaultValue} options={roleOptions} onChange={setRole}/>
    </div>
  );
}
