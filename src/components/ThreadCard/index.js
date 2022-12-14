import style from "./style.module.css"
import likePicto from "../../images/like.png"

export function ThreadCard(props){
    const thread = props.threadObj;

    return (
        <div className={style.cardContainer}>
            <div className={style.cardImgBanner}>
                <h2 className={style.cardTitle}>{thread.title}</h2>
            </div>

            <div className={style.cardInfosContainer}>

                <div className={style.cardInfosUser}>
                    <div className={style.cardInfosUserFakeImg}></div>
                    <p className={style.cardUsernameCreator}>{thread.creator.userName}</p>
                </div>
                <div className={style.cardInfosLikes}>
                    <p className={style.cardLikesCount}>{thread.likes}</p>
                    <img className={style.cardLikesPicto} src={likePicto} alt="like_picto"/>
                </div>

            </div>

            <hr/>

            {/* <div className={style.cardTextPreview}>{thread.text}</div> */}
            <div className={style.cardTags}>{thread.tags}</div>
        </div>  
    )
}