/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                          from 'react';
import queryString                    from 'query-string';
import { Switch, Route, Redirect }    from 'react-router-dom';
import { Link }                       from 'react-router-dom';
import { connect }                    from 'react-redux';

// Components
import AccountSignIn                  from './member/sign_in';
import AccountSignUp                  from './member/sign_up';
import AccountVerify                  from './member/verify';
import AccountForget                  from './member/forget';
import AccountResetPWD                from './member/resetPWD';
import VendorSignIn                   from './vendor/sign_in';
import VendorSignUp                   from './vendor/sign_up';
import VendorLeading                  from './vendor/leading';
import VendorVverify                  from './vendor/verify';
import VendorForget                   from './vendor/forget';
import VendorResetPWD                 from './vendor/resetPWD';

// Images
import Logo                           from '../../public/images/logo2.png';

// Stylesheets
import './public/stylesheets/style.scss';

class Index extends React.Component{

    constructor(props){

        const location = props.location;
        const pathname = location['pathname'].split('/').filter( item => item!='' );
        const _type    = pathname[0];

        super(props);
        this.state = {
            token           : props[`jwt_${_type}`],
            DoYouHaveType   : ['account','vendor'],
            DoYouHaveClass  : ['signin','signup','leading','verify','forget','resetPWD'],
        }
    }

    static getDerivedStateFromProps(props,state){

        const location = props.location;
        const pathname = location['pathname'].split('/').filter( item => item!='' );
        const _type    = pathname[0];

        if( props[`jwt_${_type}`]!=state.token ){
            return {
                token: props[`jwt_${_type}`]
            }
        }
        return null;
    }

    render(){
        return(
            <div className="login-wrap">
                <div className="login-logo">
                    <Link to="/">
                        <img src={Logo} alt="網紅電商" title="網紅電商" />
                    </Link>
                </div>
                <Switch>
                    <Route exact={true} path="/account" component={AccountSignIn} />
                    <Route path="/account/signup" component={AccountSignUp} />
                    <Route path="/account/verify" component={AccountVerify} />
                    <Route path="/account/forget" component={AccountForget} />
                    <Route path="/account/resetPWD" component={AccountResetPWD} />
                    <Route exact={true} path="/vendor" component={VendorSignIn} />
                    <Route path="/vendor/leading" component={VendorLeading} />
                    <Route path="/vendor/signup" component={VendorSignUp} />
                    <Route path="/vendor/verify" component={VendorVverify} />
                    <Route path="/vendor/forget" component={VendorForget} />
                    <Route path="/vendor/resetPWD" component={VendorResetPWD} />
                    <Redirect to="/account" />
                </Switch>
            </div>
        );
    }

    componentDidMount() {
        this.checkAuth();
    }

    componentDidUpdate(prevProps, prevState) {
        this.checkAuth();
    }

    checkAuth = () => {

        const { location, history }  = this.props;
        const { token }              = this.state;
        const { pathname, search }   = location;
        const pathnameArray          = pathname.split('/').filter( item => item!='' );
        const searchObject           = { ...queryString.parse(search) };
        let _type                    = pathnameArray[0];

        if( token!='' ){
            if( _type=='vendor' ){
                history.push(`/my${_type}`);
            }else{
                if( searchObject.hasOwnProperty('to') ){
                    history.push(`/my${_type}/${searchObject['to']}`);
                }else{
                    history.push('/');
                }
            }
        }
    }
}

const mapStateToProps = (state) => {
    return{
        jwt_account   : state.login.jwt_account,
        jwt_vendor    : state.login.jwt_vendor
    }
}

export default connect(mapStateToProps)(Index);