import { Link } from "react-router-dom";
import { Input } from "../../components";
import "./authentication.css";
import { PasswordInput } from "../../components/input/PasswordInput";

const Signin = () => {
  return (
    <div className="form-container flex-total-center">
      <form className="form-grp">
        <h2 className="text-center text-lg">Signin</h2>

        <Input type="Email" required={true} label="Email" name="email" />

        <PasswordInput required={true} label="Password" name="password" />

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
