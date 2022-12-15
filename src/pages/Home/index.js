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
import { ThreadCard } from "../../components/ThreadCard/index.js";
import upArrow from "../../images/up-arrow.png"


export function Home() {

  const [threadsAll, setThreads] = useState([]);
  const [user, setUser] = useState({ 
    userName: "",
    email: "",
    profileImg: "",
    });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [fix, setFix] = useState(false)
  const [visible, setVisible] = useState(false)
  

  function setFixed(){
    if (window.scrollY >= 150) {
      setFix(true)
    } else {
      setFix(false)
    }
    }

  window.addEventListener("scroll", setFixed)

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
    async function getAllThreads(){
      try {
        const response = await api.get("/thread/all");
        setThreads(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getAllThreads();
    console.log(threadsAll);
    console.log(threadsAll);
  }, []);

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


  function toggleVisible() {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  };

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <div className={style.homeContent}>
      <div className={style.homeLeftContainer}>
          <nav>
        <img className={style.homeTLogo} src={tlogo} alt="thready_logo"/>
            <Link className={style.navLinks} to="/home" onClick={() => window.location.reload(false)}> <img className={style.navPictos} src={home} alt="home_picto"/>Home</Link>
            <Link className={style.navLinks} to="/home"> <img className={style.navPictos} src={profileuser} alt="profileUseur_picto"/>Profile</Link>
            <Link className={style.navLinks} to="/settings"> <img className={style.navPictos} src={settings} alt="settings_picto"/>Settings</Link>
          </nav>

          {isLoggedIn ? 
          <div className={style.profileCardLogged}>
            <img className={style.homeCardProfileImg}src={user.profileImg} alt="profile_img"/>
            <p className={style.homeCardUsername}>{user.userName}</p>
            <img className={style.homeCardLogout} src={logoutPicto} alt="logout_picto" onClick={handleLogOut}/>
          </div>
          : <div className={style.profileCardNotLogged}>
          <img className={style.homeCardProfileImg}src={profileuser} alt="profile_img"/>
            <Link className={style.notConnectedHomeLinkToLoggin} to="/login">Login / Signup</Link>
            </div>
          }
      </div>

      <div className={style.homeCentralContainer}>
        <nav className={style.containerStickyNav}>
          <Link className={style.stickyPictoNavHome} to="/home" onClick={() => window.location.reload(false)}>Home</Link>
        </nav>
        
         { threadsAll.map(element => {
          return <ThreadCard threadObj={element} key={element._id}/>
        })} 

      </div>

      <div className={style.homeRightContainer}>
        <div className={style.homeRightContainerTags}>
          <h2 className={style.h2Tags}>Most popular <span className={style.spanTags}>Tags</span></h2>
            <div className={style.homeTopTagsContainer}></div>
            <div className={style.homeFiltertagsContainer}></div>
        </div>
        <div className={style.stickyUpArrowdiv} onClick={scrollToTop}>
              <img src={upArrow} alt="upArrow_picto"/>
        </div>
      </div>
    </div>
  )
}


