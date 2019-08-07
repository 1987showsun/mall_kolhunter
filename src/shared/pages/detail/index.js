import React from 'react';

// Components
import Cover from './cover';

// Stylesheets
import './public/stylesheets/style.scss';

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
                            <div className="detail-cover-wrap">
                                container
                            </div>
                        </div>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}