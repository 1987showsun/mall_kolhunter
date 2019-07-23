import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faAngleDown }from '@fortawesome/free-solid-svg-icons';

// Actions
import { clearJWTToken } from '../../../actions/login';

class Header extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            clearSessionStorageKey : ['jwt_vendor'],
        }
    }

    render(){
        return(
            <section className="admin-header">
                <div>
                    <label htmlFor="admin-nav-switch" className="admin-nav-switch">
                        <span></span>
                    </label>
                </div>
                <div className="right">
                    <div className="member-select-block">
                        <input type="checkbox" id="cover-user-select-switch" className="hide"/>
                        <label className="member-option-set" htmlFor="cover-user-select-switch">
                            <div className="cover">
                                <img src="https://cf.shopee.tw/file/c320d10f46e2abfd305c6f386d2faea0_tn" title="" alt="" />
                            </div>
                            <div className="name">
                                <h3>Hi! PAPORA股份有限公司</h3>
                                <span>付費商家</span>
                            </div>
                            <i>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </i>
                        </label>
                        <div className="cover-user-option-wrap">
                            <ul>
                                <li><Link to="/myvendor/profile">基本資料設定</Link></li>
                                <li><Link to="/myvendor/payments">帳戶設定</Link></li>
                                <li onClick={this.signOut.bind(this)}><span>登出</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    signOut = () => {
        const { clearSessionStorageKey } = this.state;
        Object.keys( sessionStorage ).map( key => {
            if( clearSessionStorageKey.includes(key) ){
                sessionStorage.removeItem(key);
            }
        })
        this.props.dispatch( clearJWTToken() );
        this.props.history.push(`/vendor`);
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )(Header);