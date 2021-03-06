/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React, { useState, useEffect }  from 'react';
import queryString                     from 'query-string';
import { connect }                     from 'react-redux';
import { Helmet }                      from "react-helmet";

// Components
import Filter                          from './components/filter';
import MobileNav                       from './components/mobileNav/mobileNav';
import Breadcrumbs                     from './components/breadcrumbs';

// Modules
import Item                            from '../../../module/item/product';
import Loading                         from '../../../module/loading/mallLoading';
import BlockList                       from '../../../module/blockList';
import Pagination                      from '../../../module/newPagination';

// Actions
import { mallDelivery }                from '../../../actions/common';
import { productList, ssrProductList } from '../../../actions/categories';

class Index extends React.Component{

    static initialAction( pathname,query ) {
        return ssrProductList( pathname,query );
    }

    constructor(props){
        super(props);
        this.state = {
            loading    : false,
            categories : [],
            current    : props.current,
            total      : props.total,
            limit      : props.limit,
            data       : props.list
        }
    }

    static getDerivedStateFromProps( props,state ) {

        let categories = state.categories;
        if( categories.length==0 ){
            categories = props.categories
        }

        return{
            categories,
            current   : props.current,
            total     : props.total,
            limit     : props.limit,
            data      : props.list
        }
    }

    render(){
        
        const { match, location, history } = this.props;
        const { loading, categories, current, limit, total, data } = this.state;
        const { search }      = location;
        const { main, sub }   = match['params'];
        const mainTitleObject = categories.filter( filterItem => filterItem['id']==main );
        const subTitleObject  = mainTitleObject[0]['children'].filter( filterItem => filterItem['id']==sub);
        const mainTitle       = mainTitleObject.length>0? mainTitleObject[0]['title']  : "";
        const subTitle        = subTitleObject.length>0 ? subTitleObject[0]['title']   : "";

        return(
            <React.Fragment>
                <Helmet encodeSpecialCharacters={false}>
                    <title>{`???????????? KOL Mall | ?????????????????? - ${mainTitle},${subTitle}`}</title>
                    <meta name="keywords" content={`???????????? - ????????????,????????????,??????????????????,?????????,??????,??????,??????,${mainTitle},${subTitle} }`} />
                    <meta name="description" content={`????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????3C???????????????????????????????????????????????????`} />
                </Helmet>
                <div className="row">
                    <section className="container main-content">
                        <Filter
                            history     = {history}
                            match       = {match}
                            location    = {location}
                        />
                        <section className="container-col" data-flexdirection="column" >
                            <MobileNav 
                                history    = {history}
                                match      = {match}
                                location   = {location}
                            />
                            <Breadcrumbs
                                history    = {history}
                                match      = {match}
                                location   = {location}
                            />
                            <BlockList className="product-card">
                                {
                                    data.length>0?(
                                        data.map( item => {
                                            return(
                                                <li key={item['token']}>
                                                    <Item path={`/detail/${item['token']}`} data={item}/>
                                                </li>
                                            )
                                        })
                                    ):(
                                        !loading &&
                                            <div className="noData">???????????????????????????</div>
                                    )
                                }
                            </BlockList>
                            <Pagination
                                query      = {{...queryString.parse(search)}}
                                current    = {current}
                                limit      = {limit}
                                total      = {total}
                                history    = {history}
                                location   = {location}
                            />
                            <Loading loading={loading}/>
                        </section>
                    </section>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.callAPIFunction();
    }

    componentDidUpdate(prevProps, prevState) {
        const prevLocation = prevProps.location;
        const { location, match } = this.props;
        const subNavId = match['params']['sub'] || "";
        const prevSubNavId = prevProps.match['params']['sub'] || "";
        if( location['search']!=prevLocation['search'] || subNavId!=prevSubNavId ){
            this.callAPIFunction();
        }
    }

    callAPIFunction = () => {
        const { location, match } = this.props;
        const { pathname, search } = location;
        const subCategoryID = match['params']['sub'] || match['params']['main']; //????????????????????? id ??????????????? id 
        const query = { 
            ...queryString.parse(search),
            category: subCategoryID
        };
        this.setState({
            loading: true
        },() => {
            this.props.dispatch( productList(pathname,query) ).then( res => {
                this.setState({
                    loading: false
                })
            });
            this.props.dispatch( mallDelivery(pathname,query) )
        });
    }
}

const mapStateToProps = state => {
    return{
        categories : state.common.categoriesList,
        current    : state.categories.current,
        total      : state.categories.total,
        limit      : state.categories.limit,
        list       : state.categories.list
    }
}

export default connect( mapStateToProps )( Index );