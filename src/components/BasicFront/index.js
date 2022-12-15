import style from "./style.module.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import tlogo from "../../images/tlogo.png";
import home from "../../images/home.png";
import profileuser from "../../images/profileuser.png";
import logoutPicto from "../../images/logout.png";
import settings from "../../images/settings.png";
import upArrow from "../../images/up-arrow.png"


export function BasicFront(props) {

  const [user, setUser] = useState({ 
    userName: "",
    email: "",
    profileImg: "",
    });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  const {navContent, centralContent} = props;

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

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/home");
    window.location.reload(false);
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

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };


  return (
    <div className={style.content}>
      <div className={style.leftContainer}>
        <img className={style.tLogo} src={tlogo} alt="thready_logo"/>
        <nav className={style.navMenu}>
            <Link className={style.navLinks} to="/home" onClick={() => window.location.reload(false)}> <img className={style.navPictos} src={home} alt="home_picto"/>Home</Link>
            <Link className={style.navLinks} to="/profile"> <img className={style.navPictos} src={profileuser} alt="profileUseur_picto"/>Profile</Link>
            <Link className={style.navLinks} to="/settings"> <img className={style.navPictos} src={settings} alt="settings_picto"/>Settings</Link>
          </nav>

          {isLoggedIn ? 
          <div className={style.profileCardLogged}>
            <img className={style.cardProfileImg}src={user.profileImg} alt="profile_img"/>
            <p className={style.cardUsername}>{user.userName}</p>
            <img className={style.cardLogout} src={logoutPicto} alt="logout_picto" onClick={handleLogOut}/>
          </div>
          : <div className={style.profileCardNotLogged}>
          <img className={style.CardProfileImg}src={profileuser} alt="profile_img"/>
            <Link className={style.notConnectedLinkToLoggin} to="/login">Login / Signup</Link>
            </div>
          }
      </div>


      <div className={style.centralContainer}>
      
      {navContent}
      {centralContent}

      </div>


      <div className={style.rightContainer}>
        <div className={style.rightContainerTags}>
          <h2 className={style.h2Tags}>Most popular <span className={style.spanTags}>Tags</span></h2>
            <div className={style.topTagsContainer}></div>
            <div className={style.filterTagsContainer}></div>
        </div>
        <div className={style.stickyUpArrowdiv} onClick={scrollToTop}>
              <img src={upArrow} alt="upArrow_picto"/>
        </div>
      </div>
    </div>
  )
}
