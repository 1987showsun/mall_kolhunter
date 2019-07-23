import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faUser, faUserPlus, faShoppingCart, faTruck }from '@fortawesome/free-solid-svg-icons';

//Compoents
import Search from './search/';

// stylesheets
import './css/header.scss';

// Images
import Logo from '../../public/images/logo.png';

class Header extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            token: this.getJWTToken(props),
        }
    }

    render(){

        const { token } = this.state;

        return(
            <header data-content="center">
                <section className="container">
                    <div className="logo-block">
                        <img src={Logo} alt="" title="" />
                    </div>
                    <Search />
                    <div className="header-nav-block">
                        <ul>
                            {
                                token!=null || token!=undefined ? (
                                    <li>
                                        <Link to="/myaccount">
                                            <span className="icon-block">
                                                <FontAwesomeIcon icon={faUserPlus} />
                                            </span>
                                            <div className="prompt-block">Sam</div>
                                        </Link>
                                    </li>
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
                                <Link to="/myaccount/order">
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
    }
}

export default connect( mapStateToProps )(Header);