import React from 'react';

// Components
import Cover from './common/cover';

// Stylesheets
import './style.scss';

export default class Index extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="row">
                    <section className="container detail-content" >
                        <div className="container-row">
                            <Cover />
                        </div>
                        <div className="container-row">
                            123
                        </div>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}