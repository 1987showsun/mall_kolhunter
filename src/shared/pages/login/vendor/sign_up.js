import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Modules
import Confirm from '../../../module/confirm';

//Actions
import { signup } from '../../../actions/login';

// Lang
import lang from '../../../public/lang/lang.json';

class SignUp extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            popupMsg: "",
            success: false,
            form : {
                type: 'vendor',
                company: '',
                email: '',
                phone: '',
                invoice: '',
                contactor: ''
            },
            msg : ""
        }
    }

    render(){
        const { form, msg, success, open, popupMsg } = this.state;

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
                                    <input type="text" name="company" id="company" value={ form['company'] } onChange={this.handleChange.bind(this)} placeholder="* 公司名稱" autoComplete="off" />
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="email">
                                <div className="input-box">
                                    <input type="email" name="email" id="email" value={ form['email'] } onChange={this.handleChange.bind(this)} placeholder="* email" autoComplete="off" />
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="phone">
                                <div className="input-box">
                                    <input type="tel" name="phone" id="phone" value={ form['phone'] } onChange={this.handleChange.bind(this)} placeholder="* 電話" autoComplete="off" />
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="invoice">
                                <div className="input-box">
                                    <input type="tel" name="invoice" id="invoice" value={ form['invoice'] } onChange={this.handleChange.bind(this)} placeholder="* 統一編號" autoComplete="off"/>
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="contactor">
                                <div className="input-box">
                                    <input type="text" name="contactor" id="contactor" value={ form['contactor'] } onChange={this.handleChange.bind(this)} placeholder="* 聯絡人" autoComplete="off"/>
                                </div>
                            </label>
                        </li>
                    </ul>
                    <div className="form-row form-p" data-content="center">
                        <p>我同意遵守 kolhunter <Link to="">使用權</Link> 與 <Link to="">隱私權</Link>條款。</p>
                    </div>
                    {
                        msg!='' &&
                            <div className="form-row msg" data-content="center" dangerouslySetInnerHTML={{__html: msg}}></div>
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
                    onConfirm={this.handleConfirm.bind(this)}
                />
            </React.Fragment>
        );
    }

    handleChange = (e) => {
        let form = { ...this.state.form };
        let name = e.target.name;
        let val = e.target.value;
        form = { ...form, [name]: val }

        this.setState({
            form
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let msg = '';
        let { form } = this.state;
        let checkRequired = Object.keys(form).filter( key => {
            return form[key]=='';
        })
        
        this.setState({
            msg
        },()=>{
            if( checkRequired.length==0 ){
                this.props.dispatch( signup(form) ).then( res => {
                    if( res['data']['message']=='success' ){
                        this.setState({
                            open: true,
                            popupMsg: lang['zh-TW']['Vendor siginup success']
                        })
                    }else{
                        this.setState({
                            msg: lang['zh-TW'][res['data']['message']]
                        })
                    }
                });
            }else{
                checkRequired.map( key => {
                    msg = `${lang['zh-TW']['note'][key+' required']}<br/>${msg}`;
                })
                this.setState({
                    msg
                })
            }
        })
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