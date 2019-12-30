/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                       from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

// Pages
import Home                        from './pages/index';
import Create                      from './pages/create';
import Info                        from './pages/info';

// Stylesheets

 export default () => {
    return(
        <Switch>
            <Route path="/myvendor/products/list" component={Home} />
            <Route path="/myvendor/products/create" component={Create} />
            <Route path="/myvendor/products/info/:id" component={Info} />
            <Redirect to="/myvendor/products/list"/>
        </Switch>
    );
}