import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Actions
import { resetPassword } from '../../../actions/login';

// Javascripts
import { PWD } from '../../../public/javascripts/checkFormat';

// Lang
import lang from '../../../public/lang/lang.json';

class ResetPWD extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            required: ['email','code','newPWD','newPWDChk'],
            open: false,
            msg: [],
            formObject: {
                type: "vendor",
                email: queryString.parse(props.location.search)['email'] || "",
                code: queryString.parse(props.location.search)['code'] || "",
                newPWD: "",
                newPWDChk: ""
            }
        }
    }

    render(){

        const { msg, formObject } = this.state;

        return(
            <React.Fragment>
                <form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className="form-title">
                        <h4>廠商密碼重置</h4>
                    </div>
                    <ul>
                        <li>
                            <label htmlFor="newPWD">
                                <div className="input-box">
                                    <input type="password" name="newPWD" id="newPWD" value={ formObject['newPWD'] } onChange={this.handleChange.bind(this)} placeholder="新密碼"/>
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="newPWDChk">
                                <div className="input-box">
                                    <input type="password" name="newPWDChk" id="newPWDChk" value={ formObject['newPWDChk'] } onChange={this.handleChange.bind(this)} placeholder="再次確認密碼"/>
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
                </form>
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
        const { location } = this.props;
        const { pathname, search } = location;
        const { formObject, required } = this.state;
        const checkRequired = required.filter( keys => formObject[keys]=="").map( keys => <div key={keys} className="items">{lang['zh-TW']['note'][`${keys} required`]}</div>);
        const checkPWDFormat = PWD({ password: formObject['newPWD'] , confirm: formObject['newPWDChk'] });

        if( checkRequired.length==0 ){
            if( checkPWDFormat['status'] ){
                this.props.dispatch( resetPassword(pathname,{...queryString.parse(search)},formObject) );
            }else{
                this.setState({
                    msg: [<div key={'PWDFormat'} className="items">{lang['zh-TW']['note'][checkPWDFormat['msg']]}</div>]
                })
            }
        }else{
            this.setState({
                msg: checkRequired
            })
        }
        
    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default  connect( mapStateToProps )( ResetPWD );