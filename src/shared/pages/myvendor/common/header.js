/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faAngleDown, faUserCircle }from '@fortawesome/free-solid-svg-icons';

// Actions
import { signout } from '../../../actions/login';

class Header extends React.Component{

    constructor(props){
        super(props);
        this.selectNav = React.createRef(null);
        this.state     = {
            clearSessionStorageKey    : ['jwt_vendor'],
            isCoverUserOptionWrapOpen : false
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            profile: props.profile,
        }
    }

    render(){

        const { profile, isCoverUserOptionWrapOpen } = this.state;

        return(
            <section className="admin-header">
                <div>
                    <label htmlFor="admin-nav-switch" className="admin-nav-switch">
                        <span></span>
                    </label>
                </div>
                <div className="right">
                    <div
                        className ="member-select-block"
                        onClick   = {this.openMenu.bind(this)}
                    >
                        <input type="checkbox" id="cover-user-select-switch" className="hide"/>
                        <div 
                            ref       = {this.selectNav}
                            className = "member-option-set" 
                        >
                            <div className="cover">
                                {
                                    profile['photo']!=undefined && profile['photo']!="" ? (
                                        <img src="https://cf.shopee.tw/file/c320d10f46e2abfd305c6f386d2faea0_tn" title="" alt="" />
                                    ):(
                                        <FontAwesomeIcon icon={faUserCircle} />
                                    )
                                }
                            </div>
                            <div className="name">
                                <h3>Hi! {profile['contactor'] || ""}</h3>
                                <span>剩餘新增數：{profile['remainQuantity'] || 0}</span>
                            </div>
                            <i>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </i>
                        </div>
                        <div className={`cover-user-option-wrap ${isCoverUserOptionWrapOpen}`}>
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

    handleOutsideClick = () => {
        this.closeMenu();
    }

    openMenu = () => {
        document.addEventListener('click', this.handleOutsideClick, false);
        this.setState({
            isCoverUserOptionWrapOpen: true
        });
    }

    closeMenu() {
        document.removeEventListener('click', this.handleOutsideClick, false);
        this.setState({
            isCoverUserOptionWrapOpen: false
        });
    }
    
    signOut = () => {
        const { clearSessionStorageKey } = this.state;
        this.props.dispatch( signout( clearSessionStorageKey ) );
        clearTimeout( this.delay );
        this.delay = setTimeout(()=>{
            this.props.history.push('/');
        },1000);
    }
}

const mapStateToProps = state => {
    return{
        profile: state.myvendor.info
    }
}

export default connect( mapStateToProps )(Header);