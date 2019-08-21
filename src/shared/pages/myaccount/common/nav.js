import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import { signout } from '../../../actions/login';

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
                <article className="account-nav-wrap-row mobile">
                    <div className="input-box select">
                        <select value={type} onChange={this.handleChange.bind(this)}>
                            <option value="profile">基本設定</option>
                            <option value="carts">我的購物車</option>
                            <option value="orders">訂單查詢 / 退貨</option>
                            <option value="signout">登出</option>
                        </select>
                    </div>
                </article>
                <article className="account-nav-wrap-row pc">
                    <ul className="account-nav-ul">
                        <li className="account-nav-header">基本會員管理</li>
                        <li className={`${type=="profile"}`}><Link to="/myaccount">基本設定</Link></li>
                        <li className={`${type=="carts"}`}><Link to="/myaccount/carts">我的購物車</Link></li>
                        <li className={`${type=="orders"}`}><Link to="/myaccount/orders">訂單查詢 / 退貨</Link></li>
                        <li ><button onClick={this.signout.bind(this)}>登出</button></li>
                    </ul>
                </article>
            </section>
        );
    }

    handleChange = ( e ) => {
        const { location, history } = this.props;
        const search = location['search'];
        const value = e.target.value;
        if( value!='signout' ){
            history.push({
                pathname: `/myaccount/${value}`,
                search
            })
        }else{
            this.signout();
        }
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