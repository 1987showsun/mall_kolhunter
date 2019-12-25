/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

//Components
import Nav from './common/nav';
import Header from './common/header';

// Actions
import { vinfo } from '../../actions/myvendor';
import { clearToken } from '../../actions/login';

//Stylesheets
import './public/css/style.scss';

//Routers
import routers from './routers';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            token        : typeof window !== 'undefined'? sessionStorage.getItem('jwt_vendor') : "",
            navOpenStatus: 'close'
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

        const { navOpenStatus, token } = this.state;
        
        if( token=='' || token==null || token==undefined ){
            return null;
        }else if( token!='' || token!=null || token!=undefined ){
            return(
                <React.Fragment>
                    <Nav 
                        {...this.props}
                        returnNavSwitchStatus= {( status )=>{
                            this.setState({
                                navOpenStatus: status
                            })
                        }}
                    />
                    <main className={`admin-main ${navOpenStatus}`}>
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
                                {/* <Redirect to="/myvendor/dashboard/analysis" /> */}
                                <Redirect to="/myvendor/products/list"/>
                            </Switch>
                        </div>
                    </main>
                </React.Fragment>
            )
        }
    }

    componentDidMount() {
        const { history } = this.props;
        const { token }   = this.state;
        if( token=='' || token==null || token==undefined ){
            history.push({
                pathname: '/vendor'
            })
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