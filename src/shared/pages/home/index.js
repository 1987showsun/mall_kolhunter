/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                  from 'react';
import queryString            from 'query-string';
import { Helmet }             from "react-helmet";
import { connect }            from 'react-redux';

// Components
import Kv                     from './components/kv';
import Store                  from './components/store';
import Category               from './components/category';
import Product                from './components/product';

// Actions
import { getHome, latest }    from '../../actions/home';

class Home extends React.Component{

    static initialAction( pathname,query ) {
        return getHome( pathname,{page: query['latestCurrent']||1} );
    }

    constructor(props){
        super(props);
        this.state = {
            kv               : props.kv,
            store            : props.store,
            latest           : props.latest,
            latestTotal      : props.latestTotal,
            latestLimit      : props.latestLimit,
            latestHasMore    : false,
            latestSsLock     : false,
            categories       : props.categories
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            kv               : props.kv,
            store            : props.store,
            latest           : props.latest,
            latestTotal      : props.latestTotal,
            latestLimit      : props.latestLimit,
            categories       : props.categories
        }
    }

    render(){

        const { location } = this.props;
        const { kv, store, categories, latest, latestTotal, latestLimit, latestHasMore } = this.state;

        return(
            <React.Fragment>
                <Helmet encodeSpecialCharacters={false}>
                    <title>{`網紅電商 KOL Mall | 網紅來幫你賣`}</title>
                    <meta name="keywords"    content={`網紅電商,網紅獵人,找網紅就是快,幫你賣,電商,網購,網紅`} />
                    <meta name="description" content="網紅電商結合時下熱門網紅幫你推銷商品，讓消費者可透過網紅電商用最划算的價格買到所有需要、想要的商品，包含美妝保健、流行服飾配件、母嬰居家、美食旅遊票券、3C家電影音等千萬件熱銷好物等你來選購" />
                </Helmet>
                <Kv data={kv} />
                <Store data={store}/>
                {/* <Category data={categories}/> */}
                <Product
                    location  = {location}
                    data      = {latest}
                    total     = {latestTotal}
                    limit     = {latestLimit}
                    hasMore   = {latestHasMore}
                    loadMore  = {this.loadMore.bind(this)}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { location }  = this.props;
        const { pathname }  = location;
        this.props.dispatch( getHome(pathname,{}) );
    }

    loadMore = () => {
        const { latest, latestTotal } = this.state;
        const { location, history }   = this.props;
        const { search }              = location;
        const { latestCurrent=1 }     = queryString.parse( search );

        if( latest.length<=latestTotal ){
            history.push({
                search  : queryString.stringify({
                    ...queryString.parse(search),
                    latestCurrent : Number(latestCurrent)+1
                })
            });

        }
    }
}

const mapStateToProps = state => {
    return{
        kv           : state.home.kv,
        store        : state.home.recommendStoreList,
        latest       : state.home.latest,
        latestTotal  : state.home.latestTotal,
        latestLimit  : state.home.latestLimit,
        categories   : state.common.categoriesList,
    }
}

export default connect( mapStateToProps )( Home );