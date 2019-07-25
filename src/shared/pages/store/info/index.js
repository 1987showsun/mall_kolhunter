import React from 'react';
import CurrencyFormat from 'react-currency-format';

// Components
import Item from './item';
import BlockList from '../../../module/blockList';
import Filter from './filter';
import Breadcrumbs from './breadcrumbs';

// Stylesheets
import './style.scss';

export default class Index extends React.Component{
    render(){

        const { match, location } = this.props;

        return(
            <React.Fragment>
                <div className="row store-cover-wrap">
                    <section className="container store-cover">
                        <figure>
                            <div className="figure-img"></div>
                            <figcaption>
                                <div className="figcaption-row">
                                    <ul className="figcaption-info-ul">
                                        <li>
                                            <div className="figcaption-ul-head">總成交數</div>
                                            <div className="figcaption-ul-content">
                                                <CurrencyFormat value={13456981} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="figcaption-ul-head">商品總數</div>
                                            <div className="figcaption-ul-content">
                                                <CurrencyFormat value={2456981} displayType={'text'} thousandSeparator={true} />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="figcaption-row">
                                    <ul className="figcaption-action-ul">
                                        <li><button type="button">個人頁面</button></li>
                                        <li><button type="button">與他合作</button></li>
                                    </ul>
                                </div>
                            </figcaption>
                        </figure>
                    </section>
                </div>
                <div className="row">
                    <section className="container main-content">
                        <Filter
                            match= {match}
                            location= {location}
                        />
                        <section className="container-col" data-flexdirection="column" >
                            <Breadcrumbs />
                            <BlockList className="product-card">
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