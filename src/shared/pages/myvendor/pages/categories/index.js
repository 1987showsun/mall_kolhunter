import React from 'react';

//Components
import Product from './product';
import Order from './order';
import Account from './account';

//Lang
import lang from '../../../../public/lang/lang.json';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            title: {
                "product": "Commodity management",
                "order": "Order management",
                "account": "Account details"
            },
            components : {
                product : Product,
                order : Order,
                account: Account
            }
        }
    }

    render(){

        const { title, components }= this.state;
        const { match, location, history }= this.props;
        let _type= match['params']['type'] || 'product';
        let _titleKey= title[_type];
        let Component= components[_type];
        
        return (
            <React.Fragment>
                <section className="page-title">
                    <h3>{ lang['zh-TW'][_titleKey] }</h3>
                </section>
                <Component 
                    match= {match}
                    location= {location}
                    history= {history}
                />
            </React.Fragment>
        );
    }
}