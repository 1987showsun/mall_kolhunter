import React from 'react';
import { connect } from 'react-redux';

// Modules
import Confirm from '../../../../../module/confirm';

// Actions
import { updatePWD } from '../../../../../actions/myaccount';

// Javascripts
import { PWD } from '../../../../../public/javascripts/checkFormat';

// Lang
import lang from '../../../../../public/lang/lang.json';

class FormPWD extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            popupMSG: "",
            method: 'confirm',
            msg: "",
            formObject: {
                oldpwd: "",
                newpwd: "",
                chkpwd: ""
            }
        }
    }

    render(){

        const { open, popupMSG, method, msg, formObject } = this.state;

        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
                <ul className="table-row-list">
                    <li>
                        <label htmlFor="">＊舊密碼</label>
                        <div>
                            <div className="input-box">
                                <input type="password" name="oldpwd" value={formObject['oldpwd']} onChange={this.handleChange.bind(this)} />
                            </div>
                        </div>
                    </li>
                    <li>
                        <label htmlFor="">＊新密碼</label>
                        <div>
                            <div className="input-box">
                                <input type="password" name="newpwd" value={formObject['newpwd']} onChange={this.handleChange.bind(this)} />
                            </div>
                        </div>
                    </li>
                    <li>
                        <label htmlFor="">＊再次確認</label>
                        <div>
                            <div className="input-box">
                                <input type="password" name="chkpwd" value={formObject['chkpwd']} onChange={this.handleChange.bind(this)} />
                            </div>
                        </div>
                    </li>
                    {
                        msg!="" &&
                            <li className="msg">{msg}</li>
                    }
                </ul>
                <ul className="action-ul">
                    <li><button type="button" className="cancel" onClick={this.props.returnCancel.bind(this)}>取消</button></li>
                    <li><button className="basic">更新</button></li>
                </ul>

                <Confirm
                    open= {open}
                    method= {method}
                    container= {popupMSG}
                    onCancel={this.onCancel.bind(this)}
                    onConfirm= {this.handleConfirm.bind(this)}
                />
            </form>
        );
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            formObject: { ...this.state.formObject, [name]: value }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            open: true,
            popupMSG: "您確定要更新密碼嗎？"
        })
    }

    onCancel = () => {
        this.props.returnCancel('cancel');
    }

    handleConfirm = () => {
        const { formObject } = this.state;
        const checkPWDFormat = PWD({ password: formObject['newpwd'] , confirm: formObject['chkpwd'] });
        if( checkPWDFormat['status'] ){
            // 密碼規則驗證成功
            this.props.dispatch( updatePWD(formObject) ).then( res => {
                switch( res['status'] ){
                    case 200:
                        // 更新成功
                        this.setState({
                            open: false,
                            popupMSG: ""
                        },()=>{
                            // 回傳至上一層 Components 關閉更新表單
                            this.props.returnCancel('success');
                        })
                        break;

                    default:
                        // 錯誤失敗
                        const status_text = res['data']['status_text'];
                        this.setState({
                            open: false,
                            popupMSG: "",
                            msg: lang['zh-TW']['note'][status_text],
                        })
                        break;
                }
            });
        }else{
            // 密碼規則驗證錯誤
            this.setState({
                msg: lang['zh-TW']['note'][checkPWDFormat['msg']]
            })
        }
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( FormPWD );