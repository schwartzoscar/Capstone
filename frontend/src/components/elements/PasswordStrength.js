import { useFormContext } from "react-hook-form";
import { useDebounce } from "../../helpers/asyncHelpers";
import PasswordStrengthBar from "react-password-strength-bar";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export default function PasswordStrength(props) {

  const { name, setPassValid } = props;
  const { watch } = useFormContext();
  const password = watch(name ?? 'password');

  // Function to check if the password meets complexity rules
  const checkPasswordValid = () => {
    // Implementation of password complexity
    const valid = PASSWORD_REGEX.test(password);
    setPassValid(valid);
  };

  useDebounce(() => {
    checkPasswordValid();
  }, [password]);

  return(
    <div className="password-strength-bar">
      <PasswordStrengthBar password={password}/>
    </div>
  );
}
