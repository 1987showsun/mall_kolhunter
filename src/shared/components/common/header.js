import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//Compoents
import Search from './search/';

// stylesheets
import './css/header.scss';

// Images
import Logo from '../../public/images/logo.png';

class Header extends React.Component{
    render(){
        return(
            <header data-content="center">
                <section className="container">
                    <div className="logo-block">
                        <img src={Logo} alt="" title="" />
                    </div>
                    <Search />
                    <div className="header-nav-block">
                        <ul>
                            <li>
                                <Link to=""></Link>
                            </li>
                            <li>
                                <Link to=""></Link>
                            </li>
                            <li>
                                <Link to=""></Link>
                            </li>
                            <li>
                                <Link to=""></Link>
                            </li>
                        </ul>
                    </div>
                </section>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default connect( mapStateToProps )(Header);