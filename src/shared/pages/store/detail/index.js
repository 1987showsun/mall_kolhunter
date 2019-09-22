import React from 'react';
import $ from 'jquery';
import queryString from 'query-string';
import CurrencyFormat from 'react-currency-format';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';

// Components
import Filter from './filter';
import Breadcrumbs from './breadcrumbs';

// Mudules
import Item from '../../../module/item/product';
import BlockList from '../../../module/blockList';
import Loading from '../../../module/loading/mallLoading';
import Pagination from '../../../module/pagination';

// Actions
import { ssrStoreDetail, storeProduct, storeInfo } from '../../../actions/store';

// Stylesheets
import './public/stylesheets/style.scss';

class Index extends React.Component{

    static initialAction( NODE_ENV,pathname,query ) {
        const pathnameArray = pathname.split('/').filter( item => item!="" );
        query = { ...query, id: pathnameArray[1] }
        return ssrStoreDetail( NODE_ENV,pathname,query );
    }

    constructor(props){
        super(props);
        this.state = {
            coverLoading: false,
            productLoading: false,
            current: props.current,
            total: props.total,
            limit: props.limit,
            info: props.info,
            list: props.productList
        }
    }

    static getDerivedStateFromProps(props,state){
        return{
            current: props.current,
            total: props.total,
            limit: props.limit,
            info: props.info,
            list: props.productList
        }
    }

    render(){

        const { match, location, history } = this.props;
        const { coverLoading, productLoading, current, total, limit, info, list } = this.state;
        const store = match['params']['id'];

        return(
            <React.Fragment>
                <Helmet encodeSpecialCharacters={false}>
                    <title>{`網紅電商,網紅店舖 - `}</title>
                    <meta name="keywords" content={`網紅電商,網紅獵人,找網紅就是快,幫你賣,電商,網購}`} />
                    <meta name="description" content={``} />
                </Helmet>
                <div className="row store-cover-wrap">
                    <div className="store-cover-background-img" style={{backgroundImage: `url(${info['cover']})`}}></div>
                    <section className="container store-cover">
                        <figure>
                            <div className="figure-img">
                                <img src={info['photo']} alt="" title="" />
                            </div>
                            <figcaption>
                                <div className="name">
                                    <h2>{info['name']}</h2>
                                </div>
                                <div className="figcaption-row">
                                    <ul className="figcaption-info-ul">
                                        <li>
                                            <div className="figcaption-ul-head">總成交數</div>
                                            <div className="figcaption-ul-content">
                                                <CurrencyFormat value={13456981} displayType={'text'} thousandSeparator={true} />
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
                    <Loading loading={coverLoading} />
                </div>
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
        const { pathname, search } = location;
        this.setState({
            coverLoading: true
        },()=>{
            this.props.dispatch( storeInfo(pathname, { id: match['params']['id'] }) ).then( res => {
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
            $('#root').animate({ scrollTop: 0 }, 'fast');
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
        current: state.store.current,
        total: state.store.total,
        limit: state.store.limit,
        info : state.store.info,
        productList: state.store.product
    }
}

export default connect( mapStateToProps )( Index );