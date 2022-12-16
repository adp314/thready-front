import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../api/api";
import { BasicFront } from "../../components/BasicFront";
import style from "./style.module.css";
import likePicto from "../../images/like.png"


export function Profile() {

  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/user/profile");
        setUser(response.data);
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, []);

  async function deleteThread(id){
    try {
      await api.delete(`./thread/delete/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

    return (

      <BasicFront navContent={
      <nav className={style.containerStickyNav}>
      <Link className={style.stickyPictoNavProfile} to="/profile">Profile</Link>
      </nav>} centralContent={
        <>
        <div className={style.profileCard}>

        <div className={style.profileCardContent}>
          <img src={user.profileImg} alt="profile_img"/>
              <div className={style.profileCardInfos}>
                <h1>{user.userName}</h1>
                <p>{user.email}</p>
              </div>
        </div>

          <div className={style.profileCardHr}>

          <hr/>
          </div>

        </div>
        
        {/* Essa lista esta dando um erro de keyprop, q não consegui corrigir */}
  
          {user.threadsCreated ? 
            user.threadsCreated.map(element => {

              return  <>
              <div key={element._id} className={style.cardContainer}>
            <div className={style.cardImgBannerContainer} style={{backgroundImage: `url(${element.banner})`}}>
           
            <Link to={`/thread/${element._id}`} className={style.cardTitle}>{element.title}</Link>
        
            </div>

            <div className={style.cardInfosContainer}>

                <div className={style.cardInfosUser}>
                    <img className={style.cardInfosUserImg} src={user.profileImg} alt="profile_picture"/>
                    <Link className={style.cardUsernameCreator} to={`/profile`}>{user.userName}</Link>
                </div>
                <div className={style.cardInfosDate}>{element.createdAt}</div>
                
                <div className={style.cardInfosLikes}>
                    <p className={style.cardLikesCount}>{element.likes}</p>
                    <img className={style.cardLikesPicto} src={likePicto} alt="like_picto"/>
                </div>

            </div>

            <hr/>
            <div className={style.cardTags}>{                
         element.tags.map(tag => {
         return   <>
                    <p>{tag}</p>
                  </>
          })}</div>
        </div>
                     
          </>
        })

                              : 'Loading...'}
        </>
      }/>
      );
  };