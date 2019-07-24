import React from "react";
import { connect } from 'react-redux';

class ForgetPWD extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            msg: "",
            formObject: {
                vendorID: "",
            }
        }
    }

    render(){

        const { msg, formObject } = this.state;

        return(
            <form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <div className="form-title">
                    <h4>忘記密碼</h4>
                </div>
                <ul>
                    <li>
                        <label htmlFor="vendorID">
                            <div className="input-box">
                                <input type="email" name="vendorID" id="vendorID" value={ formObject['vendorID'] } onChange={this.handleChange.bind(this)} placeholder="廠商帳號（E-mail）"/>
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
            </form>
        );
    }

    handleChange = () => {
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
        let { msg, formObject } = this.state;
        // this.props.dispatch(  );
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( ForgetPWD );