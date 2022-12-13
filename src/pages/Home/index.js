import style from "./style.module.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import tlogo from "../../images/tlogo.png";
import home from "../../images/home.png";
import profileuser from "../../images/profileuser.png";
import settings from "../../images/settings.png";


export function Home() {
  return (
    <div className={style.homeContent}>
      <div className={style.homeLeftContainer}>
        <img className={style.homeTLogo} src={tlogo} alt="thready_logo"/>
          <nav className={style.navMenu}>
            <Link className={style.navLinks} to="/home"> <img className={style.navPictos} src={home} alt="home_picto"/>Home</Link>
            <Link className={style.navLinks} to="/home"> <img className={style.navPictos} src={profileuser} alt="profileUseur_picto"/>Profile</Link>
            <Link className={style.navLinks} to="/home"> <img className={style.navPictos} src={settings} alt="settings_picto"/>Settings</Link>
          </nav>
      </div>

      <div className={style.homeCentralContainer}>
        <nav className={style.containerStickyNav}>
          <Link className={style.stickyPictoNavHome} to="/home">Home</Link>
        </nav>
      </div>

      <div className={style.homeRightContainer}>
      <h2 className={style.h2Tags}>Most popular <span className={style.spanTags}>Tags</span></h2>
        <div className={style.homeTopTagsContainer}></div>
        <div className={style.homeFiltertagsContainer}></div>
      </div>
    </div>
  )
}
