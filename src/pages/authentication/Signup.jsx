import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input, Loading, OverlayContainer, PasswordInput } from "../../components";
import { useAuth } from "../../context";
import { validFormChecker } from "./utils";
import "./authentication.css";

const Signup = () => {
  const {
    authState: { loading, error },
    signup,
  } = useAuth();
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreement: "not agree",
  });

  const changeHandler = e => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  useEffect(() => {
    setFormErrors(() => validFormChecker(userInput));
  }, [userInput, submitted]);

  const formSubmitHandler = e => {
    e.preventDefault();

    const { name: firstName, lastName, email, password } = userInput;

    setSubmitted(true);
    if (!(Object.values(formErrors).length > 0)) {
      signup({ firstName, lastName, email, password });
      setFormErrors({});
    }
  };

  return (
    <div className="form-container flex-total-center">
      <form className="form-grp">
        <h2 className="text-center text-lg">Signup</h2>

        <OverlayContainer display={loading}>
          <Loading />
        </OverlayContainer>
        {error && <p className="text-danger text-center">{error}</p>}
        <Input
          type="text"
          defaultValue={userInput.name}
          name="name"
          label="Name"
          helperText={formErrors.name}
          showError={submitted}
          required={true}
          changeHandler={changeHandler}
        />
        <Input
          type="text"
          defaultValue={userInput.lastName}
          name="lastName"
          label="Lastname"
          helperText={formErrors.lastName}
          showError={submitted}
          required={true}
          changeHandler={changeHandler}
        />
        <Input
          type="email"
          defaultValue={userInput.email}
          name="email"
          label="Email"
          helperText={formErrors.email}
          showError={submitted}
          required={true}
          changeHandler={changeHandler}
        />
        <PasswordInput
          defaultValue={userInput.password}
          name="password"
          label="Password"
          helperText={formErrors.password}
          showError={userInput.password.length > 2 || submitted}
          required={true}
          changeHandler={changeHandler}
        />
        <Input
          type="password"
          defaultValue={userInput.confirmPassword}
          name="confirmPassword"
          label="Confirm Password"
          helperText={formErrors.confirmPassword}
          showError={userInput.confirmPassword.length > 2 || submitted}
          required={true}
          changeHandler={changeHandler}
        />

        <div className="options">
          <label htmlFor="agreement">
            <input
              type="checkbox"
              name="agreement"
              onChange={changeHandler}
              value={userInput.agreement === "agree" ? "not agree" : "agree"}
              checked={userInput.agreement === "agree"}
              id="agreement"
            />
            I agree to all Terms & Conditions
          </label>

          {submitted && (
            <p className="text-danger text-xs text-center option-helper-txt">
              {formErrors.agreement}
            </p>
          )}
        </div>

        <button className="btn btn-primary btn-submit" onClick={e => formSubmitHandler(e)}>
          Create new account
        </button>

        <div className="redirect-link text-center">
          <Link className="link-btn" to="/signin">
            Already have an account<i className="fas fa-chevron-right"></i>
          </Link>
        </div>
      </form>
    </div>
  );
};

export { Signup };
