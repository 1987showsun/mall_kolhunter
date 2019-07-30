import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { signout } from '../../../actions/login';

// Stylesheets
import './style.scss';

class Nav extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            type: props.type,
            clearSessionStorageKey: ['jwt_account']
        }
    }

    static getDerivedStateFromProps(props, state){
        if( props.type!=state.type ){
            return{
                type: props.type
            }
        }
        return null;
    }

    render(){
        
        const { type } = this.state;

        return(
            <section className="container-col account-nav-wrap">
                <article className="account-nav-wrap-row">
                    <ul className="account-nav-ul">
                        <li className="account-nav-header">一般</li>
                        <li className={`${type=="infoSetting"}`}><Link to="/myaccount">基本設定</Link></li>
                        <li className={`${type=="carts"}`}><Link to="/myaccount/carts">我的購物車</Link></li>
                        <li className={`${type=="orders"}`}><Link to="/myaccount/orders">訂單查詢 / 退貨</Link></li>
                        <li ><button onClick={this.signout.bind(this)}>登出</button></li>
                    </ul>
                </article>
                <article className="account-nav-wrap-row">
                    <ul className="account-nav-ul">
                        <li className="account-nav-header">網紅專區</li>
                        <li className={`${type=="product"}`}><Link to="/myaccount/product">全部商品</Link></li>
                        <li className={`${type=="mystore"}`}><Link to="/myaccount/mystore">我的店舖</Link></li>
                        <li className={`${type=="fansorders"}`}><Link to="/myaccount/fansorders">粉絲訂單</Link></li>
                        <li className={`${type=="account"}`}><Link to="/myaccount/account">帳戶資料</Link></li>
                    </ul>
                </article>
            </section>
        );
    }

    signout = () => {
        const { clearSessionStorageKey } = this.state;
        this.props.dispatch( signout(clearSessionStorageKey) );
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Nav );