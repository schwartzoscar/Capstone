import { useFormContext } from "react-hook-form";
import PasswordStrengthBar from "react-password-strength-bar";

export default function PasswordStrength(props) {

  const { watch } = useFormContext();
  const password = watch(props.name ?? 'password');

  return(
    <div className="password-strength-bar">
      <PasswordStrengthBar password={password}/>
    </div>
  );
}
