import React from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import AccountSignIn from './member/sign_in';
import AccountSignUp from './member/sign_up';
import AccountVerify from './member/verify';
import AccountForget from './member/forget';
import VendorSignIn from './vendor/sign_in';
import VendorSignUp from './vendor/sign_up';
import VendorLeading from './vendor/leading';
import VendorVverify from './vendor/verify';
import VendorForget from './vendor/forget';

import Logo from '../../public/images/logo2.png';

// Stylesheets
import './style.scss';

class Index extends React.Component{

    constructor(props){

        const location = props.location;
        const pathname = location['pathname'].split('/').filter( item => item!='' );
        let _type = pathname[0];

        super(props);
        this.state = {
            token: props[`jwt_${_type}`],
            DoYouHaveType: ['account','vendor'],
            DoYouHaveClass: ['signin','signup','leading','verify','forget'],
            components: {
                account: {
                    signin: AccountSignIn,
                    signup: AccountSignUp,
                    verify: AccountVerify,
                    forget: AccountForget
                },
                vendor: {
                    signin: VendorSignIn,
                    signup: VendorSignUp,
                    leading: VendorLeading,
                    verify: VendorVverify,
                    forget: VendorForget
                }
            }
        }
    }

    static getDerivedStateFromProps(props,state){

        const location = props.location;
        const pathname = location['pathname'].split('/').filter( item => item!='' );
        let _type = pathname[0];

        if( props[`jwt_${_type}`]!=state.token ){
            return {
                token: props[`jwt_${_type}`]
            }
        }
        return null;
    }

    render(){

        const { match, location, history } = this.props;
        const { DoYouHaveType, DoYouHaveClass } = this.state;
        const query = queryString.parse(location['search']);
        const pathname = location['pathname'].split('/').filter( item => item!='' );
        let _type = pathname[0];
        let _class = match['params']['class'] || 'signin';

        if( DoYouHaveType.includes(_type) && DoYouHaveClass.includes(_class) ){
            let Component = this.state.components[_type][_class];
            return(
                <div className="login-wrap">
                    <div className="login-logo">
                        <Link to="/">
                            <img src={Logo} alt="網紅電商" title="網紅電商" />
                        </Link>
                    </div>
                    <Component 
                        history= {history}
                        match= {match}
                        location= {location}
                    />
                </div>
            );
        }else{
            return null;
        }
    }

    componentDidMount() {
        this.isCheckLogin();
    }

    componentDidUpdate(prevProps, prevState) {
        this.isCheckLogin();
    }

    isCheckLogin = () => {
        const { match, location } = this.props;
        const { DoYouHaveType, DoYouHaveClass, token } = this.state;
        const { pathname, search } = location;
        const pathnameArray = pathname.split('/').filter( item => item!='' );
        const searchArray = queryString.parse(search);
        const goBack = searchArray['back'] || false;
        let _type = pathnameArray[0];
        let _class = match['params']['class'] || 'signin';
        if( token==undefined || token==null || token=='' ){
            if( !DoYouHaveType.includes(_type) ||!DoYouHaveClass.includes(_class) ){
                this.props.history.push(`/${_type}`);
            }
        }else{
            if( goBack=='true' || goBack==true ){
                this.props.history.goBack();
            }else{
                this.props.history.push(`/my${_type}`);
            }
        }
    }

    getJWTToken = (props) => {
        if( typeof window !== 'undefined' ){
            const type = props['location']['pathname'].split('/').filter( item => item!='' )[0];
            const token = sessionStorage.getItem(`jwt_${type}`) || null;
            return token;
        }
    }
}

const mapStateToProps = (state) => {
    return{
        jwt_account: state.login.jwt_account,
        jwt_vendor: state.login.jwt_vendor
    }
}

export default connect(mapStateToProps)(Index);