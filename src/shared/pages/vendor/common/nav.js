import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Images
import logo from '../../../public/images/logo.png';

class Nav extends React.Component{
    render(){

        const { location } = this.props;
        let pathname = location['pathname'].split('/').filter( item => item!='' );
        let _type = pathname[2] || pathname[1] || 'dashbord';
        return(
            <React.Fragment>
                <nav className="inc_nav">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} title="" alt="" />
                        </Link>
                    </div>
                    <ul>
                        <li className={_type=='dashbord'? 'active':''}><Link to="/myvendor">Dashbord</Link></li>
                        <li className={_type=='product'? 'active':''}><Link to="/myvendor/categories/product?page=1&sort=desc&sortBy=created&limit=30">商品管理</Link></li>
                        <li className={_type=='order'? 'active':''}><Link to="/myvendor/categories/order">訂單管理</Link></li>
                        <li className={_type=='account'? 'active':''}><Link to="/myvendor/categories/account">帳務明細</Link></li>
                    </ul>
                </nav>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{

    }
}

export default connect(mapStateToProps)(Nav);