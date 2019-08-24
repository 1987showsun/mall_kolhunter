import React from 'react';
import { connect } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

// Jsons
import area_code from '../../../../../public/json/TWareacode.json';
import county_area from '../../../../../public/json/TWzipcode.json';

// Lang
import lang from '../../../../../public/lang/lang.json';

const city = Object.keys(county_area)[0];
const district = Object.keys(county_area[city])[0];

class Info extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            required: ['name','tel_code','tel','phone'],
            accountInfo: props.accountInfo,
            formObject: {
                ...props.accountInfo,
                image: props.accountInfo['image'] || '',
                name: props.accountInfo['name'] || '',
                nickname: props.accountInfo['nickname'] || '',
                gender: props.accountInfo['gender'] || 'male',
                birthday: props.accountInfo['birthday'] || '',
                tel_code: props.accountInfo['tel_code'] || '02',
                tel: props.accountInfo['tel'] || '',
                phone: props.accountInfo['phone'] || '',
                email: props.accountInfo['email'] || '',
                zipcode: props.accountInfo['zipcode'] || '',
                city: city || '',
                district: district || '',
                address: props.accountInfo['address'] || ''
            },
            msg: []
        }
    }

    static getDerivedStateFromProps( props,state ){
        if( props.accountInfo!=state.accountInfo ){
            return {
                accountInfo: props.accountInfo,
                formObject : {
                    ...props.accountInfo,
                    image: props.accountInfo['image'] || '',
                    name: props.accountInfo['name'] || '',
                    nickname: props.accountInfo['nickname'] || '',
                    gender: props.accountInfo['gender'] || 'male',
                    birthday: props.accountInfo['birthday'] || '',
                    tel_code: props.accountInfo['tel_code'] || '02',
                    tel: props.accountInfo['tel'] || '',
                    phone: props.accountInfo['phone'] || '',
                    email: props.accountInfo['email'] || '',
                    zipcode: props.accountInfo['zipcode'] || '',
                    city: city || '',
                    district: district || '',
                    address: props.accountInfo['address'] || ''
                }
            }            
        }
        return null;
    }

    render(){

        const { 
            formObject, 
            msg 
        } = this.state;
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
                        <label htmlFor="">＊信箱(帳號)</label>
                        <div>
                            <div className="input-box">
                                <input type="text" name="email" value={formObject['email']} onChange={this.handleChange.bind(this)} />
                            </div>
                        </div>
                    </li>
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
                                <CurrencyFormat format="####/##/##" value={formObject['birthday']} placeholder="YYYY/MM/DD" mask={['Y','Y','Y','Y','M', 'M', 'D', 'D']}  onValueChange={ value => this.returnBirthday(value['value'],'birthday')}/>
                            </div>
                        </div>
                    </li>
                    {/* <li>
                        <label htmlFor="">聯絡電話</label>
                        <div>
                            <div className="input-box select">
                                <select name="tel_code" onChange={ this.handleChange.bind(this) }>
                                    {
                                        area_code.map( (item,i) => {
                                            return(
                                                <option key={item['code']} value={item['code']}>{item['code']}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div> 
                            <div className="input-box">
                                <CurrencyFormat value={formObject['tel']} format={areaCodeFormat} mask="_" onValueChange={ value => this.returnTel(value['value'],'tel')}/>
                            </div>
                        </div>
                    </li> */}
                    <li>
                        <label htmlFor="">＊手機號碼</label>
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
                                <select name="district" value={formObject['district'] || ""} onChange={ this.handleChange.bind(this) }>
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
        let formObject = { ...this.state.formObject, [name]: value };
        this.setState({
            formObject
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Info );