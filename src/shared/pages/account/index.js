import React from 'react';
import { connect } from 'react-redux';

// Components
import Nav from './common/nav';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            token: props.jwt_account,
        }
    }

    static getDerivedStateFromProps( props, state ){
        if( props.jwt_account!=state.token ){
            return {
                token: props.jwt_account
            }
        }
        return null;
    }

    componentDidMount() {
        const { token } = this.state;
        if( token=='' || token==null || token==undefined ){
            this.props.history.push('/account');
        }
    }

    render(){

        const { token } = this.state;

        if( token!='' || token!=null || token!=undefined ){
            return(
                <div className="row account-wrap">
                    <section className="container main-content">
                        <Nav />
                        <section className="container-col" data-flexdirection="column">2</section>
                    </section>
                </div>
            )
        }else{
            return null;
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        const token = this.state.token;
        const prevStateToken = prevState.token;
        if( token!=prevStateToken ){
            this.props.history.push('/account');
        }
        return null;
    }

    componentDidUpdate(){
        return null;
    }
}

const mapStateToProps = (state) => {
    return{
        jwt_account: state.login.jwt_account
    }
}

export default connect(mapStateToProps)(Index);