import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Modules
import Confirm from '../../../module/confirm';

// Actions 
import { signup } from '../../../actions/login';

// Javascripts
import { PWD } from '../../../public/javascripts/checkFormat';

// Lang
import lang from '../../../public/lang/lang.json';

class SignUp extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            popupMSG: "",
            required: ['email','password','password_chk','nickname'],
            form : {
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
        const { 
            open,
            popupMSG,
            form, 
            msg 
        } = this.state;

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
                                    <input type="email" name="email" id="email" value={ form['email'] } onChange={this.handleChange.bind(this)} placeholder="＊帳號 (E-mail)" autoComplete="off" />
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="password">
                                <div className="input-box">
                                    <input type="password" name="password" id="password" value={ form['password'] } onChange={this.handleChange.bind(this)} placeholder="＊密碼 (內含英文大小寫與數字，共8位數)"/>
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="password_chk">
                                <div className="input-box">
                                    <input type="password" name="password_chk" id="password_chk" value={ form['password_chk'] } onChange={this.handleChange.bind(this)} placeholder="＊再次確認密碼"/>
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="nickname">
                                <div className="input-box">
                                    <input type="text" name="nickname" id="nickname" value={ form['nickname'] } onChange={this.handleChange.bind(this)} placeholder="＊暱稱" autoComplete="off" />
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="phone">
                                <div className="input-box">
                                    <input type="tel" name="phone" id="phone" value={ form['phone'] } onChange={this.handleChange.bind(this)} placeholder="聯絡電話" autoComplete="off"/>
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="company">
                                <div className="input-box">
                                    <input type="text" name="company" id="company" value={ form['company'] } onChange={this.handleChange.bind(this)} placeholder="公司名稱" autoComplete="off"/>
                                </div>
                            </label>
                        </li>
                    </ul>
                    <div className="form-row form-p" data-content="center">
                        <p>我同意遵守 kolhunter <Link to="">使用權</Link> 與 <Link to="">隱私權</Link>條款。</p>
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
                    onConfirm={this.handleConfirm.bind(this)}
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
        let form = { ...this.state.form };
        let name = e.target.name;
        let val = e.target.value;
        form = { ...form, [name]: val }

        if( name=="password" || name=="password_chk" ){
            const checkFormat = PWD({ password: form['password'] , confirm: form['password_chk'] });
            let msg = [];
            if( !checkFormat['status'] ){
                msg = [<div key="msgPWD">{lang['zh-TW']['note'][ checkFormat['msg'] ]}</div>];
            }
            this.setState({
                msg
            })
        }

        this.setState({
            form
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { required } = this.state;
        let { form } = this.state;
        const checkRequired = required.filter((key ,i)=>form[key]=="").map( (key,i)=>{
            return <div key={key}>{lang['zh-TW']['note'][`${key} required`]}</div>
        });

        if( checkRequired.length!=0 ){
            this.setState({
                msg: checkRequired
            })
        }else{
            this.props.dispatch( signup(form) ).then( res => {
                if( res['status']==200 ){
                    this.setState({
                        open: true,
                        popupMSG: lang['zh-TW']['account siginup success']
                    })
                }else{
                    this.setState({
                        msg: [<div key={res['data']['status_text']}>{ lang['zh-TW']['err'][ res['data']['status_text'] ] }</div>]
                    })
                }
            });
        }        
    };
}

const mapStateToProps = (state) => {
    return{
        
    }
}

export default connect( mapStateToProps )(SignUp);