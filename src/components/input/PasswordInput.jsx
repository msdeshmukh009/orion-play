import { useState } from "react";

const PasswordInput = ({
  placeholder,
  label,
  required,
  defaultValue,
  showError,
  helperText,
  disabled,
  changeHandler,
  name,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = e => {
    e.preventDefault();
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className="input-grp">
      <label className={required ? "form-label form-label-required" : "form-label "}>{label}</label>
      <input
        className="form-field"
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={defaultValue}
        required={required}
        disabled={disabled}
        onChange={changeHandler}
        name={name}
      />
      <button onClick={togglePassword} className="password-toggle-button btn btn-outline">
        {showPassword ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
      </button>

      <div className="txt-message text-danger">{showError && helperText}</div>
    </div>
  );
};

export { PasswordInput };
