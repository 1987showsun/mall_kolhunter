import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

// Pages
import List from './pages/index';
import Payment from './pages/payment';
import Record from './pages/record';
import RecordInfo from './pages/record/info';

// Stylesheets
import './public/stylesheets/style.scss';

 export default  class Index extends React.Component{
    render(){
        return(
            <Switch>
                <Route path="/myvendor/planform/list" component={List} />
                <Route path="/myvendor/planform/payment" component={Payment} />
                <Route exact={true} path="/myvendor/planform/record" component={Record} />
                <Route path="/myvendor/planform/record/info/:id" component={RecordInfo} />
                <Redirect to="/myvendor/planform/list"/>
            </Switch>
        );
    }
}