import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faUser, faStore, faUserPlus, faShoppingCart, faTruck }from '@fortawesome/free-solid-svg-icons';

//Compoents
import Search from './search/';

// Actions
import { ainfo } from '../../actions/account';
import { getCartID } from '../../actions/common';

// stylesheets
import './css/header.scss';

// Images
import Logo from '../../public/images/logo.png';
import LogoMobile from '../../public/images/logo-mobile.png';

class Header extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            accountInfo: props.accountInfo,
            token: this.getJWTToken(props),
        }
    }

    static getDerivedStateFromProps(props, state){
        if( props.accountInfo!=state.accountInfo ){
            return{
                accountInfo: props.accountInfo
            }
        }
        return null;
    }

    render(){

        const { 
            accountInfo, 
            token 
        } = this.state;
        const {
            history,
            match,
            location
        } = this.props;

        return(
            <header data-content="center">
                <section className="container">
                    <div className="logo-block">
                        <Link to="/">
                            <img className="normal" src={Logo} alt="" title="" />
                            <img className="mobile" src={LogoMobile} alt="" title="" />
                        </Link>
                    </div>
                    <Search 
                        history= {history}
                        match= {match}
                        location= {location}
                    />
                    <div className="header-nav-block">
                        <ul>
                            {
                                token!=null || token!=undefined ? (
                                    <React.Fragment>
                                        <li>
                                            <Link to="/myaccount">
                                                <span className="icon-block">
                                                    <FontAwesomeIcon icon={faUserPlus} />
                                                </span>
                                                <div className="prompt-block">{accountInfo['name']}</div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/mystore">
                                                <span className="icon-block">
                                                    <FontAwesomeIcon icon={faStore} />
                                                </span>
                                                <div className="prompt-block">店舖管理</div>
                                            </Link>
                                        </li>
                                    </React.Fragment>
                                ):(
                                    <React.Fragment>
                                        <li>
                                            <Link to="/account">
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
                            }
                            <li>
                                <Link to="/myaccount/carts">
                                    <span className="icon-block">
                                        <FontAwesomeIcon icon={faShoppingCart} />
                                    </span>
                                    <div className="prompt-block">購物車</div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/myaccount/orders">
                                    <span className="icon-block">
                                        <FontAwesomeIcon icon={faTruck} />
                                    </span>
                                    <div className="prompt-block">我的訂單</div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </section>
            </header>
        );
    }

    componentDidMount() {
        this.props.dispatch( ainfo() );
        // 檢查 localStorage 有無購物車編號，沒有向後端要一組
        if( typeof window !== 'undefined' ){
            if( !localStorage.getItem('cartID') ){
                this.props.dispatch( getCartID() ).then( res => {
                    if( res['status']==200 ){
                        const cartID = res['data']['cart'];
                        localStorage.setItem('cartID',cartID);
                    }
                });
            }
        }
    }

    getJWTToken = (props) => {
        if( typeof window !== 'undefined' ){
            const type = 'account';
            const token = sessionStorage.getItem(`jwt_${type}`) || null;
            return token;
        }
    }
}

const mapStateToProps = state => {
    return{
        token: state.login.token,
        accountInfo: state.account.info
    }
}

export default connect( mapStateToProps )(Header);