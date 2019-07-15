import React from 'react';

//Components
import Product from './product';
import Order from './order';
import Account from './account';
import Program from './program';

//Lang
import lang from '../../../../lang/lang.json';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            title: {
                "product": "Commodity management",
                "order": "Order management",
                "account": "Account details",
                "program": "Purchase plan"
            },
            components : {
                product : Product,
                order : Order,
                account: Account,
                program: Program
            }
        }
    }

    render(){

        const { title, components }= this.state;
        const { match }= this.props;
        let _type= match['params']['type'] || 'product';
        let _titleKey= title[_type];
        let Component= components[_type];
        
        return (
            <React.Fragment>
                <section className="page-title">
                    <h3>{ lang['zh-TW'][_titleKey] }</h3>
                </section>
                <Component />
            </React.Fragment>
        );
    }
}