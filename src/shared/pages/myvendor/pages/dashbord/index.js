import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

// Pages
import Analysis from './pages/analysis';

export default  class Index extends React.Component{
    render(){
        return(
            <Switch>
                <Route path="/myvendor/dashboard/analysis" component={Analysis} />
                <Redirect to="/myvendor/dashboard/analysis"/>
            </Switch>
        );
    }
}