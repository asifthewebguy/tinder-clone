import { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { Navigate } from "react-router-dom";

const Onboarding = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: "",
        dob_day: "",
        dob_month: "",
        dob_year: "",
        show_gender: false,
        gender_identity: "man",
        gender_interest: "woman",
        url: "",
        about: "",
        matches: [],
    });

    const handleSubmit = async (e) => {
        console.log("Onboarding submitted");
        e.preventDefault();
        try{
            const response = await axios.put('http://localhost:8000/user', formData);
            const success = response.status === 200;
            if(success) navigate("/dashboard");
        }
        catch(err){
            console.log(err);
        }
    };

    const handleChange = (e) => {
        const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
        const name = e.target.name;

        setFormData((prevState) => ({
        ...prevState,
        [name]: value,
        }));
    };

    console.log("formData", formData);

    return (
        <>
        <Nav minimal={true} setShowModal={() => {}} showModal={false}></Nav>
        <div className="onboarding">
            <h2>CREATE ACCOUNT</h2>

            <form onSubmit={handleSubmit}>
            <section>
                <label htmlFor="first_name">First Name</label>
                <input
                type="text"
                id="first_name"
                name="first_name"
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
                    value={formData.dob_day}
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
                    value="man"
                    checked={formData.gender_identity === "man"}
                    onChange={handleChange}
                />
                <label htmlFor="man_gender_identity">Man</label>
                <input
                    type="radio"
                    name="gender_identity"
                    id="woman_gender_identity"
                    required={true}
                    value="woman"
                    checked={formData.gender_identity === "woman"}
                    onChange={handleChange}
                />
                <label htmlFor="woman_gender_identity">Woman</label>
                <input
                    type="radio"
                    name="gender_identity"
                    id="more_gender_identity"
                    required={true}
                    value="more"
                    checked={formData.gender_identity === "more"}
                    onChange={handleChange}
                />
                <label htmlFor="more_gender_identity">More</label>
                </div>
                <label htmlFor="show-gender">Show Gender on my Profile</label>
                <input
                type="checkbox"
                name="show_gender"
                id="show_gender"
                required={true}
                onChange={handleChange}
                />
                <label htmlFor="">Show Me</label>
                <div className="multiple">
                <input
                    type="radio"
                    name="gender_interest"
                    id="man_gender_interest"
                    required={true}
                    value="man"
                    checked={formData.gender_interest === "man"}
                    onChange={handleChange}
                />
                <label htmlFor="man_gender_interest">Man</label>
                <input
                    type="radio"
                    name="gender_interest"
                    id="woman_gender_interest"
                    required={true}
                    value="woman"
                    checked={formData.gender_interest === "woman"}
                    onChange={handleChange}
                />
                <label htmlFor="woman_gender_interest">Woman</label>
                <input
                    type="radio"
                    name="gender_interest"
                    id="everyone_gender_interest"
                    required={true}
                    value="more"
                    checked={formData.gender_interest === "everyone"}
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
                value={formData.about}
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
                value={formData.url}
                onChange={handleChange}
                />
                <div className="photoContainer">
                {formData.url && (
                    <img src={formData.url} alt={formData.first_name}></img>
                )}
                </div>
            </section>
            </form>
        </div>
        </>
    );
};

export default Onboarding;
