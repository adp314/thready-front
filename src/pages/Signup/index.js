import { useState } from "react";
import style from "./style.module.css";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import tlogo from "../../images/tlogo.png";
import uploadImg from "../../images/upload_img.png";
import defaultImg from "../../images/defaultImg.jpg"

export function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    email: "",
    passwordHash: "",
    confirmPassword: "",
  });

  const [img, setImg] = useState(defaultImg);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    console.log(e.target.files);
        setImg(URL.createObjectURL(e.target.files[0]));
  }

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);

      const response = await api.post("/upload-image", uploadData);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if(form.confirmPassword !== form.passwordHash){
        alert('passwords não são iguais');
        return
      }

      await api.post("/user/signup", form );

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
        <label className={style.signupLabels} htmlFor="formName">Name</label>
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
          value={form.passwordHash}
          onChange={handleChange}
        />

        <label className={style.signupLabels} htmlFor="formConfirmPassword">Confirm password</label>
        <input
          className={style.signupInputs}
          id="formConfirmPassword"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <button className={style.signupButton} type="submit">Submit</button>
        </div>

        {/* <div className={style.signupImgDiv}>
        <label className={style.signupImgLabel} htmlFor="formImg">
        <img className={style.uploadImg}src={uploadImg} alt="upload img"/>
        </label>
        <img className={style.fileImg} src={img} alt={img}/>
        <input
          className={style.signupImgInput}
          type="file" 
          id="formImg" 
          onChange={handleImage}
        />
        </div> */}
      </form>
    </div>
  );
}
