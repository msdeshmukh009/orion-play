import { Link } from "react-router-dom";
import { Input } from "../../components";
import "./authentication.css";
import { PasswordInput } from "../../components/input/PasswordInput";

const Signup = () => {
  return (
    <div className="form-container flex-total-center">
      <form className="form-grp">
        <h2 className="text-center text-lg">Signup</h2>
        <Input type="text" name="name" label="Name" />
        <Input type="text" name="lastName" label="Lastname" />
        <Input type="email" name="email" label="Email" />
        <PasswordInput name="password" label="Password" />
        <Input type="password" name="confirmPassword" label="Confirm Password" />

        <div className="options">
          <label htmlFor="agreement">
            <input type="checkbox" name="agreement" id="agreement" />I agree to all Terms &
            Conditions
          </label>
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
