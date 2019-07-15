import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SignIn extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            form : {
                username : "",
                password : "",
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
                        <h4>廠商登入</h4>
                    </div>
                    <ul>
                        <li>
                            <label htmlFor="username">
                                <div className="input-box">
                                    <input type="email" name="username" id="username" value={ form['username'] } onChange={this.handleChange.bind(this)} placeholder="廠商帳號（E-mail）"/>
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="password">
                                <div className="input-box">
                                    <input type="password" name="password" id="password" value={ form['password'] } onChange={this.handleChange.bind(this)} placeholder="密碼"/>
                                </div>
                            </label>
                        </li>
                    </ul>
                    {
                        msg!='' &&
                            <div className="form-row msg" data-content="center">{msg}</div>
                    }
                    <div className="form-row">
                        <button type="submit">送出</button>
                    </div>
                    <div className="form-row" data-direction="column">
                        <div className="sub-title">
                            <span className="text">kolhunter 的新廠商？</span>
                        </div>
                        <Link to="/login/inc/signup" className="signup_link">立即申請</Link>
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
        const form = { ...this.state.form };
        console.log( form );
    };
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( SignIn );