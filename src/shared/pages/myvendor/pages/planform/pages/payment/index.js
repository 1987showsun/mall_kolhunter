import React from 'react';
import { Switch, Redirect, Route, Prompt } from 'react-router-dom';

// Pages
import Step1 from './pages/step1';
import Step2 from './pages/step2';
import Step3 from './pages/step3';

export default class Index extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Switch>
                    <Route path="/myvendor/planform/payment/step1" component={Step1} />
                    <Route path="/myvendor/planform/payment/step2" component={Step2} />
                    <Route path="/myvendor/planform/payment/step3" component={Step3} />
                    <Redirect to="/myvendor/planform/list"/>
                </Switch>
                <Prompt when={true} message={ location => {
                    location.pathname.startsWith("/myvendor/planform/payment")? (
                        true
                    ):(
                        sessionStorage.removeItem('vendorBuyPlanform')
                    )
                }}/>
            </React.Fragment>
        );
    }
}