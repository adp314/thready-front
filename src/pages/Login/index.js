import style from "./style.module.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import tlogo from "../../images/tlogo.png";

export function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { setLoggedInUser } = useContext(AuthContext);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSumit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/user/login", form);
      setLoggedInUser({ ...response.data });

      localStorage.setItem("loggedInUser", JSON.stringify(response.data));

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
  <div className={style.loginContainer}>
    <img className={style.loginTLogo} src={tlogo} alt="t logo"/>
    <h2 className={style.loginTitle}>Connect to your Thready account.</h2>
      <form className={style.loginForm} onSubmit={handleSumit}>
        <input className={style.loginInputs}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input className={style.loginInputs}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button className={style.loginButton} type="submit">Login</button>
      </form>

      <p className={style.loginSignUpText}>No Thready account ? <Link className={style.loginSignUpLink} to="/signup">Sign-up here.</Link></p>
  </div>
  );
};