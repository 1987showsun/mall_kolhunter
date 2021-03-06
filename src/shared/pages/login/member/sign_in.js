/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                          from 'react';
import queryString                    from 'query-string';
import { Link }                       from 'react-router-dom';
import { connect }                    from 'react-redux';
import { FontAwesomeIcon }            from '@fortawesome/react-fontawesome';
import { faCheck }                    from '@fortawesome/free-solid-svg-icons';
import { faFacebook }                 from '@fortawesome/free-brands-svg-icons'

// Modules
import Loading                        from '../../../module/loading/blockLoading';
import FacebookLogin                  from 'react-facebook-login';
import GoogleLogin                    from 'react-google-login';

// Actions
import { signin }                     from '../../../actions/login';

// Lang
import lang                           from '../../../public/lang/lang.json';

// Javascripts
import { checkRequired }              from '../../../public/javascripts/checkFormat';

class SignIn extends React.Component{

    constructor(props){
        super(props);

        let userID    = "";
        let userPWD   = "";
        let record    = false;
        let redirectURI   = "";
        let socialToken   = "";
        let socialType   = "";
        let required = ['userID','userPWD'];
        let isSafari    = false;
        
        if (typeof window !== 'undefined') {
            const filterAfter = Object.entries(localStorage).filter( filterItem => {
                return filterItem.includes(`accountLoginRecord`);
            })
            if( filterAfter.length!=0 ){
                userID  = JSON.parse(filterAfter[0][1])['userID'];
                userPWD = JSON.parse(filterAfter[0][1])['userPWD'];
            }
            record = Boolean(localStorage.getItem('accountRecordStatus')) || false;

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

        this.state = {
            loading          : false,
            required         : required,
            form             : {
                type           : 'account',
                userID,
                userPWD,
                social        : socialType,
                socialToken   : socialToken,
                socialName   : ''
            },
            msg              : [],
            record,
            redirectURI,
            isSafari
        }
    }

    render(){

        const { 
            loading,
            form, 
            msg,
            record,
            redirectURI,
            isSafari
        } = this.state;

        return(
            <React.Fragment>
                <form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className="form-title">
                        <h4>????????????</h4>
                    </div>
                    <ul className="social-login">
                        <li>
                            <FacebookLogin
                                icon={<FontAwesomeIcon icon={faFacebook} />}
                                textButton="?????? Facebook ????????????"
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
                                buttonText="?????? Google ????????????"
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
                            <span className="text">???</span>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <label htmlFor="userID">
                                <div className="input-box">
                                    <input type="email" name="userID" id="userID" value={ form['userID'] } onChange={this.handleChange.bind(this)} placeholder={`${lang['zh-TW']['placeholder']['userID']}`}/>
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="userPWD">
                                <div className="input-box">
                                    <input type="password" name="userPWD" id="userPWD" value={ form['userPWD'] } onChange={this.handleChange.bind(this)} placeholder={`${lang['zh-TW']['placeholder']['userPWD']}`}/>
                                </div>
                            </label>
                        </li>
                    </ul>
                    <div className="form-row" data-content="space-between">
                        <div className="form-row-col">
                            <label htmlFor="record" className="checkbox-label">
                                <input type="checkbox" id="record" name="record" className="admin-checkbox" onChange={this.handleChangeRecord.bind(this)} checked={record}/>
                                <i className="checkbox_icon">
                                    <FontAwesomeIcon icon={faCheck} />
                                </i>
                            </label>
                            <div className="form-row-col-label">??????????????????</div>
                        </div>
                        <div className="form-row-col">
                            <Link className="forget_link" to={`/account/forget`}>????????????</Link>
                        </div>
                    </div>
                    {
                        msg.length!=0 &&
                            <div className="form-row msg" data-content="center">{msg}</div>
                    }
                    <div className="form-row">
                        <button type="submit">{lang['zh-TW']['button']['submit']}</button>
                    </div>
                    <div className="form-row" data-direction="column">
                        <div className="sub-title">
                            <span className="text">??????<Link to="/">????????????</Link>???????????????</span>
                        </div>
                        <Link to="/account/signup" className="signup_link">????????????</Link>
                    </div>
                    <div className="form-row" data-direction="column">
                        <button type="button" className="goBack" onClick={()=> {
                            const { location } = this.props;
                            const { pathname, search } = location;
                            const searchObject = queryString.parse(search);
                            const backStatus = searchObject['goto'] || 'prev';
                            switch( backStatus ){
                                case 'home':
                                    this.props.history.push('/');
                                    break;

                                case 'prev':
                                    this.props.history.goBack();
                                    break;

                                default:
                                    this.props.history.goBack();
                                    break;
                            }                            
                        }}>
                            {lang['zh-TW']['button']['go back']}
                        </button>
                    </div>
                    <Loading loading={loading} />
                </form>
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { form } = this.state;
        if (form['social']=='google') {
            this.responseGoogle();
        }
    }

    handleChangeRecord = (e) => {
        // ??????????????????
        const name = e.target.name;
        const checked = e.target.checked;
        this.setState({
            [name]: checked
        },()=>{
            const {form} = this.state;
            const type = form['type'];
            if( this.state[name] ){
                localStorage.setItem( `${type}LoginRecord` , JSON.stringify(form) );
                localStorage.setItem( `${type}RecordStatus` , checked );
            }else{
                localStorage.removeItem( `${type}LoginRecord` );
                localStorage.removeItem( `${type}RecordStatus` );
            }
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            form: {
                ...this.state.form, 
                [name]: value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.apiCall();
    }
    
    apiCall = () => {
        const { required, form } = this.state;
        const checkRequiredFilter = checkRequired(required, form);
        if( checkRequiredFilter.length==0 || form['social']=='google' ){
            this.setState({
                loading: true
            },()=>{
                this.props.dispatch( signin(form) ).then( res => {
                    this.setState({
                        loading: false,
                    },()=>{
                        switch( res['status'] ){
                            case 200:
                                let loginMethod = 'Email';
                                switch (form['social']) {
                                    case 'facebook':
                                        loginMethod = 'Facebook';
                                        break;
                                    case 'google':
                                        loginMethod = 'Google';
                                        break;
                                }
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
            });
        }else{
            this.setState({
                msg: checkRequiredFilter
            })
        }
    }

    responseFacebook = (response) => {
        const { email, accessToken, name } = response;
        const { form } = this.state;
        this.setState({
            required: ['userID'],
            form: {
                ...form,
                userID: email,
                userPWD: "",
                social: 'facebook',
                socialToken: accessToken,
                socialName: name
            }
        })
        this.apiCall();
    }

    responseGoogle = () => {
        const { form } = this.state;
        this.setState({
            required: [],
            form: {
                ...form,
                userID: "",
                userPWD: "",
                social: 'google',
                socialName: ""
            }
        })
        this.apiCall();
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( SignIn );