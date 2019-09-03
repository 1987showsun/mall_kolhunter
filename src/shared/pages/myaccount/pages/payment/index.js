import React from 'react';
import queryString from 'query-string';

// Pages
import Atm from './pages/atm';
import Cc from './pages/cc';
import Cvs from './pages/cvs';


export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            components: {
                atm: {
                    components: Atm
                },
                cc: {
                    components: Cc
                },
                cvs: {
                    components: Cvs
                }
            }
        }
    }

    render(){

        const { components } = this.state;
        const { location, match, history } = this.props;
        const { pathname, search } = location;
        const query = queryString.parse(search);
        const payMethod = query['payMethod'] || "atm";
        const orderID = query['orderID'] || "";
        const Component = components[payMethod]['components'] || null;

        return(
            <React.Fragment>
                <Component 
                    match= {match}
                    history= {history}
                    location= {location}
                    payMethod= {payMethod}
                    orderID= {orderID}
                />
            </React.Fragment>
        );
    }
}