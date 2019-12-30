/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                       from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

// Pages
import Home                        from './pages/index';
import Info                        from './pages/info';

export default () => {
    return(
        <Switch>
            <Route path="/myvendor/orders/list" component={Home} />
            <Route path="/myvendor/orders/info/:id" component={Info} />
            <Redirect to="/myvendor/orders/list"/>
        </Switch>
    );
}