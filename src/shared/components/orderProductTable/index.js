import React from 'react';

// Components
import Head from './head';
import Item from './item';

// Stylesheets
import './style.scss';

export default class Index extends React.Component{
    render(){

        const { tableBodyData } = this.props;

        return(
            <div className="order-table-wrap">
                <ul className="order-table">
                    <Head />
                    {
                        tableBodyData.map( item => {
                            return <Item key={item['id']} {...item}/>
                        })
                    }
                </ul>
            </div>
        );
    }
}