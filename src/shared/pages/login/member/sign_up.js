/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                       from 'react';
import queryString                 from 'query-string';
import { Link }                    from 'react-router-dom';
import { connect }                 from 'react-redux';
import { FontAwesomeIcon }         from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye, faCheck }       from '@fortawesome/free-solid-svg-icons';
import { faFacebook }                 from '@fortawesome/free-brands-svg-icons';

// Modules
import Confirm                     from '../../../module/confirm';
import Loading                     from '../../../module/loading/blockLoading';
import FacebookLogin               from 'react-facebook-login';
import GoogleLogin                 from 'react-google-login';

// Actions 
import { signup }                  from '../../../actions/login';
import { signin }                     from '../../../actions/login';

// Javascripts
import { PWD, checkRequired }      from '../../../public/javascripts/checkFormat';

// Lang
import lang                        from '../../../public/lang/lang.json';


class SignUp extends React.Component{

    constructor(props){
        super(props);

        let redirectURI   = "";
        let socialToken   = "";
        let socialType   = "";
        let required = ['email','password','password_chk','nickname'];
        let isSafari    = false;
        
        if (typeof window !== 'undefined') {

            if (window.navigator.userAgent.indexOf("Safari/")!=-1){
                isSafari = true;
            }

            redirectURI = location.href.split('#')[0];
            let googleHash = queryString.parse(location.hash);
            if (googleHash['id_token']) {
                if (googleHash['id_token'].length>0) {
                    required = [];
                    socialType = 'google';
                    socialToken = googleHash['id_token'];
                }
            }
        }

        const getLocationURL   = () => {
            const protocol   = window.location.protocol;
            const hostname   = window.location.hostname;
            const port       = window.location.port;
            return `${protocol}//${hostname}${port!=""? `:${port}`: ''}`;
        }
        this.state = {
            loading           : false,
            open              : false,
            pwdDisplay        : false,
            popupMSG          : [],
            method            : 'alert',
            msg               : [],
            required          : required,
            formObject        : {
                type            : 'account',
                returnUrl       : typeof window !== 'undefined'? `${getLocationURL()}/account/verify`:null,
                email           : '',
                password        : '',
                password_chk    : '',
                nickname        : '',
                phone           : '',
                company         : '',
                social        : socialType,
                socialToken   : socialToken,
                socialName   : ''
            },
            redirectURI,
            isSafari
        }
    }


    render(){
        const { history } = this.props;
        const { loading, open, pwdDisplay, popupMSG, method, msg, formObject, redirectURI } = this.state;
        const { email, password, password_chk, nickname, phone, company  } = formObject;

        return(
            <React.Fragment>
                <form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-title">
                        <h4>會員註冊</h4>
                    </div>
                    <ul className="social-login">
                        <li>
                            <FacebookLogin
                                icon={<FontAwesomeIcon icon={faFacebook} />}
                                textButton="使用 Facebook 帳戶註冊"
                                appId="276836963259343"
                                fields="name,email"
                                redirectUri={redirectURI}
                                callback={this.responseFacebook}
                                disableMobileRedirect={isSafari}
                            />
                        </li>
                        <li>
                            <GoogleLogin
                                clientId="1036515192980-dmpqbtf1beftp5vjiqt63k6q7cdkdv7e.apps.googleusercontent.com"
                                buttonText="使用 Google 帳戶註冊"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                redirectUri={redirectURI}
                                uxMode="redirect"
                                prompt="consent"
                                className="social-btn-login-google"
                            />
                        </li>
                    </ul>
                    <div className="form-row social" data-direction="column">
                        <div className="sub-title">
                            <span className="text">或</span>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <label htmlFor="email">
                                <div className="input-box">
                                    <input type="email" name="email" id="email" value={email} onChange={this.handleChange.bind(this)} placeholder="＊E-mail (註冊帳號)" autoComplete="off" />
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="password">
                                <div className="input-box">
                                    <input type={!pwdDisplay? 'password':'text'} name="password" id="password" value={password} onChange={this.handleChange.bind(this)} placeholder="＊密碼 (內含英文大小寫與數字，最少8位數)"/>
                                    <span className="pwd-display" onClick={()=>{ 
                                        this.setState({ pwdDisplay: pwdDisplay? false:true });
                                    }}>
                                        {
                                            pwdDisplay ?(
                                                <FontAwesomeIcon icon={faEye}/>
                                            ):(
                                                <FontAwesomeIcon icon={faEyeSlash}/>
                                            )
                                        }
                                    </span>
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="password_chk">
                                <div className="input-box">
                                    <input  type={!pwdDisplay? 'password':'text'} name="password_chk" id="password_chk" value={password_chk} onChange={this.handleChange.bind(this)} placeholder="＊再次確認密碼 (內含英文大小寫與數字，最少8位數)"/>
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="nickname">
                                <div className="input-box">
                                    <input type="text" name="nickname" id="nickname" value={nickname} onChange={this.handleChange.bind(this)} placeholder="＊會員姓名" autoComplete="off" />
                                </div>
                            </label>
                        </li>
                        {/* <li>
                            <label htmlFor="phone">
                                <div className="input-box">
                                    <input type="tel" name="phone" id="phone" value={phone} onChange={this.handleChange.bind(this)} placeholder="聯絡電話" autoComplete="off"/>
                                </div>
                            </label>
                        </li> */}
                        {/* <li>
                            <label htmlFor="company">
                                <div className="input-box">
                                    <input type="text" name="company" id="company" value={company} onChange={this.handleChange.bind(this)} placeholder="公司名稱" autoComplete="off"/>
                                </div>
                            </label>
                        </li> */}
                    </ul>
                    <div className="form-row form-p" data-content="center">
                        <p>我同意遵守 kolhunter <Link to="">使用權</Link> 與 <Link to="/terms/privacy">隱私權</Link>條款。</p>
                    </div>
                    {
                        msg.length!=0 &&
                            <div className="form-row form-msg" data-content="center">{msg}</div>
                    }
                    <div className="form-row form-p" data-content="center">
                        <button type="submit">{lang['zh-TW']['button']['submit']}</button>
                    </div>
                    <div className="form-row form-p" data-content="center">
                        <button type="button" className="goBack" onClick={()=> history.goBack()}>{lang['zh-TW']['button']['go back']}</button>
                    </div>
                    <Loading loading={loading} />
                </form>

                <Confirm
                    open        = {open}
                    method      = {method}
                    container   = {popupMSG}
                    onCancel    = {this.handleConfirm.bind(this)}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { formObject } = this.state;
        if (formObject['social']=='google') {
            this.responseGoogle();
        }
    }

    handleConfirm = () => {
        this.setState({
            open          : false,
            popupMSG      : []
        },()=>{
            this.props.history.push('/account');
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            formObject: { ...this.state.formObject, [name]: value } 
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.apiCall();
    }

    apiCall = () => {
        const { history }              = this.props;
        const { required, formObject } = this.state;
        const checkRequiredFilter      = checkRequired( required, formObject );
        if( checkRequiredFilter.length==0 || formObject['social']=='google' ){
            const checkPWDFormat = PWD({ password: formObject['password'], confirm: formObject['password_chk'] });
            if (formObject['social'].length>0) {
                const signInForm = {
                    type        : formObject['type'],
                    userID      : formObject['email'],
                    userPWD     : "",
                    social      : formObject['social'],
                    socialToken : formObject['socialToken'],
                    socialName  : formObject['socialName']
                }
                this.props.dispatch( signin(signInForm) ).then( res => {
                    this.setState({
                        loading: false,
                        msg             : []
                    },()=>{                        
                        switch( res['status'] ){
                            case 200:
                                let loginMethod = 'Email';
                                switch (formObject['social']) {
                                    case 'facebook':
                                        loginMethod = 'Facebook';
                                        break;
                                    case 'google':
                                        loginMethod = 'Google';
                                        break;
                                }
                                gtag('event', 'sign_up', { method : loginMethod });
                                gtag('event', 'login', { method : loginMethod });
                                break;
                            default:
                                const { status_text } = res['data'];
                                this.setState({
                                    msg: [<div key={'err'} className="items">{lang['zh-TW']['err'][status_text]}</div>]
                                })     
                                break;
                        }
                    })
                });
            } else if( checkPWDFormat['status'] ){
                this.setState({
                    loading         : true,
                    msg             : []
                },()=>{
                    this.props.dispatch( signup(formObject) ).then( res => {
                        this.setState({
                            loading: false
                        },()=>{
                            switch( res['status'] ){
                                case 200:
                                    gtag('event', 'sign_up', { method : 'email' });
                                    history.push({
                                        pathname   : '/account/verify',
                                        search     : queryString.stringify({
                                            email: formObject['email']
                                        })
                                    })
                                    break;

                                default:
                                    const { status_text } = res['data'];
                                    this.setState({
                                        msg             : [<div key={res['data']['status_text']}>{ lang['zh-TW']['err'][status_text] }</div>]
                                    });
                                    break;
                            }
                        });
                    });
                })
            } else {
                this.setState({
                    msg             : [<div key="1" className="items">{lang['zh-TW']['note'][checkPWDFormat['msg']]}</div>]
                })
            }
        }else{
            this.setState({
                msg             : checkRequiredFilter
            })
        }
    }

    responseFacebook = (response) => {
        const { email, accessToken, name } = response;
        const { formObject } = this.state;
        this.setState({
            required: ['email'],
            formObject: {
                ...formObject,
                email: email,
                // userPWD: "",
                social: 'facebook',
                socialToken: accessToken,
                socialName: name
            }
        })
        this.apiCall();
    }

    responseGoogle = () => {
        const { formObject } = this.state;
        this.setState({
            required: [],
            formObject: {
                ...formObject,
                email: "",
                userPWD: "",
                social: 'google',
                socialName: ""
            }
        })
        this.apiCall();
    }

}

const mapStateToProps = (state) => {
    return{
        
    }
}

export default connect( mapStateToProps )(SignUp);