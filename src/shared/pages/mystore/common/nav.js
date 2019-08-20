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
                            <option value="product">全部商品</option>
                            <option value="store">店舖管理</option>
                            <option value="fansorders">粉絲訂單</option>
                            <option value="account">帳戶資料</option>
                            <option value="signout">登出</option>
                        </select>
                    </div>
                </article>
                <article className="account-nav-wrap-row pc">
                    <ul className="account-nav-ul">
                        <li className="account-nav-header">我的店舖管理</li>
                        <li className={`${type=="product"}`}><Link to="/mystore/product">全部商品</Link></li>
                        <li className={`${type=="store"}`}><Link to="/mystore/store">店舖管理</Link></li>
                        <li className={`${type=="fansorders"}`}><Link to="/mystore/fansorders">粉絲訂單</Link></li>
                        <li className={`${type=="account"}`}><Link to="/mystore/account">帳戶資料</Link></li>
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
        history.push({
            pathname: `/mystore/${value}`,
            search
        })
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