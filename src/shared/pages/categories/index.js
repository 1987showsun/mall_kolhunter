/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React        from 'react';
import queryString  from 'query-string';
import { connect }  from 'react-redux';
import { Helmet }   from "react-helmet";

// Components
import Filter      from './components/filter';
//import MobileNav   from './components/mobileNav/mobileNav';
import Breadcrumbs from './components/breadcrumbs';

// Modules
import Item       from '../../module/item/product';
import Loading    from '../../module/loading/mallLoading';
import BlockList  from '../../module/blockList';
import Pagination from '../../module/pagination';

// Actions
import { mallDelivery } from '../../actions/common';
import { productList, ssrProductList } from '../../actions/categories';

class Index extends React.Component{

    static initialAction( NODE_ENV,pathname,query ) {
        return ssrProductList( NODE_ENV,pathname,query );
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
        const { main, sub }   = match['params'];
        const mainTitleObject = categories.filter( filterItem => filterItem['id']==main );
        const subTitleObject  = mainTitleObject[0]['children'].filter( filterItem => filterItem['id']==sub);
        const mainTitle = mainTitleObject.length>0? mainTitleObject[0]['title']:"";
        const subTitle  = subTitleObject.length>0?  subTitleObject[0]['title'] :"";

        return(
            <React.Fragment>
                <Helmet encodeSpecialCharacters={false}>
                    <title>{`網紅電商 KOL Mall | 你的商品網紅幫你賣 - ${mainTitle},${subTitle}`}</title>
                    <meta name="keywords" content={`網紅電商 - 網紅電商,網紅獵人,找網紅就是快,幫你賣,電商,網購,網紅,${mainTitle},${subTitle} }`} />
                    <meta name="description" content={`網紅電商結合時下熱門網紅幫你推銷商品，讓消費者可透過網紅電商用最划算的價格買到所有需要、想要的商品，包含美妝保健、流行服飾配件、母嬰居家、美食旅遊票券、3C家電影音等千萬件熱銷好物等你來選購`} />
                </Helmet>
                <div className="row">
                    <section className="container main-content">
                        <Filter
                            history     = {history}
                            match       = {match}
                            location    = {location}
                        />
                        <section className="container-col" data-flexdirection="column" >
                            {/* <MobileNav 
                                history    = {history}
                                match      = {match}
                                location   = {location}
                            /> */}
                            <Breadcrumbs
                                history= {history}
                                match= {match}
                                location= {location}
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
                                            <div className="noData">該類別暫無任何商品</div>
                                    )
                                }
                            </BlockList>
                            <Pagination
                                query= {{...queryString.parse(location['search'])}}
                                current= {current}
                                limit= {limit}
                                total= {total}
                                location= {location}
                            />
                            <Loading loading={loading}/>
                        </section>
                    </section>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
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
        const subCategoryID = match['params']['sub'] || match['params']['main']; //如果沒有次選單 id 就取主選單 id 
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