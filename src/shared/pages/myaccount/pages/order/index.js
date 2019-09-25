import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import List from './list';
import Info from './info';
import Message from './message';
import Return from './return';

export default class Index extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Switch>
                    <Route exact path="/myaccount/orders" component={List}/>
                    <Route path="/myaccount/orders/info/:id" component={Info}/>
                    <Route path="/myaccount/orders/message/:id" component={Message}/>
                    <Route path="/myaccount/orders/return/:id" component={Return}/>
                    <Redirect to="/myaccount/orders"/>
                </Switch>
            </React.Fragment>
        );
    }
}