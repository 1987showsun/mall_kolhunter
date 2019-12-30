/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                        from 'react';
import { Switch, Redirect, Route }  from 'react-router-dom';

// Pages
import List                         from './pages/index';
import Payment                      from './pages/payment';
import Record                       from './pages/record';
import RecordInfo                   from './pages/record/info';

 export default () => {
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