import React from "react";
import queryString from 'query-string';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faChevronCircleRight}from '@fortawesome/free-solid-svg-icons';

// Components
import Product from './components/product';

// Modules
import Loading from '../../../../../module/loading/mallLoading';

// Actions
import { ordersInfo } from '../../../../../actions/myaccount';

// Lang
import lang from '../../../../../public/lang/lang.json';

class Atm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            ...props,
            loading: false,
            info: {}
        }
    }

    render(){

        const { loading, info } = this.state;

        if( Object.keys( info ).length!=0 ){
            return(
                <React.Fragment>
                    <section className="container-unit">
                        <div className="unit-head">
                            <h3>付款明細</h3>
                        </div>
                        <ul className="card-form-list">
                            <li>
                                <label>付款狀態</label>
                                <div>{ lang['zh-TW']['orderStatus'][info['orderStatus']] }</div>
                            </li>
                            <li>
                                <label>付款方式</label>
                                <div>{info['payMethod']}</div>
                            </li>
                            <li>
                                <label>銀行代號</label>
                                <div>{info['payAdditionalInfo']['BankCode']}</div>
                            </li>
                            <li>
                                <label>匯款帳號</label>
                                <div>{info['payAdditionalInfo']['VaccNo']}</div>
                            </li>
                        </ul>
                    </section>

                    <section className="container-unit">
                        <div className="unit-head">
                            <h3>訂購人 / 收件人資訊</h3>
                        </div>
                        <div className="container-unit-row" data-flexwrap="wrap">
                            <div className="container-unit-row" data-flexwrap="wrap">
                                <div className="container-unit-head">
                                    <h4><FontAwesomeIcon icon={faChevronCircleRight}/>訂購人</h4>
                                </div>
                                <ul className="card-form-list">
                                    <li>
                                        <label htmlFor="name2">姓名</label>
                                        <div>{info['orderName']}</div>
                                    </li>
                                    <li>
                                        <label htmlFor="name2">電話</label>
                                        <div>{info['orderPhone']}</div>
                                    </li>
                                    <li>
                                        <label htmlFor="name2">信箱</label>
                                        <div>{info['orderEmail']}</div>
                                    </li>
                                </ul>
                            </div> 
                            <div className="container-unit-row" data-flexwrap="wrap">
                                <div className="container-unit-head">
                                    <h4><FontAwesomeIcon icon={faChevronCircleRight}/>收件人</h4>
                                </div>
                                <ul className="card-form-list">
                                    <li>
                                        <label htmlFor="name2">姓名</label>
                                        <div>{info['deliveryName']}</div>
                                    </li>
                                    <li>
                                        <label htmlFor="name2">電話</label>
                                        <div>{info['deliveryPhone']}</div>
                                    </li>
                                    <li>
                                        <label htmlFor="name2">信箱</label>
                                        <div>{info['deliveryEmail']}</div>
                                    </li>
                                    <li>
                                        <label htmlFor="name2">地址</label>
                                        <div>{`${info['deliveryZipCode']} ${info['deliveryCity']}${info['deliveryDist']}${info['deliveryAddress']}`}</div>
                                    </li>
                                </ul>
                            </div> 
                        </div>
                    </section>

                    <section className="container-unit">
                        <div className="unit-head">
                            <h3>購買商品</h3>
                        </div>
                        <Product 
                            data= {info['orderDetail']}
                            cartTotalAmount= {info['amount']}
                        />
                    </section>
                </React.Fragment>
            );
        }else{
            return (
                <React.Fragment>
                    <Loading loading={loading} />
                </React.Fragment>
            );
        }
    }

    componentDidMount() {
        const { match, location } = this.props;
        const { pathname, search } = location;
        this.setState({
            loading: true,
        },()=>{
            this.props.dispatch( ordersInfo(pathname,queryString.parse(search)) ).then( res => {
                if( !res.hasOwnProperty('response') ){
                    this.setState({
                        loading: false,
                        info: res
                    })
                }
            });
        })
    }
    
}

const mapStateToProps = state =>{
    return{

    }
}

export default connect( mapStateToProps )( Atm );