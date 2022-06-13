import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Input, Loading, OverlayContainer } from "../../components";
import { PasswordInput } from "../../components/input/PasswordInput";
import { useAuth } from "../../hooks";
import { validLoginFormChecker } from "./utils";
import "./authentication.css";

const Signin = () => {
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const guestUser = { email: "jojo@gmail.com", password: "Jojo@123" };

  const {
    authState: { loading, error },
    login,
  } = useAuth();

  let location = useLocation();
  const from = location.state?.from.pathname || "/";

  const changeHandler = e => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const formSubmitHandler = e => {
    e.preventDefault();
    setSubmitted(true);

    if (!(Object.values(formErrors).length > 0)) {
      login(userInput, from);
      setFormErrors({});
    }
  };

  const loginWithGuest = e => {
    e.preventDefault();
    setSubmitted(true);
    setUserInput(guestUser);
    login(guestUser, from);
  };

  useEffect(() => {
    setFormErrors(() => validLoginFormChecker(userInput));
  }, [userInput, submitted]);

  return (
    <div className="form-container flex-total-center">
      <form className="form-grp">
        <h2 className="text-center text-lg">Signin</h2>
        <OverlayContainer display={loading}>
          <Loading />
        </OverlayContainer>

        {error && <p className="text-danger text-center">{error}</p>}

        <Input
          type="Email"
          required={true}
          label="Email"
          name="email"
          defaultValue={userInput.email}
          changeHandler={changeHandler}
          showError={submitted}
          helperText={formErrors.email}
        />

        <PasswordInput
          required={true}
          label="Password"
          name="password"
          defaultValue={userInput.password}
          changeHandler={changeHandler}
          showError={submitted}
          helperText={formErrors.password}
        />

        <div className="options">
          <input type="checkbox" name="remember me" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>

          <a className="link-btn" href="/">
            Forgot your password?
          </a>
        </div>

        <button className="btn btn-primary btn-submit" onClick={e => formSubmitHandler(e)}>
          Login
        </button>
        <button className="btn btn-outline btn-submit" onClick={e => loginWithGuest(e)}>
          Login with test credentials
        </button>

        <div className="redirect-link text-center">
          <Link className="link-btn" to="/signup">
            Create new account<i className="fas fa-chevron-right"></i>
          </Link>
        </div>
      </form>
    </div>
  );
};

export { Signin };
