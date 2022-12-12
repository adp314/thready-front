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
<<<<<<< HEAD
    name: "",
    email: "",
    password: "",
=======
    userName: "",
    email: "",
    passwordHash: "",
>>>>>>> 8ee0e4f6c1eed317853590078bb6db04e81cc935
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
<<<<<<< HEAD
      const imgURL = await handleUpload();
      await api.post("/user/signup", { ...form, img: imgURL });
=======
      if(form.confirmPassword !== form.passwordHash){
        alert('passwords não são iguais');
        return
      }
      // delete the 'confirm password' before req ???
      await api.post("/user/signup", form );
>>>>>>> 8ee0e4f6c1eed317853590078bb6db04e81cc935

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
<<<<<<< HEAD


=======
>>>>>>> 8ee0e4f6c1eed317853590078bb6db04e81cc935
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
<<<<<<< HEAD
          name="name"
          type="text"
          value={form.name}
=======
          name="userName"
          type="text"
          value={form.userName}
>>>>>>> 8ee0e4f6c1eed317853590078bb6db04e81cc935
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
<<<<<<< HEAD
          name="password"
          type="password"
          value={form.password}
=======
          name="passwordHash"
          type="password"
          value={form.passwordHash}
>>>>>>> 8ee0e4f6c1eed317853590078bb6db04e81cc935
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

<<<<<<< HEAD
        <div className={style.signupImgDiv}>
=======
        {/* <div className={style.signupImgDiv}>
>>>>>>> 8ee0e4f6c1eed317853590078bb6db04e81cc935
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
<<<<<<< HEAD
        </div>
=======
        </div> */}
>>>>>>> 8ee0e4f6c1eed317853590078bb6db04e81cc935
      </form>
    </div>
  );
}
