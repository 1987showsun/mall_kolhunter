/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import Nav from './common/nav';

// Routes
import Routes from './routes';

// Stylesheets
import './public/stylesheets/style.scss';

class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token: typeof window !== 'undefined'? sessionStorage.getItem('jwt_account') : "",
            mainTitle: {
                product: "商品清單",
                store: "店舖管理",
                fansorders: "粉絲訂單",
                bank: "銀行帳號設定"
            }
        }
    }

    static getDerivedStateFromProps( props, state ){
        const { token } = state;
        if( props.jwt_account!=token ){
            return {
                token: props.jwt_account
            }
        }
        return null;
    }

    render(){

        const { location, match, history } = this.props;
        const { token, mainTitle } = this.state;
        const type = location['pathname'].split('/').filter( item => item!="" )[1] || 'product';

        if( token=='' || token==null || token==undefined ){
            return null;
        }else if( token!='' || token!=null || token!=undefined ){
            return(
                <div className="row account-wrap">
                    <section className="container main-content">
                        <Nav 
                            type= {type}
                            match= {match}
                            history= {history}
                            location= {location}
                        />
                        <section className="container-col account-container-wrap" data-flexdirection="column">
                            <section className="container-unit-title">
                                <h2>{mainTitle[type]}</h2>
                            </section>
                            <Switch>
                                {
                                    Routes.map( routeItem => {
                                        return(
                                            <Route key={routeItem['path']} {...routeItem} />
                                        );
                                    })
                                }
                                <Redirect to="/mystore" />
                            </Switch>
                        </section>
                    </section>
                </div>
            )
        }
    }
    
    componentDidMount() {
        window.scrollTo(0, 0);
        const { token } = this.state;
        if( token=='' || token==null || token==undefined ){
           //this.props.history.goBack();
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        const token = this.state.token;
        const prevStateToken = prevState.token;
        if( token=='' || token==null || token==undefined || token!=prevStateToken ){
            //this.props.history.goBack();
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