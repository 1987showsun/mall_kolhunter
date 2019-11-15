/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                 from 'react';
import queryString           from 'query-string';
import { connect }           from 'react-redux';

// Modules
import Confirm               from '../../../module/confirm';
import Loading               from '../../../module/loading/mallLoading';

// Actions
import { forget }            from '../../../actions/login';

// Lang
import lang                  from '../../../public/lang/lang.json';

// javascripts
import { checkRequired }     from '../../../public/javascripts/checkFormat';

class Forget extends React.Component{

    constructor(props){
        super(props);

        const getLocationURL   = () => {
            const protocol   = window.location.protocol;
            const hostname   = window.location.hostname;
            const port       = window.location.port;
            return `${protocol}//${hostname}${port!=""? `:${port}`: ''}`;
        }

        this.state = {
            loading           : false,
            open              : false,
            method            : "alert",
            popupMsg          : [],
            msg               : [],
            required          : ['email'],
            formObject        : {
                type            : 'account',
                returnUrl       : typeof window !== 'undefined'? `${getLocationURL()}/account/resetPWD`:null,
                email           : ""
            }
        }
    }

    render(){

        const { loading, open, method, popupMsg, formObject, msg } = this.state;

        return(
            <React.Fragment>
                <form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className="form-title">
                        <h4>會員忘記密碼</h4>
                    </div>
                    <ul>
                        <li>
                            <label htmlFor="email">
                                <div className="input-box">
                                    <input type="email" name="email" id="email" value={ formObject['email'] } onChange={this.handleChange.bind(this)} placeholder="E-mail 會員帳號"/>
                                </div>
                            </label>
                        </li>
                    </ul>
                    {
                        msg.length!=0 &&
                            <div className="form-row msg" data-content="center">{msg}</div>
                    }
                    <div className="form-row">
                        <button type="submit">{lang['zh-TW']['button']['submit']}</button>
                    </div>
                    <div className="form-row" data-direction="column">
                        <button type="button" className="goBack" onClick={()=> {
                            const { location }  = this.props;
                            const { search }    = location;
                            const searchObject  = queryString.parse(search);
                            const backStatus    = searchObject['goto'] || 'prev';
                            switch( backStatus ){
                                case 'home':
                                    this.props.history.push('/');
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

                <Confirm
                    open          = {open}
                    method        = {method}
                    container     = {popupMsg}
                    onCancel      = {this.onCancel.bind(this)}
                />
            </React.Fragment>
        );
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

        const { location }             = this.props;
        const { formObject, required } = this.state;
        const { pathname, search }     = location;
        const checkRequiredFilter      = checkRequired(required, formObject);

        if( checkRequiredFilter.length==0 ){
            this.setState({
                loading: true
            },()=>{
                this.props.dispatch( forget( pathname, {...queryString.parse(search)}, formObject ) ).then( res => {
                    this.setState({
                        loading     : false
                    },()=>{
                        switch( res['status'] ){
                            case 200:
                                this.setState({
                                    open        : true,
                                    method      : 'alert',
                                    popupMsg    : [<div key="success" className="items">{lang['zh-TW']['note']['Will send the update password URL to the registration email']}</div>]
                                });
                                break;

                            default:
                                this.setState({
                                    msg         : [<div key="error" className="items">{lang['zh-TW']['err']['can&lsquo;t find this email']}</div>]
                                })
                                break;
                        }
                    })
                });
            })
        }else{
            this.setState({
                msg: checkRequiredFilter
            })
        }
    }

    onCancel = () => {
        this.props.history.push({
            pathname     : '/account',
            search       : 'goto=home'
        })
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Forget );