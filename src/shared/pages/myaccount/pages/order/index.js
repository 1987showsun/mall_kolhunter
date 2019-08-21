import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import Items from './Items';
import Message from './message';
import Return from './return';

export default class Index extends React.Component{
    render(){

        return(
            <React.Fragment>
                <Switch>
                    <Route exact path="/myaccount/orders" component={Items}/>
                    <Route path="/myaccount/orders/message/:id" component={Message}/>
                    <Route path="/myaccount/orders/return/:id" component={Return}/>
                    <Redirect to="/myaccount/orders"/>
                </Switch>
            </React.Fragment>
        );
    }
}