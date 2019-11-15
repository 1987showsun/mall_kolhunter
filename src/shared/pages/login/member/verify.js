/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                            from 'react';
import queryString                      from 'query-string';
import { connect }                      from 'react-redux';
import { Link }                         from 'react-router-dom';

// Modules
import Confirm                          from '../../../module/confirm';
import Loading                          from '../../../module/loading/mallLoading';

// Actions
import { resendMaillVerify, verify }    from '../../../actions/login';

// Lang
import lang                             from '../../../public/lang/lang.json';

class Verify extends React.Component{

    constructor(props){
        super(props);

        const { search }       = props.location;
        const { email, code }  = queryString.parse(search);
        const getLocationURL   = () => {
            const protocol   = window.location.protocol;
            const hostname   = window.location.hostname;
            const port       = window.location.port;
            return `${protocol}//${hostname}${port!=""? `:${port}`: ''}`;
        }

        this.state = {
            loading     : false,
            open        : false,
            popupMSG    : [],
            success     : false,
            formObject  : {
                type            : 'account',
                returnUrl       : typeof window !== 'undefined'? `${getLocationURL()}/account/verify`:null,
                email           : decodeURI(email)!='undefined'? decodeURI(email):'',
                code            : code || ''
            }
        }
    }

    render(){

        const { loading, open, popupMSG, formObject } = this.state;
        const { type, code } = formObject;
        
        return(
            <React.Fragment>
                <div className="verify-wrap">
                    <h2>註冊成功</h2>
                    <p>感謝您成功註冊<Link to="/">網紅電商</Link>用戶帳號，我們將會將送驗證信件至您的註冊信箱，請至信箱開通會員帳號，謝謝。</p>
                    <p>若未收到驗證信請點選<button onClick={this.resendMaillVerify.bind(this)}>重新寄送驗證信</button></p>
                    <p>如果驗證信被判別為垃圾信件，也可複製驗證碼在此進行帳號驗證</p>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <ul>
                            <li>
                                <div className="input-box">
                                    <input type="text" name="code" value={code} onChange={this.handleChange.bind(this)} placeholder={`${lang['zh-TW']['placeholder']['account activation verification code']}`}/>
                                    <button type="submit">{lang['zh-TW']['button']['submit']}</button>
                                </div>
                            </li>
                        </ul>
                    </form>
                    <Link to={`/${type}?goto=home`}>{lang['zh-TW']['hyperlink']['go to the login page']}</Link>
                    <Loading loading={loading} />
                </div>

                <Confirm
                    open          = {open}
                    method        = 'alert'
                    container     = {popupMSG}
                    onCancel      = {this.handleConfirm.bind(this)}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { location }     = this.props;
        const { search }       = location;
        const { email, code }  = queryString.parse(search);
        
        if( email!=undefined && code!=undefined && email.trim()!='' && code.trim()!='' ){
            this.callAPI();
        }
    }

    resendMaillVerify = () => {

        const { formObject }              = this.state;
        const { location }                = this.props;
        const { pathname, search }        = location;
        const { type, returnUrl, email }  = formObject;
        
        this.props.dispatch( resendMaillVerify(pathname, {...queryString.parse(search)}, {type, returnUrl, email}) ).then( res => {
            switch( res['status'] ){
                case 200:
                    this.setState({
                        open        : true,
                        popupMSG    : [<div key='success' className="items">{lang['zh-TW']['note']['resend verification letter']}</div>]
                    })
                    break;

                default:
                    const { status_text } = res['data'];
                    this.setState({
                        open        : true,
                        popupMSG    : [<div key='success' className="items">{lang['zh-TW']['note'][status_text]}</div>]
                    })
                    break;
            }
        });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            formObject: {
                ...this.state.formObject,
                [name]: value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.callAPI();
    }

    callAPI = () => {
        const { formObject }              = this.state;
        const { location }                = this.props;
        const { pathname, search }        = location;
        const { type, email, code }       = formObject;

        this.setState({
            loading     : true
        },()=>{
            this.props.dispatch( verify(pathname, {...queryString.parse(search)}, {type, email, code}) ).then( res => {
                this.setState({
                    loading     : false,
                    open        : true
                },()=>{
                    switch( res['status'] ){
                        case 200:
                            this.setState({
                                success     : true,
                                popupMSG    : [<div key='success' className="items">{lang['zh-TW']['note']['successful verification']}</div>]
                            })
                            break;

                        default:
                            this.setState({
                                success     : false,
                                popupMSG    : [<div key='error' className="items">{lang['zh-TW']['note']['email or verification code error']}</div>]
                            })
                            break;
                    }
                })
            });
        })
    }

    handleConfirm = () => {
        const { history }             = this.props;
        const { success, formObject } = this.state;
        const { type }  = formObject;
        switch( success ){
            case true:
                history.push({
                    pathname: `/${type}?goto=home`,
                    search  : `goto=home`
                })
                break;

            default:
                this.setState({
                    open        : false,
                    popupMSG    : []
                })
                break;
        }

        
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Verify );