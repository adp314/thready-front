import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../api/api";
import style from "./style.module.css";
import settingsImg from "../../images/settings.png"
import uploadImg from "../../images/uploadimg.png"
import logoutImg from "../../images/logout.png"

export function Settings() {

  const [user, setUser] = useState({ 
    userName: "",
    email: "",
    profileImg: "",
    passordHash: ""
    });

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [img, setImg] = useState("");
  const [displayUsername, setDisplayUsername] = useState()
  const [displayUploadFile, setDisplayUploadFile] = useState("No file selected")
  const [previewImg, setPreviewImg] = useState("")
  const [newPassword, setNewPassword] = useState("")

  console.log(newPassword)

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
        setDisplayUsername(response.data.userName)
        setPreviewImg(response.data.profileImg);
        }
        catch(error){
            console.log(error);
        }
    }

    fetchUser();
    isLogged();

  }, []);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
    setNewPassword(e.target.value)
  }


  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);

      if (img === ""){
        return
      }else {
      const response = await api.post("/upload-image", uploadData);
      
      return response.data.url;
    }} catch (error) {
      console.log(error);
    }
  }


async function handleSubmit(e) {
    e.preventDefault();

    try {
      const infosToSendForAPI = { ...user};
      const imgURL = await handleUpload();
      if (imgURL === ""){
        await api.put("/user/edit", {...infosToSendForAPI});
      }else {
      await api.put("/user/edit", {...infosToSendForAPI, profileImg: imgURL});
        }

      window.location.reload(false);
    
    } catch (error) {
      console.log(error);
    }
  }

  function handleImageName(e) {
    setDisplayUploadFile(e.target.files[0].name)
  }

  function handleImage(e) {
        setImg(e.target.files[0]);
        setPreviewImg(URL.createObjectURL(e.target.files[0]))
        handleImageName(e)
  }



  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/home");
    window.location.reload(false);
  }

  return (
    <>
      {isLoggedIn ? <div className={style.settingsAllContainer}>
                      <div className={style.settingsHeaderContainer}>
                        <div>
                          <img src={settingsImg} alt="settings_picto"/><h1>Settings</h1>
                        </div>
                        <img onClick={handleLogOut} className={style.settingsHeaderLogout} src={logoutImg} alt="logout_picto"/>
                      </div>
            <div className={style.settingsContainer}>
            <img className={style.profileImg} src={previewImg} alt="profile_pîcture_preview"/>
            <h2>{displayUsername}</h2>
            <hr/>
            <div className={style.settingsFormContainer}>

            <form className={style.settingsForm}  onSubmit={handleSubmit}>
           
              <input
                className={style.signupImgInput}
                type="file" 
                id="formImg"
                onChange={handleImage}
                accept=".jpg, .jpeg, .png"
                hidden/>
              <label htmlFor="formImg" className={style.settingsImgLabel}> <img src={uploadImg} alt="uploadimgpicto"/> </label>
              <span className={style.spanFile}>{displayUploadFile}</span>
            

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
            {/* <label className={style.settingsFromLabels}>New Password</label>
            <input
                required
                className={style.settingsFormInputs}
                type="password"
                name="newPassword"
                value={newPassword}
                placeholder="password"
                onChange={handleChange}
            /> */}
            <button className={style.settingsFormButton}>Submit</button>
            </form>
            </div>
            </div>
        </div>

      : <div className={style.settingsNoConnected}>
      <Link className={style.settingsNoConnectedText} to="/login">Not connected, click here for login !</Link>
      </div>
    
    }
    </>
  );
}
