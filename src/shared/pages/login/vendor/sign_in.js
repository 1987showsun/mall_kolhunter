import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import { signin } from '../../../actions/login';

// lang
import lang from '../../../lang/lang.json';

class SignIn extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            form : {
                type: 'vendor',
                "vendorID" : "",
                "vendorPWD" : "",
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
                            <label htmlFor="vendorID">
                                <div className="input-box">
                                    <input type="email" name="vendorID" id="vendorID" value={ form['vendorID'] } onChange={this.handleChange.bind(this)} placeholder="廠商帳號（E-mail）"/>
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="vendorPWD">
                                <div className="input-box">
                                    <input type="password" name="vendorPWD" id="vendorPWD" value={ form['vendorPWD'] } onChange={this.handleChange.bind(this)} placeholder="密碼"/>
                                </div>
                            </label>
                        </li>
                    </ul>
                    {
                        msg!='' &&
                            <div className="form-row msg" data-content="center" dangerouslySetInnerHTML={{__html: msg}}></div>
                    }
                    <div className="form-row">
                        <button type="submit">送出</button>
                    </div>
                    <div className="form-row" data-direction="column">
                        <div className="sub-title">
                            <span className="text">kolhunter 的新廠商？</span>
                        </div>
                        <Link to="/vendor/leading" className="signup_link">立即申請</Link>
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
        let msg = '';
        let { form } = this.state;
        let checkRequired = Object.keys( form ).filter( key => {
            if( key!='type' ){
                return form[key]=='';
            }
        })
        
        this.setState({
            msg
        },()=>{
            if( checkRequired.length==0 ){
                this.props.dispatch( signin(form) ).then( res => {
                    switch( res ){
                        case 403:
                            this.setState({
                                msg: lang['zh-TW']['err'][ res['data']['status_text'] ]
                            })
                            break;
                    }
                });
            }else{
                checkRequired.map( key => {
                    msg = `${lang['zh-TW']['note'][key+' required']}<br/>${msg}`
                })
                this.setState({
                    msg
                })
            }
        });
    };
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( SignIn );