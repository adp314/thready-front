import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../api/api";
import style from "./style.module.css";
import settingsImg from "../../images/settings.png"

export function Settings() {

  const [user, setUser] = useState({ 
    userName: "",
    email: "",
    profileImg: "",
    password: "",
    });

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [img, setImg] = useState("");

  function isLogged(){
    const loggedInUserJSONContent = localStorage.getItem("loggedInUser");
    const parseLoggedInUserContent = JSON.parse(loggedInUserJSONContent || '""');
 
    if (parseLoggedInUserContent.token){
        setIsLoggedIn(true)
    }
    else{
        setIsLoggedIn(false)
    }
   }


  useEffect(() => {

    async function fetchUser() {

        try{
        const response = await api.get("/user/profile");
        setUser(response.data);
        }
        catch(error){
            console.log(error);
        }
    }

    fetchUser();
    isLogged();
  }, []);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
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
      const infosToSendForAPI = { ...user};
      const imgURL = await handleUpload();

      await api.put("/user/edit", infosToSendForAPI, {profileImg: imgURL});

      navigate("/settings");
    
    } catch (error) {
      console.log(error);
    }
  }


  function handleImage(e) {
    console.log(e.target.files);
        setImg(URL.createObjectURL(e.target.files[0]));
  }

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/settings");
    window.location.reload(false);
  }

  return (
    <>
      {isLoggedIn ? <div className={style.settingsContainer}>

            <div className={style.settingsHeaderContainer}>
                <h2><img src={settingsImg} alt="settings_picto"/> Settings Page</h2>
            </div>

            <img className={style.profileImg} src={user.profileImg} alt="profile_pîcture"/>
            <h3>{user.userName}</h3>

            <div className={style.settingsFormContainer}>
            <form className={style.settingsForm}  onSubmit={handleSubmit}>
       <img className={style.fileImg} src={img} alt="uploding_new_picture"/>
       <input
     className={style.signupImgInput}
     type="file" 
     id="formImg" 
     onChange={handleImage} />
            <label className={style.settingsFromLabels}>Username</label>
            <input
                required
                className={style.settingsFormInputs}
                type="text"
                name="userName"
                value={user.userName}
                onChange={handleChange}
            />
            <label className={style.settingsFromLabels}>Mail</label>
            <input
                required
                className={style.settingsFormInputs}
                type="text"
                name="mail"
                value={user.email}
                onChange={handleChange}
            />
             <label className={style.settingsFromLabels}>New Password</label>
            <input
                required
                className={style.settingsFormInputs}
                type="text"
                name="password"
                value=""
                placeholder="password"
                onChange={handleChange}
            />
            <button className={style.settingsFormButton}>Submit</button>
            </form>

            <button onClick={handleLogOut}>Logout</button>
            <p>logged !</p>
            </div>
        </div>
      : <div>
        <h1>not logged !</h1>
        <Link to="/login">click here for loggin</Link>
      </div>
    
    }
    </>
  );
}
