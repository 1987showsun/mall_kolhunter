import React from 'react';

// Components
import SignIn from './general/sign_in';
import SignUp from './general/sign_up';
import IncSignIn from './inc/sign_in';
import IncSignUp from './inc/sign_up';

// Stylesheets
import './style.scss';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            DoYouHaveType: ['user','inc'],
            DoYouHaveClass: ['signin','signup'],
            components: {
                user: {
                    signin: SignIn,
                    signup: SignUp
                },
                inc: {
                    signin: IncSignIn,
                    signup: IncSignUp
                }
            }
        }
    }

    componentDidMount() {
        const { match } = this.props;
        const { DoYouHaveType, DoYouHaveClass } = this.state;
        let _type = match['params']['type'] || 'user';
        let _class = match['params']['class'] || 'signin';
        if( !DoYouHaveType.includes(_type) ||!DoYouHaveClass.includes(_class) ){
            this.props.history.push('/login');
        }
    }

    render(){

        const { match } = this.props;
        const { DoYouHaveType, DoYouHaveClass } = this.state;
        let _type = match['params']['type'] || 'user';
        let _class = match['params']['class'] || 'signin';

        if( DoYouHaveType.includes(_type) && DoYouHaveClass.includes(_class) ){
            let Component = this.state.components[_type][_class];
            return(
                <div className="login-wrap">
                    <Component />
                </div>
            );
        }else{
            return null;
        }
    }
}