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

// Modules
import Loading                        from '../../../module/loading/blockLoading';

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
        if (typeof window !== 'undefined') {
            const filterAfter = Object.entries(localStorage).filter( filterItem => {
                return filterItem.includes(`accountLoginRecord`);
            })
            if( filterAfter.length!=0 ){
                userID  = JSON.parse(filterAfter[0][1])['userID'];
                userPWD = JSON.parse(filterAfter[0][1])['userPWD'];
            }
            record = Boolean(localStorage.getItem('accountRecordStatus')) || false;
        }

        this.state = {
            loading          : false,
            required         : ['userID','userPWD'],
            form             : {
                type           : 'account',
                userID,
                userPWD,
            },
            msg              : [],
            record
        }
    }

    render(){

        const { 
            loading,
            form, 
            msg,
            record
        } = this.state;

        return(
            <React.Fragment>
                <form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className="form-title">
                        <h4>會員登入</h4>
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
                            <div className="form-row-col-label">記住帳號密碼</div>
                        </div>
                        <div className="form-row-col">
                            <Link className="forget_link" to={`/account/forget`}>忘記密碼</Link>
                        </div>
                    </div>
                    {
                        msg.length!=0 &&
                            <div className="form-row msg" data-content="center">{msg}</div>
                    }
                    <div className="form-row">
                        <button type="submit">送出</button>
                    </div>
                    <div className="form-row" data-direction="column">
                        <div className="sub-title">
                            <span className="text">成為<Link to="/">網紅電商</Link>的新用户？</span>
                        </div>
                        <Link to="/account/signup" className="signup_link">立即註冊</Link>
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

    handleChangeRecord = (e) => {
        // 記住帳號密碼
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
        const { required, form } = this.state;
        const checkRequiredFilter = checkRequired(required, form);
        if( checkRequiredFilter.length==0 ){
            this.setState({
                loading: true
            },()=>{
                this.props.dispatch( signin(form) ).then( res => {
                    this.setState({
                        loading: false,
                    },()=>{
                        switch( res['status'] ){
                            case 200:
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
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( SignIn );