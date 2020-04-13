/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                  from 'react';
import { Link }               from 'react-router-dom';
import { connect }            from 'react-redux';
import { FontAwesomeIcon }    from '@fortawesome/react-fontawesome';
import { faUser, faStore, faUserPlus, faShoppingCart, faTruck }from '@fortawesome/free-solid-svg-icons';

//Compoents
import Search                 from './search';
import Top                    from './top';

// Actions
import { ainfo, cartsCount }  from '../../../actions/myaccount';
import { getCartID }          from '../../../actions/common';

// stylesheets
import './header.scss';

// Images
import Logo                   from '../../../public/images/logo.png';
import LogoMobile             from '../../../public/images/logo-mobile.png';

class Header extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading     : true,
            accountToken: props.accountToken,
            vendorToken : "",
            accountInfo : {},
            cartsCount  : 0
        }
    }

    static getDerivedStateFromProps(props, state){

        let cartsCount    = state.cartsCount;
        let accountInfo   = state.accountInfo;
        let accountToken  = state.accountToken;
        let vendorToken   = state.vendorToken;

        if( props.cartsCount!=cartsCount ){
            cartsCount  = props.cartsCount;
        }
        if( props.vendorToken!=vendorToken ){
            vendorToken = props.vendorToken;
        }
        if( props.accountInfo!=accountInfo ){
            accountInfo = props.accountInfo;
        }
        if( props.accountToken!=accountToken ){
            accountToken = props.accountToken;
        }

        return {
            accountToken  : accountToken,
            vendorToken   : vendorToken,
            accountInfo   : accountInfo,
            cartsCount    : cartsCount
        };
    }

    render(){

        const { loading, accountInfo, accountToken, vendorToken, cartsCount } = this.state;
        const { history, match, location } = this.props;
        const pathname = location['pathname'].split('/').filter( item => item!='' );
        const cartPathUrl   = accountToken!="" && accountToken!=undefined? '/myaccount/carts' :'/account?to=carts';
        const ordersPathUrl = accountToken!="" && accountToken!=undefined? '/myaccount/orders':'/account?to=orders';

        return(
            <header data-content="center">
                <section className="container">
                    <Top 
                        vendorToken= {vendorToken}
                    />
                    <div className="bottom">
                        <div className="logo-block">
                            <Link to="/">
                                <img className="normal" src={Logo} alt="" title="" />
                                <img className="mobile" src={LogoMobile} alt="" title="" />
                            </Link>
                        </div>
                        <Search 
                            match     = {match}
                            history   = {history}
                            location  = {location}
                        />
                        <div className="header-nav-block">
                            <ul>
                                {
                                    !loading? (
                                        accountToken!="" && accountToken!=null && accountToken!=undefined ? (
                                            <React.Fragment>
                                                <li>
                                                    <Link to="/myaccount">
                                                        {
                                                            accountInfo['photo']!=null?(
                                                                <span className="icon-block accountPhoto">
                                                                    <img src={accountInfo['photo']} alt={accountInfo['name']} title={accountInfo['name']} />
                                                                </span>
                                                            ):(
                                                                <span className="icon-block">
                                                                    <FontAwesomeIcon icon={faUser} />
                                                                </span>
                                                            )
                                                        }
                                                        <div className="prompt-block">{accountInfo['name']}</div>
                                                    </Link>
                                                </li>
                                                {
                                                    accountInfo['celebrity']==1 &&
                                                        <li className={`${pathname[0]=='mystore'}`}>
                                                            <Link to={`/mystore/store/${accountInfo["storeToken"]}`}>
                                                                <span className="icon-block">
                                                                    <FontAwesomeIcon icon={faStore} />
                                                                </span>
                                                                <div className="prompt-block">店舖管理</div>
                                                            </Link>
                                                        </li>
                                                }
                                            </React.Fragment>
                                        ):(
                                            <React.Fragment>
                                                <li>
                                                    <Link to="/account?back=true">
                                                        <span className="icon-block">
                                                            <FontAwesomeIcon icon={faUser} />
                                                        </span>
                                                        <div className="prompt-block">會員登入</div>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/account/signup">
                                                        <span className="icon-block">
                                                            <FontAwesomeIcon icon={faUserPlus} />
                                                        </span>
                                                        <div className="prompt-block">加入會員</div>
                                                    </Link>
                                                </li>
                                            </React.Fragment>
                                        )
                                    ):(
                                        null
                                    )
                                }
                                <li className={`${pathname[1]=='carts'}`}>
                                    <Link to={cartPathUrl}>
                                        <span className="icon-block">
                                            <FontAwesomeIcon icon={faShoppingCart} />
                                            {
                                                // 購物車商品為0時不顯示
                                                cartsCount!=0 &&
                                                    <span className="icon-block-number">{cartsCount}</span>
                                            }
                                        </span>
                                        <div className="prompt-block">
                                            購物車
                                        </div>
                                    </Link>
                                </li>
                                <li className={`${pathname[1]=='orders'}`}>
                                    <Link to={ordersPathUrl}>
                                        <span className="icon-block">
                                            <FontAwesomeIcon icon={faTruck} />
                                        </span>
                                        <div className="prompt-block">我的訂單</div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </header>
        );
    }

    componentDidMount() {
        // 檢查 localStorage 有無購物車編號，沒有向後端要一組
        if( typeof window !== 'undefined' ){
            if( sessionStorage.getItem('jwt_account') ){
                this.setState({
                    loading: true
                },()=>{
                    this.props.dispatch( ainfo() ).then( res => {
                        this.setState({
                            loading: false
                        },()=>{
                            const { status, data } = res;
                            switch( status ){
                                case 200:
                                    
                                    break;

                                default:
                                    break;
                            }
                        })
                    });
                })
            }else{
                this.setState({
                    loading: false
                });
            }
            this.props.dispatch( getCartID() );
            const cartID = localStorage.getItem('cartID')!=null? localStorage.getItem('cartID'):null;
            if( cartID!=null ){
                this.props.dispatch( cartsCount() );
            }
        }
    }
}

const mapStateToProps = state => {
    return{
        vendorToken  : state.login.jwt_vendor,
        accountToken : state.login.jwt_account,
        accountInfo  : state.myaccount.info,
        cartsCount   : state.myaccount.cartsCount
    }
}

export default connect( mapStateToProps )(Header);