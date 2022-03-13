import { useState } from "react";
import Nav from "../componts/Nav";

const Onboarding = () => {
  // const [showModal, setShowModal] = useState(false);
  const handleSubmit = () => {
    console.log("submit");
  };
  const handleChange = () => {
    console.log("handleChange");
  };
  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false}></Nav>
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>

        <form action="#" className="onboarding">
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              placeholder="First Name"
              required={true}
              value={""}
              onChange={handleChange}
            />
            {/* <label htmlFor="last_name">Last Name</label>
          <input type="text" id="last_name" placeholder="Last Name" /> */}

            <label>Birthday</label>
            <div className="multiple">
              <input
                type="number"
                id="birth_day"
                placeholder="DD"
                required={true}
                value={""}
                onChange={handleChange}
              />
              <input
                type="number"
                id="birth_month"
                placeholder="MM"
                required={true}
                value={""}
                onChange={handleChange}
              />
              <input
                type="number"
                id="birth_year"
                placeholder="YYYY"
                required={true}
                value={""}
                onChange={handleChange}
              />
            </div>
            <div className="multiple">
              <input
                type="radio"
                name="gender_identity"
                id="man_gender_identity"
                required={true}
                value={""}
                onChange={handleChange}
              />
              <label htmlFor="man_gender_identity">Man</label>
              <input
                type="radio"
                name="gender_identity"
                id="woman_gender_identity"
                required={true}
                value={""}
                onChange={handleChange}
              />
              <label htmlFor="woman_gender_identity">Woman</label>
              <input
                type="radio"
                name="gender_identity"
                id="more_gender_identity"
                required={true}
                value={""}
                onChange={handleChange}
              />
              <label htmlFor="more_gender_identity">More</label>
            </div>
            <label htmlFor="show-gender">Show Gender on my Profile</label>
            <input
              type="checkbox"
              name="show-gender"
              id="show-gender"
              required={true}
            />
            <label htmlFor="">Show Me</label>
            <div className="multiple">
              <input
                type="radio"
                name="gender_interest"
                id="man_gender_interest"
                required={true}
                value={""}
                onChange={handleChange}
              />
              <label htmlFor="man_gender_interest">Man</label>
              <input
                type="radio"
                name="gender_interest"
                id="woman_gender_interest"
                required={true}
                value={""}
                onChange={handleChange}
              />
              <label htmlFor="woman_gender_interest">Woman</label>
              <input
                type="radio"
                name="gender_interest"
                id="everyone_gender_interest"
                required={true}
                value={""}
                onChange={handleChange}
              />
              <label htmlFor="everyone_gender_interest">Everyone</label>
            </div>
            <label htmlFor="about">About Me</label>
            <input
              type="text"
              id="about"
              name="about"
              required={true}
              placeholder="I like long walks..."
              value={""}
              onChange={handleChange}
            />
            <input type="submit" />
          </section>
          <section>
            <label htmlFor="photo">Profile</label>
            <input
              type="url"
              name="url"
              id="url"
              required={true}
              value={""}
              onChange={handleChange}
            />
          </section>
        </form>
      </div>
    </>
  );
};

export default Onboarding;
