import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

//Components
import Nav from './common/nav';
import Header from './common/header';

//Stylesheets
import './public/css/style.scss';

//Routers
import routers from './routers';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            token: props.jwt_vendor,
        }
    }

    static getDerivedStateFromProps( props, state ){
        if( props.jwt_vendor!=state.token ){
            return {
                token: props.jwt_vendor
            }
        }
        return null;
    }

    componentDidMount() {
        const { token } = this.state;
        if( token=='' || token==null || token==undefined ){
            this.props.history.push('/vendor');
        }
    }

    render(){

        const { token } = this.state;
        
        if( token!='' || token!=null || token!=undefined ){
            return(
                <React.Fragment>
                    <input type="checkbox" id="admin-nav-switch" />
                    <Nav {...this.props}/>
                    <main className="admin-main">
                        <Header 
                            history= {this.props.history} 
                            match= {this.props.match}
                            location= {this.props.location}
                        />
                        <div className="admin-content">
                            {
                                routers.map( (routeItem,i) => {
                                    return (<Route key={i} {...routeItem} />);
                                })
                            }
                        </div>
                    </main>
                </React.Fragment>
            )
        }else{
            return null;
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        const token = this.state.token;
        const prevStateToken = prevState.token;
        if( token!=prevStateToken ){
            this.props.history.push('/vendor');
        }
        return null;
    }

    componentDidUpdate(){
        return null;
    }
}

const mapStateToProps = (state) => {
    return{
        token: state.login.token,
        jwt_vendor: state.login.jwt_vendor
    }
}

export default connect(mapStateToProps)(Index);