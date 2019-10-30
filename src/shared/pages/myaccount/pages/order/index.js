import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import List    from './pages/list';
import Info    from './pages/info';
import Message from './pages/message';
import Return  from './pages/return';

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