import logoWhite from "../images/logo-white.svg";
import logoColor from "../images/logo-color.svg";
const Nav = ({ minimal, authToken, setShowModal, showModal, setIsSignUp }) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(false);
  };
  return (
    <nav>
      <div className={"logo-container"}>
        <div>
          <img
            className="logo"
            src={minimal ? logoColor : logoWhite}
            alt="Tinder"
          />
        </div>
      </div>
      {!authToken && !minimal && (
        <button
          className="nav-button"
          onClick={handleClick}
          disabled={showModal}
        >
          Log in
        </button>
      )}
    </nav>
  );
};
export default Nav;
