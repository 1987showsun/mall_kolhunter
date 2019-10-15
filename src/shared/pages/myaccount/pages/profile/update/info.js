import React from 'react';
import dayjs from 'dayjs';
import toaster from 'toasted-notes';
import queryString from 'query-string';
import { connect } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

// Actions
import { ainfoUpdate } from '../../../../../actions/myaccount';

// Javascripts
import { checkRequired } from '../../../../../public/javascripts/checkFormat';

// Jsons
import area_code from '../../../../../public/json/TWareacode.json';
import county_area from '../../../../../public/json/TWzipcode.json';

// Lang
import lang from '../../../../../public/lang/lang.json';

const city    = Object.keys(county_area)[0];
const dist    = Object.keys(county_area[city])[0];
const zipCode = county_area[city][dist];

class Info extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            required: ['name','nickname','phone'],
            accountInfo: {},
            formObject: {
                photo      : '',
                name       : '',
                nickname   : '',
                gender     : 'male',
                birthday   : '',
                phone      : '',
                zipCode    : zipCode,
                city       : city,
                dist       : dist,
                address    : '',
                company    : ''
            },
            msg: []
        }
    }

    static getDerivedStateFromProps( props,state ){

        let accountInfo = state.accountInfo;
        let formObject  = state.formObject;
        if( accountInfo!=undefined && Object.keys(accountInfo).length==0 ){
            accountInfo = { ...props.accountInfo };
            formObject  = {
                ...formObject,
                photo      : props.accountInfo['photo']    || '',
                name       : props.accountInfo['name']     || '',
                nickname   : props.accountInfo['nickname'] || '',
                gender     : props.accountInfo['gender']   || 'male',
                birthday   : dayjs(props.accountInfo['birthday']).format('YYYY/MM/DD') || '',
                phone      : props.accountInfo['phone']    || '',
                zipCode    : props.accountInfo['zipCode']  || zipCode,
                city       : props.accountInfo['city']     || city,
                dist       : props.accountInfo['dist']     || dist,
                address    : props.accountInfo['address']  || '',
                company    : props.accountInfo['company']  || ''
            }
        }

        return {
            accountInfo,
            formObject
        }
    }

    render(){

        const { msg ,formObject } = this.state;
        const areaCode = formObject['tel_code'];
        let areaCodeFormat = "";
        area_code.map( item => {
            if( item['code']==areaCode ){
                areaCodeFormat = item['format'];
            }
        });

        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
                <ul className="table-row-list">
                    <li>
                        <label htmlFor="">＊會員姓名</label>
                        <div>
                            <div className="input-box">
                                <input type="text" name="name" value={formObject['name']} onChange={this.handleChange.bind(this)} />
                            </div>
                        </div>
                    </li>
                    <li>
                        <label htmlFor="">暱稱</label>
                        <div>
                            <div className="input-box">
                                <input type="text" name="nickname" value={formObject['nickname']} onChange={this.handleChange.bind(this)} />
                            </div>
                        </div>
                    </li>
                    <li>
                        <label htmlFor="">性別</label>
                        <div>
                            <label htmlFor="male" className="radio">
                                <input type="radio" id="male" name="gender" value="male" onChange={this.handleChange.bind(this)} checked={ formObject['gender']=='male' }/>
                                <div className="box"></div>
                                男性
                            </label>
                            <label htmlFor="female" className="radio">
                                <input type="radio" id="female" name="gender" value="female" onChange={this.handleChange.bind(this)} checked={ formObject['gender']=='female' }/>
                                <div className="box"></div>
                                女性
                            </label>
                        </div>
                    </li>
                    <li>
                        <label htmlFor="">生日</label>
                        <div>
                            <div className="input-box">
                                <CurrencyFormat format="####/##/##" value={formObject['birthday']} placeholder="YYYY/MM/DD" mask={['Y','Y','Y','Y','M', 'M', 'D', 'D']}  onValueChange={ value => this.returnBirthday(value['formattedValue'],'birthday')}/>
                            </div>
                        </div>
                    </li>
                    <li>
                        <label htmlFor="">＊聯絡電話</label>
                        <div>
                            <div className="input-box">
                                <CurrencyFormat value={formObject['phone']} format="####-######" onValueChange={ value => this.returnTel(value['value'],'phone')}/>
                            </div>
                        </div>
                    </li>
                    <li>
                        <label htmlFor="">＊地址</label>
                        <div>
                            <div className="input-box select">
                                <select name="city" value={formObject['city'] || ""} onChange={ this.handleChange.bind(this) }>
                                    <option value="">請選擇縣市</option>
                                    {
                                        Object.keys(county_area).map( item => {
                                            return(
                                                <option key={`city_${item}`} value={item} >{item}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="input-box select">
                                <select name="dist" value={formObject['dist'] || ""} onChange={ this.handleChange.bind(this) }>
                                    <option value="">請選擇鄉鎮市區</option>
                                    {
                                        formObject['city']!=undefined && formObject['city']!=""? (
                                            Object.keys(county_area[formObject['city']]).map( (item) => {
                                                return(
                                                    <option key={`${item}`} value={item} data-zipcode={county_area[formObject['city']][item]} >{item}</option>
                                                )
                                            })
                                        ):(
                                            null
                                        )
                                    }
                                </select>
                            </div>
                            <div className="input-box">
                                <input type="text" name="address" value={ formObject['address'] || "" } onChange={ this.handleChange.bind(this) } placeholder=""/>
                            </div>
                        </div>
                    </li>
                </ul>
                {
                    msg.length!=0 &&
                        <div className="form-msg">{ msg }</div>
                }
                <ul className="action-ul">
                    <li><button type="button" className="cancel" onClick={this.props.returnCancel.bind(this)}>取消</button></li>
                    <li><button className="basic">更新</button></li>
                </ul>
            </form>
        );
    }

    returnTel = ( value,name ) => {
        let formObject = { ...this.state.formObject, [name]: value };
        this.setState({
            formObject
        })
    }

    returnBirthday = ( value,name ) => {
        let formObject = { ...this.state.formObject, [name]: value };
        this.setState({
            formObject
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        let formObject = { ...this.state.formObject };
        let city       = '';
        let dist       = '';
        let zipCode    = '';

        switch( name ){
            case 'city':
                dist    = Object.keys(county_area[value])[0];
                zipCode = county_area[value][dist];
                formObject = { ...formObject, [name]: value, dist: dist, zipCode: zipCode };
                break;

            case 'dist':
                city    = formObject['city'];
                zipCode = county_area[city][value];
                formObject = { ...formObject, [name]: value, zipCode: zipCode };
                break;

            default:
                formObject = { ...formObject, [name]: value };
                break;
        }
        
        this.setState({
            formObject
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { location } = this.props;
        const { formObject, required } = this.state;
        const { pathname, search } = location;
        const checkRequiredFilter = checkRequired( required,formObject );

        if(checkRequiredFilter.length==0 ){
            const data = {
                ...formObject,
                birthday: dayjs(formObject['birthday']).valueOf()
            }
            this.props.dispatch( ainfoUpdate(pathname,{...queryString.parse(search)},data) ).then( res => {
                switch( res['status'] ){
                    case 200:
                        toaster.notify( <div className={`toaster-status success`}>{lang['zh-TW']['toaster']['updateSuccess']}</div> ,{
                            position: 'bottom-right',
                            duration: 3000
                        })
                        this.props.returnCancel(data);
                        break;

                    default:
                        toaster.notify( <div className={`toaster-status failure`}>{lang['zh-TW']['toaster']['updateFailure']}</div> ,{
                            position: 'bottom-right',
                            duration: 3000
                        })
                        break;
                }
            });
            // 填寫完整
        }else{
            this.setState({
                msg: checkRequiredFilter
            })
            // 未填寫完整
        }
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Info );