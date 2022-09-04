import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Dialog from "./Dialog";
import Message from "./Message";
import {Navigate} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Input, maxStringLength} from "../../utils/validate";
import {useDispatch, useSelector} from "react-redux";
import {rootState} from "../../redux/redux_store";
import {deleteMessage, sendMessageThunk, setDialogs, setMessagesResponse, startChat} from "../../redux/messages_reducer";
import userPhoto from '../../assets/images/userPhoto.png'
import style from "./dialogs.module.scss"

const Dialogs = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setDialogs())
    }, []);

    const myId = useSelector((state: rootState) => state.app.id);
    const messagesData = useSelector((state: rootState) => state.dialogs.messagesData);
    const dialogsData = useSelector((state: rootState) => state.dialogs.dialogsData);
    const state = useSelector((state: rootState) => state);
    const messagesEndRef = useRef(null);
    let [currentUser, setCurrentUser] = useState(0)

    useEffect(() => {
        dispatch(setMessagesResponse(messagesData))
    }, [messagesData]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({})
    }

    const onDeleteMessage = (messageId, currentUserId) => {
        dispatch(deleteMessage(messageId, currentUserId))
    }

    const dialogElement = dialogsData
        ?.map(elem => <Dialog key={elem.id} id={elem.id} name={elem.userName} avatar={elem.photos.small || userPhoto}
                             hasNewMessages={elem.hasNewMessages} lastUserActivityDate={elem.lastUserActivityDate}
                             lastDialogActivityDate={elem.lastDialogActivityDate} dispatch={dispatch}
                             setCurrentUser={setCurrentUser}/>);

    const messageElement = messagesData
        ?.map(elem => <Message key={elem.id} message={elem.body} id={elem.id} senderName={elem.senderName}
                               addedAt={elem.addedAt} viewed={elem.viewed} onDeleteMessage={onDeleteMessage}
                               myId={myId} senderId={elem.senderId} recipientId={elem.recipientId}
                               unreadMessages={props.unreadMessages}/>);


    useEffect(() => {
        scrollToBottom()
    }, [messageElement]);

    if (!state.app.id && state.app.initialized === true) return <Navigate to='/login'/>

    return (
        <div className={style.dialogs}>
            <div className={style.dialogs_friends}>
                {dialogElement}
            </div>
            <div className={style.dialogs_messages}>
                {messageElement}
                <div ref={messagesEndRef}/>
            </div>
            <div className={style.send_message}>
                <DialogTextFieldRF messagesData={messagesData} currentUser={currentUser}/>
            </div>
        </div>
    )
}

const maxStringLengthCreator = maxStringLength(300);

let DialogTextField = (props) => {

    const {handleSubmit} = props;
    return <form onSubmit={handleSubmit}>
        <Field name='sendMessageText' placeholder='your message' component={Input} type='text' Typefield='textarea'
               validate={[maxStringLengthCreator]}/>
        <button type='submit'>Send message</button>
    </form>
}

DialogTextField = reduxForm({
    form: 'DialogTextFieldForm'
})(DialogTextField)

const DialogTextFieldRF = (props) => {
    const dispatch = useDispatch();
    let submit = (formData) => {
        dispatch(startChat(props.currentUser));
        dispatch(sendMessageThunk(props.currentUser, formData.sendMessageText));
    }
    return <DialogTextField onSubmit={submit} messagesData={props.messagesData}/>
}

export default Dialogs;