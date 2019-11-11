/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                 from 'react';
import queryString           from 'query-string';
import { connect }           from 'react-redux';

// Modules
import Confirm               from '../../../module/confirm';

// Actions
import { resetPassword }     from '../../../actions/login';

// Javascripts
import { PWD, checkRequired }from '../../../public/javascripts/checkFormat';

// Lang
import lang                  from '../../../public/lang/lang.json';

class ResetPWD extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            required      : ['email','code','newpwd','checkpwd'],
            open          : false,
            method        : 'alert',
            popupMsg      : [],
            msg           : [],
            formObject    : {
                type        : "account",
                email       : queryString.parse(props.location.search)['email'] || "",
                code        : queryString.parse(props.location.search)['code']  || "",
                newpwd      : "",
                checkpwd    : ""
            }
        }
    }

    render(){

        const { location, history } = this.props;
        const { open, method, popupMsg, msg, formObject } = this.state;
        const query = { ...queryString.parse(location.search) };
        const codeInputDisplay  = query.hasOwnProperty('code');
        const emailInputDisplay = query.hasOwnProperty('email');

        return(
            <React.Fragment>
                <form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className="form-title">
                        <h4>會員密碼重置</h4>
                    </div>
                    <ul>
                        {
                            !codeInputDisplay &&
                                <li>
                                    <label htmlFor="code">
                                        <div className="input-box">
                                            <input type="text" name="code" id="code" value={ formObject['code'] } onChange={this.handleChange.bind(this)} placeholder="驗證碼"/>
                                        </div>
                                    </label>
                                </li>
                        }
                        {
                            !emailInputDisplay &&
                                <li>
                                    <label htmlFor="email">
                                        <div className="input-box">
                                            <input type="email" name="email" id="email" value={ formObject['email'] } onChange={this.handleChange.bind(this)} placeholder="註冊信箱"/>
                                        </div>
                                    </label>
                                </li>
                        }
                        <li>
                            <label htmlFor="newpwd">
                                <div className="input-box">
                                    <input type="password" name="newpwd" id="newpwd" value={ formObject['newpwd'] } onChange={this.handleChange.bind(this)} placeholder="新密碼"/>
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="checkpwd">
                                <div className="input-box">
                                    <input type="password" name="checkpwd" id="checkpwd" value={ formObject['checkpwd'] } onChange={this.handleChange.bind(this)} placeholder="再次確認密碼"/>
                                </div>
                            </label>
                        </li>
                    </ul>
                    {
                        msg.length!=0 &&
                            <div className="form-row msg" data-content="center">{msg}</div>
                    }
                    <div className="form-row">
                        <button type="submit">送出</button>
                    </div>
                    <div className="form-row" data-direction="column">
                        <button type="button" className="goBack" onClick={()=> {
                            const { location } = this.props;
                            const { search }   = location;
                            const searchObject = queryString.parse(search);
                            const backStatus   = searchObject['goto'] || 'prev';
                            switch( backStatus ){
                                case 'home':
                                    history.push('/');
                                    break;

                                case 'prev':
                                    history.goBack();
                                    break;

                                default:
                                    history.goBack();
                                    break;
                            }                            
                        }}>
                            {lang['zh-TW']['button']['go back']}
                        </button>
                    </div>
                </form>

                <Confirm
                    open         = {open}
                    method       = {method}
                    container    = {popupMsg}
                    onCancel     = {this.onCancel.bind(this)}
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
        const { pathname, search }     = location;
        const { formObject, required } = this.state;
        const checkRequiredFilter      = checkRequired(required, formObject);
        const checkPWDFormat           = PWD({ password: formObject['newpwd'] , confirm: formObject['checkpwd'] });

        if( checkRequiredFilter.length==0 ){
            if( checkPWDFormat['status'] ){
                this.setState({
                    loading: true
                },()=>{
                    this.props.dispatch( resetPassword(pathname,{...queryString.parse(search)},formObject) ).then( res => {
                        this.setState({
                            loading: false
                        },()=>{
                            switch( res['status'] ){
                                case 200:
                                    this.setState({
                                        open         : true,
                                        popupMsg     : [<div key="success" className="items">修改完成</div>]
                                    })
                                    break;

                                default:
                                    break;
                            }
                        });
                    });
                });
            }else{
                this.setState({
                    msg: [<div key={'PWDFormat'} className="items">{lang['zh-TW']['note'][checkPWDFormat['msg']]}</div>]
                });
            }
        }else{
            this.setState({
                msg: checkRequiredFilter
            });
        }
        
    }

    onCancel = () => {
        const { history } = this.props;
        history.push({
            pathname: '/account'
        })
    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default  connect( mapStateToProps )( ResetPWD );