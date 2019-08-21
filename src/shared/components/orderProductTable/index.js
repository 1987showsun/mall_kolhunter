import React from 'react';

// Components
import Head from './head';
import Item from './item';

// Stylesheets
import './style.scss';

export default class Index extends React.Component{
    render(){
        return(
            <div className="order-table-wrap">
                <ul className="order-table">
                    <Head />
                    <Item />
                    <Item />
                </ul>
            </div>
        );
    }
}