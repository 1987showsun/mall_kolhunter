import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Modules
import Confirm from '../../../module/confirm';

//Actions
import { signup } from '../../../actions/login';

// Lang
import lang from '../../../public/lang/lang.json';

// Javascripts
import { PWD, checkRequired } from '../../../public/javascripts/checkFormat';

class SignUp extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            popupMsg: "",
            pwdDisplay: false,
            required: ['company','email','password','confirmPassword','phone','invoice','contactor'],
            formObject : {
                type: 'vendor',
                company: '',
                email: '',
                password: '',
                confirmPassword: '',
                phone: '',
                invoice: '',
                contactor: ''
            },
            msg : []
        }
    }

    render(){
        const { pwdDisplay, formObject, msg, open, popupMsg } = this.state;

        return(
            <React.Fragment>
                <form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className="form-title">
                        <h4>加入經銷商</h4>
                    </div>
                    <ul>
                        <li>
                            <label htmlFor="company">
                                <div className="input-box">
                                    <input type="text" name="company" id="company" value={ formObject['company'] } onChange={this.handleChange.bind(this)} placeholder="* 公司名稱" autoComplete="off" />
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="email">
                                <div className="input-box">
                                    <input type="email" name="email" id="email" value={ formObject['email'] } onChange={this.handleChange.bind(this)} placeholder="* Email" autoComplete="off" />
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="password">
                                <div className="input-box">
                                    <input type={!pwdDisplay? 'password':'text'} name="password" id="password" value={ formObject['password'] } onChange={this.handleChange.bind(this)} placeholder="* 密碼 (內含英文大小寫與數字，最少8位數)" autoComplete="off" />
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
                            <label htmlFor="confirmPassword">
                                <div className="input-box">
                                    <input type={!pwdDisplay? 'password':'text'} name="confirmPassword" id="confirmPassword" value={ formObject['confirmPassword'] } onChange={this.handleChange.bind(this)} placeholder="* 再次確認密碼 (內含英文大小寫與數字，最少8位數)" autoComplete="off" />
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="phone">
                                <div className="input-box">
                                    <CurrencyFormat value={formObject['phone']} format="## ########" placeholder="* 電話" onValueChange={(values) => {
                                        const {formattedValue, value} = values;
                                        this.setState({
                                            formObject: {
                                                ...this.state.formObject,
                                                phone: value
                                            }
                                        })
                                    }}/>
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="invoice">
                                <div className="input-box">
                                    <CurrencyFormat value={formObject['invoice']} format="########" placeholder="* 統一編號" onValueChange={(values) => {
                                        const {formattedValue, value} = values;
                                        this.setState({
                                            formObject: {
                                                ...this.state.formObject,
                                                invoice: value
                                            }
                                        })
                                    }}/>
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="contactor">
                                <div className="input-box">
                                    <input type="text" name="contactor" id="contactor" value={ formObject['contactor'] } onChange={this.handleChange.bind(this)} placeholder="* 聯絡人" autoComplete="off"/>
                                </div>
                            </label>
                        </li>
                    </ul>
                    <div className="form-row form-p" data-content="center">
                        <p>我同意遵守 kolhunter <Link to="">使用權</Link> 與 <Link to="">隱私權</Link>條款。</p>
                    </div>
                    {
                        msg.length!=0 &&
                            <div className="form-row msg" data-content="center" data-flexwrap="wrap">{msg}</div>
                    }
                    <div className="form-row" data-content="center">
                        <button type="submit">送出</button>
                    </div>
                    <div className="form-row" data-content="center">
                        <Link to="/vendor" className="signup_link">取消加入</Link>
                    </div>
                </form>
                <Confirm
                    open={open}
                    method='alert'
                    container={popupMsg}
                    onCancel={this.handleConfirm.bind(this)}
                />
            </React.Fragment>
        );
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
            const checkPWDFormat = PWD({ password: formObject['password'], confirm: formObject['confirmPassword'] });
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
                                        popupMsg: [<div key="1" className="items">{lang['zh-TW']['Vendor siginup success']}</div>]
                                    });
                                    break;

                                default:
                                    const { status_text } = res['data'];
                                    this.setState({
                                        msg: [<div key="1" className="items">{lang['zh-TW']['note'][status_text]}</div>]
                                    });
                                    break;
                            }
                        })
                    });
                });
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
    }

    handleConfirm = ( val ) => {
        this.setState({
            open: false,
            success: val
        },()=>{
            this.props.history.push('/vendor');
        })
    }
}

const mapStateToProps = ( state ) => {
    return{

    }
}

export default connect(mapStateToProps)(SignUp);