import icon from "../images/icon.svg";
import { useState } from "react";
const AuthModal = ({ setShowModal, isSignUp }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  console.log(email, password, confirmPassword, error);

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (isSignUp && password !== confirmPassword) {
        setError("Passwords do not match");
      }
      console.log("make a pros request to database");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-modal-container">
      <div className="auth-modal">
        <div className="close" onClick={handleClick}>
          ✖
        </div>
        <img src={icon} alt="Tinder" />
        <h3>Get Started</h3>
        <h2>{isSignUp ? "Create Account" : "Log In"}</h2>
        <p>
          By clicking Log in, you agree to our Terms. Learn how we process your
          data in our Privacy Policy and Cookie Policy.
        </p>
        <form conSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isSignUp && (
            <input
              type="password"
              id="password-check"
              name="password-check"
              placeholder="Confirm Password"
              required={true}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input className="secondary-button" type="submit" value="Submit" />
          <p>{error}</p>
        </form>
      </div>
    </div>
  );
};
export default AuthModal;
