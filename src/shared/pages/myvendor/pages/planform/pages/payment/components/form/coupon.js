// 優惠券 ＆ 折扣碼
import React from 'react';
import queryString from 'query-string';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux';

// Modules
import Loading from '../../../../../../../../module/loading';

// Actions
import { ordersCoupon } from '../../../../../../../../actions/payment';

// Lang
import lang from '../../../../../../../../public/lang/lang.json';

class Coupon extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            msg : [],
            formObject: {
                couponCode      : "",
                discountAmount  : 0,
                discountUnit    : null,
                couponStatus    : null,
                activeTimeMs    : 0,
                expireTimeMs    : 0
            }
        }
    }

    render(){

        const { loading, msg, formObject } = this.state;

        return(
            <ul className="card-form-list">
                <li>
                    <label>代碼</label>
                    <div className="input-box">
                        <input type="text" name="couponCode" value={formObject['couponCode']} onChange={this.handleChange.bind(this)} />
                        <button type="submit" className="coupon" onClick={this.handleSubmit.bind(this)}>查詢</button>
                    </div>
                </li>
                {
                    msg.length!=0 &&
                        <li className="msg">{msg}</li>
                }
                {
                    formObject['couponStatus']!=null &&
                        <React.Fragment>
                            <li>
                                <label>使用狀態</label>
                                <div><span className={`conpon-${formObject['couponStatus']}`}>{lang['zh-TW']['couponStatus'][formObject['couponStatus']]}</span></div>
                            </li>
                            <li>
                                <label>折價金額</label>
                                <div><CurrencyFormat value={formObject['discountAmount']} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                            </li>
                        </React.Fragment>
                }
                <Loading loading={loading} />
            </ul>
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
        const { formObject } = this.state;
        const { location }   = this.props;
        const { pathname, search } = location;
        
        if( formObject['couponCode']!='' ){
            this.setState({
                loading: true
            },()=>{
                this.props.dispatch( ordersCoupon(pathname,{...queryString.parse(search), ...formObject}) ).then( res => {
                    this.setState({
                        loading: false
                    },()=>{
                        switch( res['status'] ){
                            case 200:
                                const { couponInfo } = res['data'];
                                this.setState({
                                    formObject: {
                                        ...this.state.formObject,
                                        discountAmount : couponInfo['discountAmount'],
                                        discountUnit   : couponInfo['discountUnit'],
                                        couponStatus   : couponInfo['couponStatus'],
                                        couponCode     : couponInfo['couponCode'],
                                        activeTimeMs   : couponInfo['activeTimeMs'],
                                        expireTimeMs   : couponInfo['expireTimeMs'],
                                        msg            : []
                                    }
                                },()=>{
                                    const { formObject } = this.state;
                                    this.props.returnHandleChange(formObject);
                                })
                                break;

                            default:
                                this.setState({
                                    formObject: {
                                        ...this.state.formObject,
                                        discountAmount : 0,
                                        discountUnit   : null,
                                        couponStatus   : null,
                                        couponCode     : "",
                                        activeTimeMs   : 0,
                                        expireTimeMs   : 0
                                    },
                                    msg: [<div key="err" className="items">抱歉！您所使用的折扣碼不存在</div>]
                                },()=>{
                                    const { formObject } = this.state;
                                    this.props.returnHandleChange(formObject);
                                })
                                break;
                        }
                    });
                });
            })
        }
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Coupon );