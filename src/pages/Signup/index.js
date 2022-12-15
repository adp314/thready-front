import { useState } from "react";
import style from "./style.module.css";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import tlogo from "../../images/tlogo.png";

export function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    email: "",
    passwordHash: "",
    confirmPassword: "",
  });
  
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }


  async function handleSubmit(e) {
    e.preventDefault();

    try {

      await api.post("/user/signup", { ...form });


      navigate("/login");
    } catch (error) {
      console.log(error);
    }


  }

  return (
    <div className={style.signupContainer}>
    <img className={style.signupTLogo} src={tlogo} alt="t logo"/>
    <h2 className={style.signupTitle}>Fill in your informations.</h2>

      <form className={style.signupForm} onSubmit={handleSubmit}>


      <div className={style.signupInfosDiv}>
        <label className={style.signupLabels} htmlFor="formName">Username</label>
        <input
          className={style.signupInputs}
          id="formName"
          name="userName"
          type="text"
          value={form.userName}
          onChange={handleChange}
        />

        <label className={style.signupLabels} htmlFor="formEmail">Email</label>
        <input
          className={style.signupInputs}
          id="formEmail"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />

        <label className={style.signupLabels} htmlFor="formPassword">Choose password</label>
        <input
          className={style.signupInputs}
          id="formPassword"
          name="passwordHash"
          type="password"

          pattern="/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm"
          title="A01!"
          value={form.passwordHash}
          onChange={handleChange}
        />

        <label className={style.signupLabels} htmlFor="formConfirmPassword">Confirm password</label>
        <input
          className={style.signupInputs}
          id="formConfirmPassword"
          type="password"
          name="confirmPassword"
          pattern="/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm"
          title="A01!"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <button className={style.signupButton} type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
