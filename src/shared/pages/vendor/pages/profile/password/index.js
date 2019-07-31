import React from 'react';

// Javascript
import { PWD } from '../../../../../public/javascripts/checkFormat';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            formObject: {
                oldPWD: "",
                newPWD: "",
                confirmPWD: ""
            },
            msg: ""
        }
    }

    render(){

        const { formObject, msg } = this.state;

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
        const { formObject } = this.state;
        const checkFormat = PWD({password: formObject['newPWD'], confirm: formObject['confirmPWD'] });
        if( status ){
            // 檢查OK
        }else{
            // 錯誤
            this.setState({
                msg: checkFormat['msg']
            })
        }
    }
}