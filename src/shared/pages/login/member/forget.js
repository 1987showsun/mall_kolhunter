import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Actions
import { forget } from '../../../actions/login';

// Lang
import lang from '../../../public/lang/lang.json';

class Forget extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            required: ['email'],
            formObject : {
                type: 'account',
                email: ""
            },
            msg : [],
        }
    }

    render(){

        const { formObject, msg } = this.state;

        return(
            <React.Fragment>
                <form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className="form-title">
                        <h4>會員忘記密碼</h4>
                    </div>
                    <ul>
                        <li>
                            <label htmlFor="email">
                                <div className="input-box">
                                    <input type="email" name="email" id="email" value={ formObject['email'] } onChange={this.handleChange.bind(this)} placeholder="E-mail 會員帳號"/>
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
                        <button type="button" className="goBack" onClick={()=> this.props.history.goBack()}>{lang['zh-TW']['button']['go back']}</button>
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
        const { location, match } = this.props;
        const { formObject, required } = this.state;
        const { pathname, search } = location;
        const checkQequired = required.filter( keys => formObject[keys]=="" ).map( keys => <div key={keys} className="items">{lang['zh-TW']['note'][`${keys} required`]}</div> );
        if( checkQequired.length==0 ){
            this.props.dispatch( forget( pathname, {...queryString.parse(search)}, formObject ) );
        }else{
            this.setState({
                msg: checkQequired
            })
        }
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Forget );