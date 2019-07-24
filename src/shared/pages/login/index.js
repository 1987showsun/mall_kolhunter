import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Components
import AccountSignIn from './member/sign_in';
import AccountSignUp from './member/sign_up';
import AccountVerify from './member/verify';
import VendorSignIn from './vendor/sign_in';
import VendorSignUp from './vendor/sign_up';
import VendorLeading from './vendor/leading';
import VendorVverify from './vendor/verify';
import VendorForget from './vendor/forgetPWD';

// Stylesheets
import './style.scss';

class Index extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            token: this.getJWTToken(props),
            DoYouHaveType: ['account','vendor'],
            DoYouHaveClass: ['signin','signup','leading','verify','forget'],
            components: {
                account: {
                    signin: AccountSignIn,
                    signup: AccountSignUp,
                    verify: AccountVerify
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
        if( props.token!='' ){
            return {
                token: props.token
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
        console.log( match,location,_type,_class,query );

        //return null;
        if( DoYouHaveType.includes(_type) && DoYouHaveClass.includes(_class) ){
            let Component = this.state.components[_type][_class];
            return(
                <div className="login-wrap">
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
        const { token } = this.state;
        const { match, location } = this.props;
        const { DoYouHaveType, DoYouHaveClass } = this.state;
        const query = queryString.parse(location['search']);
        const pathname = location['pathname'].split('/').filter( item => item!='' );
        let _type = pathname[0];
        let _class = match['params']['class'] || 'signin';

        if( token==undefined || token==null || token=='' ){
            if( !DoYouHaveType.includes(_type) ||!DoYouHaveClass.includes(_class) ){
                this.props.history.push(`/${_type}`);
            }
        }else{
            this.props.history.push(`/my${_type}`);
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
        token: state.login.token
    }
}

export default connect(mapStateToProps)(Index);