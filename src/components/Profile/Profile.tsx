import * as React from "react";
import {useEffect, useState} from "react";
import PostArea from "../Posts/PostArea";
import {Navigate, NavLink, useMatch} from "react-router-dom";
import {ProfileStatus} from "../ProfileStatus/ProfileStatus";
import mainPhoto from '../../assets/images/user_cat.png';
import {useDispatch, useSelector} from "react-redux";
import {setDialogs, startChat} from "../../redux/messages_reducer";
import {ProfileInfo} from "./Profile_info";
import {rootState} from "../../redux/redux_store";
import {sendMainImage, setProfileInfoThunk, setSubmitInfo} from "../../redux/profile_reducer";
import Posts from "../Posts/Posts";
import style from "./profile.module.scss"

const Profile = () => {

    const dispatch = useDispatch();
    const photo = useSelector((state: rootState) => state.profile.profilePage.photos.large);
    const app = useSelector((state: rootState) => state.app);
    const postsData = useSelector((state: rootState) => state.posts.postsData);
    const authData = useSelector((state: rootState) => state.profile.authData);

    const match = useMatch('/profile/:userId');
    let [mainImg, setMainImg] = useState(photo);

    useEffect(() => {
        dispatch(setProfileInfoThunk(authData.id, match))
    }, [match])

    const changeMainImg = () => {
        if (photo) setMainImg(photo)
    }

    useEffect(() => {
        changeMainImg()
    }, [mainImg])


    if (!app.id && app.initialized === true) return <Navigate to='/login'/>;

    const onSendMainImage = async (e) => {
        await dispatch(sendMainImage(e.currentTarget.files[0]))
    }

    const mainImageStyle = () => {
        if (!match) return style.thumbs
        else return style.avatar

    }

    const startChatRedirect = () => {
        // @ts-ignore
        dispatch(startChat(match.params.userId));
        dispatch(setDialogs())
    }

    return (
        <div className={style.content}>

            <div>
                <ProfileStatus match={match} setSubmitInfo={dispatch(setSubmitInfo)}/>
            </div>
            <div className={style.profile}>
                <div className={mainImageStyle()}>
                    <img
                        src={!match ? (photo || mainPhoto) : (photo || mainPhoto)} className={mainImageStyle()} alt=''/>
                    {!match ?
                        <div className={style.caption}>
                            <span className={style.title}>Change photo:</span>
                            <span className={style.info}><input className={style.change_main_img} type={"file"}
                                                                onChange={(e) => onSendMainImage(e)} accept="image/*"/></span>
                        </div>
                        : <NavLink to='/dialogs/'>
                            <button onClick={() => startChatRedirect()}>Send message</button>
                        </NavLink>}
                </div>

                <ProfileInfo/>
            </div>
            <div className={style.posts_area}><Posts/></div>

            <PostArea postsData={postsData} photo={photo} mainPhoto={mainPhoto}/>

        </div>
    )
}


export default Profile;