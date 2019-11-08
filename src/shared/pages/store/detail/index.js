/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React              from 'react';
import queryString        from 'query-string';
import CurrencyFormat     from 'react-currency-format';
import { Helmet }         from "react-helmet";
import { connect }        from 'react-redux';

// Components
import Filter             from './components/filter';
import Header             from './components/header';
import Breadcrumbs        from './components/breadcrumbs';

// Mudules
import Item               from '../../../module/item/product';
import BlockList          from '../../../module/blockList';
import Loading            from '../../../module/loading/mallLoading';
import Pagination         from '../../../module/pagination';

// Actions
import { ssrStoreDetail, storeProduct, storeInfo } from '../../../actions/store';

// Stylesheets
import './public/stylesheets/style.scss';

class Index extends React.Component{

    static initialAction( NODE_ENV,pathname,query ) {
        const pathnameArray = pathname.split('/').filter( item => item!="" );
        query = { ...query, store: pathnameArray[1] }
        return ssrStoreDetail( NODE_ENV,pathname,query );
    }

    constructor(props){
        super(props);
        this.state = {
            coverLoading    : false,
            productLoading  : false,
            current         : props.current,
            total           : props.total,
            limit           : props.limit,
            info            : props.info,
            list            : props.productList
        }
    }

    static getDerivedStateFromProps(props,state){
        return{
            current         : props.current,
            total           : props.total,
            limit           : props.limit,
            info            : props.info,
            list            : props.productList
        }
    }

    render(){

        const { match, location } = this.props;
        const { coverLoading, productLoading, current, total, limit, info, list } = this.state;
        const url   = typeof window!="undefined"? window.location.href:'';
        const store = match['params']['id'];

        return(
            <React.Fragment>
                <Helmet encodeSpecialCharacters={false}>
                    <title>{`網紅電商 KOL Mall | 你的商品網紅幫你賣 - ${info['name']},網紅店舖`}</title>
                    <meta name="keywords"                  content={`網紅電商,網紅獵人,找網紅就是快,幫你賣,電商,網購,網紅,店舖`} />
                    <meta name="description"               content={`${info['description']}網紅電商結合時下熱門網紅幫你推銷商品，讓消費者可透過網紅電商用最划算的價格買到所有需要、想要的商品，包含美妝保健、流行服飾配件、母嬰居家、美食旅遊票券、3C家電影音等千萬件熱銷好物等你來選購`} />
                    {/* Facebook Card data */}
                    <meta property="og:url"                content={url} />
                    <meta property="og:type"               content="article" />
                    <meta property="og:title"              content={`網紅電商 - ${info['name']}網紅店舖`} />
                    <meta property="og:description"        content={`${info['description']}網紅電商結合時下熱門網紅幫你推銷商品，讓消費者可透過網紅電商用最划算的價格買到所有需要、想要的商品，包含美妝保健、流行服飾配件、母嬰居家、美食旅遊票券、3C家電影音等千萬件熱銷好物等你來選購`} />
                    <meta property="og:image"              content={`${info['cover']}`} />
                    {/* Twitter Card data */}
                    <meta name="twitter:title"             content={`網紅電商 - ${info['name']}網紅店舖`} /> 
                    <meta name="twitter:description"       content={`${info['description']}網紅電商結合時下熱門網紅幫你推銷商品，讓消費者可透過網紅電商用最划算的價格買到所有需要、想要的商品，包含美妝保健、流行服飾配件、母嬰居家、美食旅遊票券、3C家電影音等千萬件熱銷好物等你來選購`} /> 
                    <meta name="twitter:creator"           content="sun li" /> 
                    <meta name="twitter:image:src"         content={`${info['cover']}`} />
                </Helmet>
                <Header 
                    info        = {info}
                    productTotal= {total}
                    loading     = {coverLoading}
                />
                <div className="row">
                    <section className="container main-content">
                        {/* <Filter
                            history= {history}
                            match= {match}
                            location= {location}
                        /> */}
                        <section className="container-col" data-flexdirection="column" >
                            <Breadcrumbs name={info['name']}/>
                            <BlockList className="product-card">
                                {
                                    list.length!=0? (
                                        list.map( item => {
                                            return(
                                                <li key={item['token']}>
                                                    <Item path={`/detail/${item['token']}?store=${store}`} data={item}/>
                                                </li>
                                            )
                                        })
                                    ):(
                                        <div className="noData">此店舖無可購買商品</div>
                                    )
                                }
                                <Loading loading={productLoading} />
                            </BlockList>
                            <Pagination
                                query= {{...queryString.parse(location['search'])}}
                                current= {current}
                                limit= {limit}
                                total= {total}
                                location= {location}
                            />
                        </section>
                    </section>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { location, match } = this.props;
        const { pathname } = location;
        this.setState({
            coverLoading: true
        },()=>{
            this.props.dispatch( storeInfo(pathname, { store: match['params']['id'] }) ).then( res => {
                this.setState({
                    coverLoading: false,
                })
            });
        });
        this.callAPI();
    }

    componentDidUpdate(prevProps, prevState) {
        const searchObject = queryString.parse(this.props.location.search);
        const prevSearchObject = queryString.parse(prevProps.location.search);
        let reloadStatus = false;
        
        if( Object.keys(searchObject).length>Object.keys(prevSearchObject).length ){
            reloadStatus =  Object.keys(searchObject).some( keys => {
                return searchObject[keys]!=prevSearchObject[keys];
            });
        }else{
            reloadStatus = Object.keys(prevSearchObject).some( keys => {
                return prevSearchObject[keys]!=searchObject[keys];
            });
        }

        if( reloadStatus ){
            this.callAPI();
        }
    }

    callAPI = () => {
        const { location, match } = this.props;
        const { pathname, search } = location;
        const store = match['params']['id'];
        this.setState({
            productLoading: true
        },()=>{
            this.props.dispatch( storeProduct(pathname,{...queryString.parse(search), store}) ).then( res => {
                this.setState({
                    productLoading: false,
                })
            });
        })
    }
}

const mapStateToProps = state => {
    return{
        current       : state.store.current,
        total         : state.store.total,
        limit         : state.store.limit,
        info          : state.store.info,
        productList   : state.store.product
    }
}

export default connect( mapStateToProps )( Index );