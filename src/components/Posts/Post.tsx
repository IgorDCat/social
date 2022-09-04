import * as React from 'react';
import style from "./posts.module.scss";
import {useState} from "react";

type propsType = {
    message: string;
    photo: string;
    mainPhoto: string;
    likes: number;
}

const Post = (props: propsType) => {
    let [likes, setLikes] = useState(0)

    return (
        <div className={style.post}>
            <div>
                <img src={props.photo? props.photo : props.mainPhoto}/>
            </div>

            <div>
                <label>{props.message} </label>
            </div>
            <div className={style.like}>
                <button onClick={()=> setLikes(prev => prev+1)} className={style.like_button}>Like! ({likes})</button>
            </div>
        </div>
    )
}

export default Post;