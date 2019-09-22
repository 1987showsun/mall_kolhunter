import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

//Components
import Nav from './common/nav';
import Header from './common/header';

// Actions
import { vinfo } from '../../actions/myvendor';

//Stylesheets
import './public/css/style.scss';

//Routers
import routers from './routers';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            token: typeof window !== 'undefined'? sessionStorage.getItem('jwt_vendor') : "",
        }
    }

    static getDerivedStateFromProps( props, state ){
        const { token } = state;
        if( props.jwt_vendor!=token ){
            return {
                token: props.jwt_vendor
            }
        }
        return null;
    }

    render(){

        const { token } = this.state;
        
        if( token=='' || token==null || token==undefined ){
            return null;
        }else if( token!='' || token!=null || token!=undefined ){
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
                            <Switch>
                                {
                                    routers.map( (routeItem,i) => {
                                        return (<Route key={routeItem['path']} {...routeItem} />);
                                    })
                                }
                                <Redirect to="/myvendor/dashboard" />
                            </Switch>
                        </div>
                    </main>
                </React.Fragment>
            )
        }
    }

    componentDidMount() {
        const { token } = this.state;
        if( token=='' || token==null || token==undefined ){
            this.props.history.goBack();
        }else{
            this.props.dispatch( vinfo() );
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        const token = this.state.token;
        const prevStateToken = prevState.token;
        if( token=='' || token==null || token==undefined || token!=prevStateToken ){
            this.props.history.goBack();
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