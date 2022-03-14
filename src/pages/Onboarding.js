import { useState } from "react";
import Nav from "../componts/Nav";

const Onboarding = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    user_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    gender_identity: "man",
    gender_interest: "woman",
    email: "",
    url: "",
    about: "",
    matches: [],
  });
  const handleSubmit = () => {
    console.log("submit");
  };
  const handleChange = (e) => {
    console.log("e", e);
    const value = e.target.value;
    const name = e.target.name;
    console.log("value" + value, "name" + name);

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
              value={formData.first_name}
              onChange={handleChange}
            />

            <label>Birthday</label>
            <div className="multiple">
              <input
                type="number"
                id="birth_day"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.birth_day}
                onChange={handleChange}
              />
              <input
                type="number"
                id="birth_month"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input
                type="number"
                id="birth_year"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
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
            <input type="submit" onClick={handleSubmit} />
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
