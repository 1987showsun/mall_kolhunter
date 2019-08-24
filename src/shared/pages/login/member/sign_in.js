import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faCheck }from '@fortawesome/free-solid-svg-icons';

// Actions
import { signin } from '../../../actions/login';

// Json
import lang from '../../../public/lang/lang.json';

class SignIn extends React.Component{

    constructor(props){
        super(props);

        let userID="";
        let userPWD="";
        let record=false;
        if (typeof window !== 'undefined') {
            const filterAfter = Object.entries(localStorage).filter( filterItem => {
                return filterItem.includes(`accountLoginRecord`);
            })
            if( filterAfter.length!=0 ){
                userID = JSON.parse(filterAfter[0][1])['userID'];
                userPWD = JSON.parse(filterAfter[0][1])['userPWD'];
            }
            record = Boolean(localStorage.getItem('accountRecordStatus')) || false;
        }

        this.state = {
            form : {
                type: 'account',
                userID,
                userPWD,
            },
            msg : "",
            record
        }
    }

    render(){

        const { 
            form, 
            msg,
            record
        } = this.state;

        return(
            <React.Fragment>
                <form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <div className="form-title">
                        <h4>會員登入</h4>
                    </div>
                    <ul>
                        <li>
                            <label htmlFor="userID">
                                <div className="input-box">
                                    <input type="email" name="userID" id="userID" value={ form['userID'] } onChange={this.handleChange.bind(this)} placeholder="E-mail 會員帳號"/>
                                </div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="userPWD">
                                <div className="input-box">
                                    <input type="password" name="userPWD" id="userPWD" value={ form['userPWD'] } onChange={this.handleChange.bind(this)} placeholder="密碼"/>
                                </div>
                            </label>
                        </li>
                    </ul>
                    <div className="form-row">
                        <div className="form-row-col">
                            <label htmlFor="record" className="checkbox-label">
                                <input type="checkbox" id="record" name="record" className="admin-checkbox" onChange={this.handleChangeRecord.bind(this)} checked={record}/>
                                <i className="checkbox_icon">
                                    <FontAwesomeIcon icon={faCheck} />
                                </i>
                            </label>
                            <div className="form-row-col-label">記住帳號密碼</div>
                        </div>
                    </div>
                    {
                        msg!='' &&
                            <div className="form-row msg" data-content="center" dangerouslySetInnerHTML={{__html: msg}}></div>
                    }
                    <div className="form-row">
                        <button type="submit">送出</button>
                    </div>
                    <div className="form-row" data-direction="column">
                        <div className="sub-title">
                            <span className="text">kolhunter 的新客户？</span>
                        </div>
                        <Link to="/account/signup" className="signup_link">立即註冊</Link>
                    </div>
                </form>
            </React.Fragment>
        );
    }

    componentDidMount() {
    }

    handleChangeRecord = (e) => {
        // 記住帳號密碼
        const name = e.target.name;
        const checked = e.target.checked;
        this.setState({
            [name]: checked
        },()=>{
            const {form} = this.state;
            const type = form['type'];
            if( this.state[name] ){
                localStorage.setItem( `${type}LoginRecord` , JSON.stringify(form) );
                localStorage.setItem( `${type}RecordStatus` , checked );
            }else{
                localStorage.removeItem( `${type}LoginRecord` );
                localStorage.removeItem( `${type}RecordStatus` );
            }
        })
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
        let msg = "";
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
                // 完整
                this.props.dispatch(signin(form)).then( res => {
                    switch( res['status'] ){
                        case 403:
                            this.setState({
                                msg: lang['zh-TW']['err'][ res['data']['status_text'] ]
                            })
                            break;
                    }
                });
            }else{
                // 顯示必填欄位
                checkRequired.map( key => {
                    msg = `${lang['zh-TW']['note'][key+' required']}<br/>${msg}`
                })
                this.setState({
                    msg
                })
            }
        })
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( SignIn );