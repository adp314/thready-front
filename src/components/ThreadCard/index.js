import style from "./style.module.css"
import likePicto from "../../images/like.png"
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../api/api";

export function ThreadCard(props){

    const thread = props.threadObj;
    
    const [user, setUser] = useState({ 
        userName: "",
        email: "",
        profileImg: "",
        });

        const navigate = useNavigate()

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
      }, []);

    return (
        <div className={style.cardContainer}>
            <div className={style.cardImgBannerContainer} style={{backgroundImage: `url(${thread.banner})`}}>
           
            <Link to={`/thread/${thread._id}`} className={style.cardTitle}>{thread.title}</Link>
        
            </div>

            <div className={style.cardInfosContainer}>

                <div className={style.cardInfosUser}>
                    <img className={style.cardInfosUserImg} src={user.profileImg} alt="profile_picture"/>
                    <Link className={style.cardUsernameCreator} to={`/view/${thread.creator._id}`}>{thread.creator.userName}</Link>
                </div>
                <div className={style.cardInfosDate}>{thread.createdAt}</div>
                
                <div className={style.cardInfosLikes}>
                    <p className={style.cardLikesCount}>{thread.likes}</p>
                    <img className={style.cardLikesPicto} src={likePicto} alt="like_picto"/>
                </div>

            </div>

            <hr/>
            <div className={style.cardTags}>
            {                       
                thread.tags.map(tag => {
                return <>
                <p>{tag}</p>
                </>
                })}
            </div>
        </div>
    )
}