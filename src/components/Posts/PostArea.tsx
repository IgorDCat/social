import * as React from "react";
import Post from './Post';
import {postsDataType} from "../../redux/posts_reducer";
import style from "./posts.module.scss"


type propsType = {
    postsData: Array<postsDataType>
    photo: string
    mainPhoto: string
}

const PostArea = (props: propsType) => {
    let postElement = props.postsData.map( elem => <Post photo={props.photo} mainPhoto={props.mainPhoto}
                                                         key={elem.id} message={elem.postMessage} likes={elem.likesCount}/>);
    return (
        <div className = {style.post_area}>
            {postElement}
        </div>
    )
}

export default PostArea;