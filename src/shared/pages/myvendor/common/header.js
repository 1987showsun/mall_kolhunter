import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faAngleDown }from '@fortawesome/free-solid-svg-icons';

// Actions
import { signout } from '../../../actions/login';

class Header extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            profile: props.profile,
            clearSessionStorageKey : ['jwt_vendor'],
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            profile: props.profile,
        }
    }

    render(){

        const { profile } = this.state;

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
                                <h3>Hi! {profile['contactor'] || ""}</h3>
                                <span>剩餘新增數：{profile['remainQuantity'] || 0}</span>
                            </div>
                            <i>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </i>
                        </label>
                        <div className="cover-user-option-wrap">
                            <ul>
                                <li><Link to="/myvendor/profile">基本資料設定</Link></li>
                                <li><Link to="/myvendor/profile/password">帳戶密碼設定</Link></li>
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
        this.props.dispatch( signout( clearSessionStorageKey ) );
    }
}

const mapStateToProps = state => {
    return{
        profile: state.myvendor.info
    }
}

export default connect( mapStateToProps )(Header);