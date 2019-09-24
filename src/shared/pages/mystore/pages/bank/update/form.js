import React from 'react';
import toaster from 'toasted-notes';
import CurrencyFormat from 'react-currency-format';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Actions
import { mystoreBankInfoUpdate } from '../../../../../actions/mystore';

// Javascripts
import { checkRequired } from '../../../../../public/javascripts/checkFormat';

// Lang
import lang from '../../../../../public/lang/lang.json';

class Form extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            required: ['bankAccountName','SocialID','bankName','bankCode','bankBranch','bankAccount'],
            msg: [],
            formObject: {
                bankAccountName: props.data['bankAccountName'] || "",
                socialID: props.data['socialID'] || "",
                bankName: props.data['bankName'] || "",
                bankCode: props.data['bankCode'] || "",
                bankBranch: props.data['bankBranch'] || "",
                bankAccount: props.data['bankAccount'] || "",
                companyName: props.data['companyName'] || "",
                companyUniNum: props.data['companyUniNum'] || ""
            }
        }
    }

    render(){

        const { msg, formObject } = this.state;

        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
                <ul className="table-row-list">
                    <li>
                        <label>＊帳戶名稱</label>
                        <div className="input-box">
                            <input type="text" name="bankAccountName" value={formObject['bankAccountName']} onChange={this.handleChange.bind(this)} />
                        </div>
                    </li>
                    <li>
                        <label>＊身分證字號</label>
                        <div className="input-box">
                            <input type="text" name="socialID" value={formObject['socialID']} onChange={this.handleChange.bind(this)} />
                        </div>
                    </li>
                    <li>
                        <label>＊銀行名稱</label>
                        <div className="input-box">
                            <input type="text" name="bankName" value={formObject['bankName']} onChange={this.handleChange.bind(this)} />
                        </div>
                    </li>
                    <li>
                        <label>＊銀行代號</label>
                        <div className="input-box">
                            <CurrencyFormat value={formObject['bankCode']}  format="#####" onValueChange={(values) => {
                                this.setState({
                                    formObject: {
                                        ...this.state.formObject,
                                        "bankCode": values['value']
                                    }
                                })
                            }}/>
                        </div>
                    </li>
                    <li>
                        <label>＊分行名稱</label>
                        <div className="input-box">
                            <input type="text" name="bankBranch" value={formObject['bankBranch']} onChange={this.handleChange.bind(this)} />
                        </div>
                    </li>
                    <li>
                        <label>＊帳號</label>
                        <div className="input-box">
                            <CurrencyFormat value={formObject['bankAccount']} onValueChange={(values) => {
                                this.setState({
                                    formObject: {
                                        ...this.state.formObject,
                                        "bankAccount": values['value']
                                    }
                                })
                            }}/>
                        </div>
                    </li>
                    <li>
                        <label>公司名稱</label>
                        <div className="input-box">
                            <input type="text" name="companyName" value={formObject['companyName']} onChange={this.handleChange.bind(this)} />
                        </div>
                    </li>
                    <li>
                        <label>公司統編</label>
                        <div className="input-box">
                            <CurrencyFormat value={formObject['companyUniNum']} format="########" onValueChange={(values) => {
                                this.setState({
                                    formObject: {
                                        ...this.state.formObject,
                                        "companyUniNum": values['value']
                                    }
                                })
                            }}/>
                        </div>
                    </li>
                </ul>
                {
                    msg.length!=0 &&
                        <div className="form-msg">{msg}</div>
                }
                <ul className="action-ul">
                    <li><button type="button" className="cancel" onClick={this.props.returnCancel.bind(this)}>取消</button></li>
                    <li><button className="basic">更新</button></li>
                </ul>
            </form>
        );
    }

    handleChange = (e) => {
        const { formObject } = this.state;
        const { name, value} = e.target;
        this.setState({
            formObject: {
                ...formObject,
                [name]: value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { location, history, match } = this.props;
        const { required, formObject } = this.state;
        const { pathname, search } = location;
        const checkRequiredFilter = checkRequired( required,formObject );

        if( checkRequiredFilter.length==0 ){
            // 填寫完整
            this.props.dispatch( mystoreBankInfoUpdate(pathname,{...queryString.parse(search)},formObject) ).then( res => {
                let msg = "";
                switch( res['status'] ){
                    case 200:
                        this.props.returnCancel(this);
                        msg = <div className={`toaster-status success`}>{lang['zh-TW']['toaster']['updateSuccess']}</div>;
                        break;

                    default:
                        msg = <div className={`toaster-status failure`}>{lang['zh-TW']['toaster']['updateFailure']}</div>;
                        break;
                }

                toaster.notify( msg ,{
                    position: 'bottom-right',
                    duration: 3000
                })
            });
        }else{
            // 未填寫完整
            this.setState({
                msg: checkRequiredFilter
            });
        }
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Form );