import * as React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input, maxStringLength, required} from "../../utils/validate";
import {setSubmitInfo, toLoginUser} from "../../redux/profile_reducer";
import {connect} from "react-redux";
import {initializeAppThunk} from "../../redux/app_reducer";
import {Navigate} from "react-router-dom";
import {setUnreadMessages} from "../../redux/messages_reducer";
import style from "./login.module.scss";

const maxStringLengthCreator = maxStringLength(50);

let Login = (props) => {

    const {handleSubmit} = props
    return <form onSubmit={handleSubmit}>
        <div className={style.login_form}><h2>Login</h2></div>
        <div className={style.login_form}><Field name="email" placeholder='email' component={Input} type='text'
                                                 Typefield='input' validate={[required, maxStringLengthCreator]}/></div>
        <div className={style.login_form}><Field name="password" placeholder='password' component={Input}
                                                 type='password'
                                                 Typefield='input' validate={[required, maxStringLengthCreator]}/></div>
        <div className={style.login_form}><Field name="rememberMe" component='input' type='checkbox'/> remember me</div>

        <div className={style.login_form}> {props.state.profile.captchaURL ?
            <img src={props.state.profile.captchaURL}/> : null}</div>
        <div className={style.login_form}> {props.state.profile.captchaURL ?
            <Field name="captcha" placeholder='Enter symbols from image' component={Input} type='text'
                   Typefield='input' validate={[required]}/> : null}</div>
        <div className={style.login_button}>
            <button className='button' type='submit'>log-in</button>
        </div>
        <div className='success'>{props.state.profile.submitInfo ? ' success!' : null}</div>

    </form>
}

Login = reduxForm({
    form: 'login'
})(Login)

const mapStateToProps = (state) => ({
    state: state
})

const LoginPage = (props) => {

    const onSubmit = (formData) => {
        props.toLoginUser(formData.email, formData.password, formData.rememberMe, formData.captcha).then(response => {
            props.initializeAppThunk();
            props.setUnreadMessages()
        })

    }
    if (!!props.state.app.id && props.state.app.initialized === true) return <Navigate to='/profile'/>;

    return <Login onSubmit={onSubmit} state={props.state}/>
}


export default connect(mapStateToProps, {toLoginUser, initializeAppThunk, setSubmitInfo, setUnreadMessages})(LoginPage);