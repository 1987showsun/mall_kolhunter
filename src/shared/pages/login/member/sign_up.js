import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Modules
import Confirm from '../../../module/confirm';

// Actions 
import { signup } from '../../../actions/login';

// Javascripts
import { PWD, checkRequired } from '../../../public/javascripts/checkFormat';

// Lang
import lang from '../../../public/lang/lang.json';


class SignUp extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            open: false,
            popupMSG: "",
            required: ['email','password','password_chk','nickname'],
            formObject : {
                type: 'account',
                email: '',
                password: '',
                password_chk: '',
                nickname: '',
                phone: '',
                company: ''
            },
            msg : ""
        }
    }


    render(){
        const { loading, open, popupMSG, formObject, msg } = this.state;

        return(
            <React.Fragment>
                <form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className="form-title">
                        <h4>會員註冊</h4>
                    </div>
                    <ul>
                        <li>
                            <label htmlFor="email">
                                <div className="input-box">
                                    <input type="email" name="email" id="email" value={ formObject['email'] } onChange={this.handleChange.bind(this)} placeholder="＊帳號 (E-mail)" autoComplete="off" />
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="password">
                                <div className="input-box">
                                    <input type="password" name="password" id="password" value={ formObject['password'] } onChange={this.handleChange.bind(this)} placeholder="＊密碼 (內含英文大小寫與數字，最少8位數)"/>
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="password_chk">
                                <div className="input-box">
                                    <input type="password" name="password_chk" id="password_chk" value={ formObject['password_chk'] } onChange={this.handleChange.bind(this)} placeholder="＊再次確認密碼 (內含英文大小寫與數字，最少8位數)"/>
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="nickname">
                                <div className="input-box">
                                    <input type="text" name="nickname" id="nickname" value={ formObject['nickname'] } onChange={this.handleChange.bind(this)} placeholder="＊會員姓名" autoComplete="off" />
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="phone">
                                <div className="input-box">
                                    <input type="tel" name="phone" id="phone" value={ formObject['phone'] } onChange={this.handleChange.bind(this)} placeholder="聯絡電話" autoComplete="off"/>
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="company">
                                <div className="input-box">
                                    <input type="text" name="company" id="company" value={ formObject['company'] } onChange={this.handleChange.bind(this)} placeholder="公司名稱" autoComplete="off"/>
                                </div>
                            </label>
                        </li>
                    </ul>
                    <div className="form-row form-p" data-content="center">
                        <p>我同意遵守 kolhunter <Link to="">使用權</Link> 與 <Link to="/terms/privacy">隱私權</Link>條款。</p>
                    </div>
                    {
                        msg.length!=0 &&
                            <div className="form-row form-msg" data-content="center">{msg}</div>
                    }
                    <div className="form-row form-p" data-content="center">
                        <button type="submit">送出</button>
                    </div>
                    <div className="form-row form-p" data-content="center">
                        <button type="button" className="goBack" onClick={()=> this.props.history.goBack()}>{lang['zh-TW']['button']['go back']}</button>
                    </div>
                </form>

                <Confirm
                    open={open}
                    method='alert'
                    container={popupMSG}
                    onCancel={this.handleConfirm.bind(this)}
                />
            </React.Fragment>
        );
    }

    handleConfirm = () => {
        this.setState({
            open: false,
            popupMSG: ""
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
        const { required, formObject } = this.state;
        const checkRequiredFilter = checkRequired( required, formObject );
        if( checkRequiredFilter.length==0 ){
            const checkPWDFormat = PWD({ password: formObject['password'], confirm: formObject['password_chk'] });
            if( checkPWDFormat['status'] ){
                this.setState({
                    loading: true,
                    msg: []
                },()=>{
                    this.props.dispatch( signup(formObject) ).then( res => {
                        this.setState({
                            loading: false
                        },()=>{
                            switch( res['status'] ){
                                case 200:
                                    this.setState({
                                        open: true,
                                        popupMSG: lang['zh-TW']['account siginup success']
                                    });
                                    break;

                                default:
                                    const { status_text } = res['data'];
                                    this.setState({
                                        msg: [<div key={res['data']['status_text']}>{ lang['zh-TW']['err'][status_text] }</div>]
                                    });
                                    break;
                            }
                        });
                    });
                })
            }else{
                this.setState({
                    msg: [<div key="1" className="items">{lang['zh-TW']['note'][checkPWDFormat['msg']]}</div>]
                })
            }
        }else{
            this.setState({
                msg: checkRequiredFilter
            })
        }
    };
}

const mapStateToProps = (state) => {
    return{
        
    }
}

export default connect( mapStateToProps )(SignUp);