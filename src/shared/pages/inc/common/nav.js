import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Images
import logo from '../../../public/images/logo.png';

class Nav extends React.Component{
    render(){

        const { location } = this.props;
        let pathname = location['pathname'].split('/').filter( item => item!='' );
        let _type = pathname[2] || 'dashbord';

        return(
            <React.Fragment>
                <nav className="inc_nav">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} title="" alt="" />
                        </Link>
                    </div>
                    <ul>
                        <li className={_type=='dashbord'? 'active':''}><Link to="/inc">Dashbord</Link></li>
                        <li className={_type=='product'? 'active':''}><Link to="/inc/categories/product">商品管理</Link></li>
                        <li className={_type=='order'? 'active':''}><Link to="/inc/categories/order">訂單管理</Link></li>
                        <li className={_type=='account'? 'active':''}><Link to="/inc/categories/account">帳務明細</Link></li>
                        <li className={_type=='program'? 'active':''}><Link to="/inc/categories/program">購買方案</Link></li>
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