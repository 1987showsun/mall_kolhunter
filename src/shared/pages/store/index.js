import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';

// Components
import Breadcrumbs from './breadcrumbs';
import BlockList from '../../module/blockList';
import Item from './item';

export default class Index extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="row">
                    <section className="container main-content">
                        <section className="container-col" data-flexdirection="column" >
                            <Breadcrumbs />
                            <BlockList className="store-card">
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                            </BlockList>
                        </section>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}