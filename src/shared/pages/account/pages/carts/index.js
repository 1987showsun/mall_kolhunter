import React from 'react';

// Components
import ProductWrap from './product';

export default class Index extends React.Component{
    render(){
        return(
            <React.Fragment>
                <section className="container-unit">
                    <ProductWrap />
                </section>
            </React.Fragment>
        );
    }
}