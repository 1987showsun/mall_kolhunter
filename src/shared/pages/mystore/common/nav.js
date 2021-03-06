/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faListAlt, faStore, faFileAlt, faUniversity, faSignOutAlt }from '@fortawesome/free-solid-svg-icons';

// Actions
import { signout } from '../../../actions/login';
import { getCartID } from '../../../actions/common';
import { cartsCount } from '../../../actions/myaccount';

class Nav extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            type: props.type,
            accountInfo: props.accountInfo,
            clearSessionStorageKey: ['jwt_account']
        }
    }

    static getDerivedStateFromProps(props, state){
        console.log('props')
        
        if( props.type!=state.type ){
            if (props.type=='store'){
                const storeID = props.accountInfo['storeToken'] || "123";
                return{
                    type: "store/"+ storeID
                }
            }
            return{
                type: props.type
            }
            
        }
        if( props.accountInfo!=state.accountInfo ){
            return{
                accountInfo: props.accountInfo
            }
        }
        return null;
    }

    shouldComponentUpdate (nextProps, nextState) {
        const { type, accountInfo } = this.state;
        if( type!=nextState.type ){
            return true;
        }
        if( accountInfo!=nextState.accountInfo ){
            return true;
        }

        return false;
    }

    render(){
        
        const { type, accountInfo } = this.state;
        const storeID = accountInfo['storeToken'] || "123";
        const activeType = type=='store'? 'store/'+ storeID : type;
        return(
            <section className="container-col account-nav-wrap">
                <article className="account-nav-wrap-row mobile">
                    <div className="input-box select">
                        <select value={activeType} onChange={this.handleChange.bind(this)}>
                            <option value="product">????????????</option>
                            <option value={`store/${storeID}`}>????????????</option>
                            <option value="fansorders">????????????</option>
                            <option value="bank">??????????????????</option>
                            <option value="signout">??????</option>
                        </select>
                    </div>
                </article>
                <article className="account-nav-wrap-row pc">
                    <ul className="account-nav-ul">
                        <li className="account-nav-header">??????????????????</li>
                        <li className={`${type=="product"}`}><Link to="/mystore/product"><i><FontAwesomeIcon icon={faListAlt} /></i>????????????</Link></li>
                        <li className={`${type=="store"}`}><Link to={`/mystore/store/${storeID}`}><i><FontAwesomeIcon icon={faStore} /></i>????????????</Link></li>
                        <li className={`${type=="fansorders"}`}><Link to="/mystore/fansorders"><i><FontAwesomeIcon icon={faFileAlt} /></i>????????????</Link></li>
                        <li className={`${type=="bank"}`}><Link to="/mystore/bank"><i><FontAwesomeIcon icon={faUniversity} /></i>??????????????????</Link></li>
                        <li ><button onClick={this.signout.bind(this)}><i><FontAwesomeIcon icon={faSignOutAlt} /></i>??????</button></li>
                    </ul>
                </article>
            </section>
        );
    }

    handleChange = ( e ) => {
        console.log('chenage')
        const { location, history } = this.props;
        const search = location['search'];
        const value = e.target.value;
        if( value!='signout' ){
            history.push({
                pathname: `/mystore/${value}`,
                search
            })
        }else{
            this.signout();
        }
    }

    signout = () => {
        const { clearSessionStorageKey } = this.state;
        this.props.dispatch( signout(clearSessionStorageKey) );
        this.props.dispatch( getCartID() ).then( res => {
            switch( res['status'] ){
                case 200:
                    //this.props.dispatch(cartsCount());
                    break;
            }
        });
        clearTimeout( this.delay );
        this.delay = setTimeout(()=>{
            this.props.history.push('/');
        },1000);
    }
}

const mapStateToProps = state => {
    return{
        accountInfo: state.myaccount.info,
    }
}

export default connect( mapStateToProps )( Nav );