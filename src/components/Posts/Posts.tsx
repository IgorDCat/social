import * as React from "react";
import {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {addPostActionCreator} from "../../redux/posts_reducer";
import style from "./posts.module.scss"


const Posts = () => {

    let [text, setText] = useState('');
    const dispatch = useDispatch()

    const addPost = () => {
        let date = new Date();
        dispatch(addPostActionCreator('-'+date.toLocaleString() +'- '+ text));
        setText('')
    };

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.currentTarget.value)
    };

    return (
        <div className={style.posts}>
            <div><textarea onChange={(e) => onPostChange(e)} placeholder='whats new?'
                           value={text}/></div>
            <div>
                <button className='button' onClick={() => addPost()}>Add post</button>
            </div>
        </div>
    )
}
export default Posts;