import { useFormContext } from "react-hook-form";
import { SelectField } from "../elements/FormField";

export default function AddForumUsers() {

  const { watch } = useFormContext();
  const selected = watch('users');

  return(
    <div>
      <SelectField name="users" label="Users" optionsUrl="/forums/userOptions" isMulti/>
    </div>
  );
}
