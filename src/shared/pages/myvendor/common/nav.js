import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

// Images
import logo from '../../../public/images/logo.png';

class Nav extends React.Component{
    render(){

        const { location } = this.props;
        let pathname = location['pathname'].split('/').filter( item => item!='' );
        let _type = pathname[1] ||"dashbord";
        let _class = pathname[2] || '';
        let _typeActive = false;
        if( _type=='categories' || _type=='info' ){
            _typeActive = true;
        }

        return(
            <React.Fragment>
                <nav className="inc_nav">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} title="" alt="" />
                        </Link>
                    </div>
                    <ul>
                        <li className={ _type=='dashbord'? 'active':'' }><Link to="/myvendor">Dashbord</Link></li>
                        <li className={ _type=='products'? 'active':'' }><Link to="/myvendor/products">商品管理</Link></li>
                        <li className={ _type=='orders'? 'active':'' }><Link to="/myvendor/orders">訂單管理</Link></li>
                        <li className={ _type=='accounts'? 'active':'' }><Link to="/myvendor/accounts">帳務明細</Link></li>
                        <li className={ _type=='bill'? 'active':'' }><Link to="/myvendor/bill">帳單管理</Link></li>
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