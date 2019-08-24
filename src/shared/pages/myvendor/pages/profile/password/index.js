import React from 'react';
import { connect } from 'react-redux';

// Modules
import Confirm from '../../../../../module/confirm';

// Actions
import { resetPassword } from '../../../../../actions/login';

// Javascript
import { PWD } from '../../../../../public/javascripts/checkFormat';

// Lang
import lang from '../../../../../public/lang/lang.json';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            method: 'confirm',
            popupMsg: "",
            formObject: {
                oldPWD: "",
                newPWD: "",
                confirmPWD: ""
            },
            msg: ""
        }
    }

    render(){

        const { 
            open,
            method,
            popupMsg,
            formObject, 
            msg 
        } = this.state;

        console.log( open, method, popupMsg );

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <ul className="table-row-list">
                            <li>
                                <label>舊密碼</label>
                                <div className="">
                                    <div className="input-box">
                                        <input type="password" name="oldPWD" value={formObject['oldPWD']} onChange={this.handleChange.bind(this)} placeholder=""/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label>新密碼</label>
                                <div className="">
                                    <div className="input-box">
                                        <input type="password" name="newPWD" value={formObject['newPWD']} onChange={this.handleChange.bind(this)} placeholder=""/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label>再次確認密碼</label>
                                <div className="">
                                    <div className="input-box">
                                        <input type="password" name="confirmPWD" value={formObject['confirmPWD']} onChange={this.handleChange.bind(this)} placeholder=""/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        {
                            msg!='' &&
                                <div className="form-msg">{msg}</div>
                        }
                        <ul className="action-ul">
                            <li><button className="basic">更新</button></li>
                        </ul>
                    </form>
                </section>
                <Confirm 
                    open={open}
                    method={method}
                    container={popupMsg}
                    onCancel={this.handleCancel.bind(this)}
                    onConfirm={this.handleConfirm.bind(this)}
                />
            </React.Fragment>
        );
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const formObject = { ...this.state.formObject, [name]: value };
        this.setState({
            formObject
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            open: true,
            popupMsg: lang['zh-TW']['Are you sure you want to change your password']
        })
    }

    handleCancel = () => {
        this.setState({
            open: false,
            method: 'confirm',
            popupMsg: "",
            formObject: {
                oldPWD: "",
                newPWD: "",
                confirmPWD: ""
            }
        })
    }

    handleConfirm = () => {
        const { formObject,method } = this.state;
        const checkFormat = PWD({password: formObject['newPWD'], confirm: formObject['confirmPWD'] });
        if( method!='alert' ){
            if( !checkFormat['status'] ){
                // 錯誤
                this.setState({
                    msg: lang['zh-TW']['note'][checkFormat['msg']]
                })
            }else{
                // 檢查OK
                this.props.dispatch( resetPassword('vendor',formObject) ).then( res => {
                    if( res['status']==200 ){
                        this.setState({
                            method: 'alert',
                            popupMsg: lang['zh-TW']['reset password success']
                        })
                    }else{
                        this.setState({
                            method: 'alert',
                            popupMsg: lang['zh-TW'][ res['response']['data']['status_text'] ]
                        })
                    }
                })
            }
        }else{
            this.handleCancel();
        }
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Index );