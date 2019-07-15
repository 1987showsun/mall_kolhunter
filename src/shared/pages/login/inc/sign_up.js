import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Components

//Actions
import { signup } from '../../../actions/login';

//Javascripts
import { PWD } from '../../../public/javascripts/checkFormat';

class SignUp extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            form : {
                type: 'inc',
                username: '',
                password: '',
                confirmPassword: '',
                incname: '',
                eim: '',
                name: '',
                tel: '',
                address: ''
            },
            msg : ""
        }
    }

    render(){
        const { form, msg } = this.state;
        return(
            <React.Fragment>
                <form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className="form-title">
                        <h4>廠商註冊</h4>
                    </div>
                    <ul>
                        <li>
                            <label htmlFor="username">
                                <div className="input-box">
                                    <input type="email" name="username" id="username" value={ form['username'] } onChange={this.handleChange.bind(this)} placeholder="帳號 (E-mail)" autoComplete="off" />
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="password">
                                <div className="input-box">
                                    <input type="password" name="password" id="password" value={ form['password'] } onChange={this.handleChange.bind(this)} placeholder="密碼 (內含英文大小寫與數字，共8位數)"/>
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="confirmPassword">
                                <div className="input-box">
                                    <input type="password" name="confirmPassword" id="confirmPassword" value={ form['confirmPassword'] } onChange={this.handleChange.bind(this)} placeholder="再次確認密碼"/>
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="incname">
                                <div className="input-box">
                                    <input type="text" name="incname" id="incname" value={ form['incname'] } onChange={this.handleChange.bind(this)} placeholder="公司名稱" autoComplete="off" />
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="eim">
                                <div className="input-box">
                                    <input type="tel" name="eim" id="eim" value={ form['eim'] } onChange={this.handleChange.bind(this)} placeholder="統一編號" autoComplete="off" />
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="name">
                                <div className="input-box">
                                    <input type="text" name="name" id="name" value={ form['name'] } onChange={this.handleChange.bind(this)} placeholder="聯絡人" autoComplete="off"/>
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="tel">
                                <div className="input-box">
                                    <input type="tel" name="tel" id="tel" value={ form['tel'] } onChange={this.handleChange.bind(this)} placeholder="聯絡電話" autoComplete="off"/>
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="address">
                                <div className="input-box">
                                    <input type="text" name="address" id="address" value={ form['address'] } onChange={this.handleChange.bind(this)} placeholder="通訊地址" autoComplete="off"/>
                                </div>
                            </label>
                        </li>
                    </ul>
                    <div className="form-row form-p" data-content="center">
                        <p>我同意遵守 kolhunter <Link to="">使用權</Link> 與 <Link to="">隱私權</Link>條款。</p>
                    </div>
                    {
                        msg!='' &&
                            <div className="form-row msg" data-content="center">{msg}</div>
                    }
                    <div className="form-row form-p" data-content="center">
                        <button type="submit">送出</button>
                    </div>
                    <div className="form-row form-p" data-content="center">
                        <Link to="/login/inc" className="signup_link">取消註冊</Link>
                    </div>
                </form>
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
        let form = { ...this.state.form };
        //console.log( PWD(form) );
        this.props.dispatch( signup(form) );
    };
}

const mapStateToProps = ( state ) => {
    return{

    }
}

export default connect(mapStateToProps)(SignUp);