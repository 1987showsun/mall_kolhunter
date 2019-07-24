import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Components
import Confirm from '../../../module/confirm';

//Actions
import { verify } from '../../../actions/login';
import { getVerifyToke } from '../../../actions/vendor';

//Javascripts
import { PWD } from '../../../public/javascripts/checkFormat';

// Lang
import lang from '../../../lang/lang.json';

class Verify extends React.Component{

    constructor(props){
        super(props);
        const code = queryString.parse(props.location['search'])['code'] || null;
        const email= queryString.parse(props.location['search'])['mail'] || null;
        this.state = {
            open: false,
            success: false,
            request: {
                code: code,
                email: email
            },
            form : {
                password: '',
                confirm: ''
            },
            msg : ""
        }
    }

    render(){
        const { form, msg, open } = this.state;

        return(
            <React.Fragment>
                <form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className="form-title">
                        <h4>供應商密碼修改</h4>
                    </div>
                    <ul>
                        <li>
                            <label htmlFor="password">
                                <div className="input-box">
                                    <input type="password" name="password" id="password" value={ form['password'] } onChange={this.handleChange.bind(this)} placeholder="* 密碼設定" autoComplete="off" />
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="confirm">
                                <div className="input-box">
                                    <input type="password" name="confirm" id="confirm" value={ form['confirm'] } onChange={this.handleChange.bind(this)} placeholder="* 再次確認密碼" autoComplete="off" />
                                </div>
                            </label>
                        </li>
                    </ul>
                    {
                        msg!='' &&
                            <div className="form-row msg" data-content="center" dangerouslySetInnerHTML={{__html: msg}}></div>
                    }
                    <div className="form-row form-p" data-content="center">
                        <button type="submit">送出</button>
                    </div>
                </form>
                <Confirm
                    open={open}
                    method='alert'
                    header='申請成功'
                    container='感謝您的申請，我們將去儘速審核寄發認證信件'
                    onConfirm={this.handleConfirm.bind(this)}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { request } = this.state;
        this.props.dispatch( getVerifyToke(request) )
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
        let checkRequired = Object.keys(form).filter( key => {
            return form[key]=='';
        })
        
        this.setState({
            msg
        },()=>{

            let returnCheck = PWD( form );

            if( checkRequired.length==0 ){
                if( returnCheck['status'] ){
                    this.props.dispatch( verify(form) );
                    this.setState({
                        open: true
                    })
                }else{
                    this.setState({
                        msg: returnCheck['msg']
                    })
                }
            }else{
                checkRequired.map( key => {
                    msg = `${lang['zh-TW']['note'][key+' required']}<br/>${msg}`;
                })
                this.setState({
                    msg
                })
            }
        })
    }

    handleConfirm = ( val ) => {
        this.setState({
            open: false,
            success: val
        },()=>{
            this.props.history.push('/vendor');
        })
    }
}

const mapStateToProps = ( state ) => {
    return{

    }
}

export default connect(mapStateToProps)(Verify);