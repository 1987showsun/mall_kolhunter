import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

// Pages
import Home from './pages/index';
import Info from './pages/info';

export default  class Index extends React.Component{
    render(){
        return(
            <Switch>
                <Route path="/myvendor/orders/list" component={Home} />
                <Route path="/myvendor/orders/info/:id" component={Info} />
                <Redirect to="/myvendor/orders/list"/>
            </Switch>
        );
    }
}