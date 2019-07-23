import React from 'react';

// Components
import Product from './product/';

//Lang
import lang from '../../../../lang/lang.json';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            components : {
                product: {
                    mainTitle: "Product addition",
                    component: Product
                },
            }
        }
    }

    render(){

        const { components }= this.state;
        const { match, location, history }= this.props;
        let _type= match['params']['type'] || 'product';
        let _mainTitle = lang['zh-TW'][ components[_type]['mainTitle'] ];
        let Component = components[_type]['component'];

        return(
            <React.Fragment>
                <section className="page-title">
                    <h3>{ _mainTitle }</h3>
                </section>
                <Component 
                    history= {history}
                    match= {match}
                    location= {location}
                />
            </React.Fragment>
        );
    }
}