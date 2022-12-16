import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { api } from "../../api/api";
import { BasicFront } from "../../components/BasicFront";
import style from "./style.module.css"
import likePicto from "../../images/like.png"


export function ViewSingleThread() {

    const params = useParams();

    const [thread, setThread] = useState({
        title: '',
        text: '',
        likes: 0,
        banner: {},
        tags: [],
        createdAt: '',
        creator: {},
        creatorName: ''
    });

    const [user, setUser] = useState({});

    useEffect(() => {
        async function getThread(){
            try {
                const threadData = await api.get(`thread/single/${params.id}`);
                setThread(threadData.data);
            } catch (err) {
                console.log(err);
            }
        }
 
        getThread();
        console.log(thread);
    }, []);

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

        <BasicFront navContent={
            <nav className={style.containerStickyNav}>
            <Link className={style.stickyPictoNavProfile} to="/profile">Thread</Link>
            </nav>} centralContent={
        <>
        { thread.title === '' ?   'Loading...': 
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
            <hr/>
            
            <div className={style.cardTextContainer} dangerouslySetInnerHTML={{__html: `${thread.text}`}} />
            
        </div>
        
        
}
        </>
    }/>
);
     
}