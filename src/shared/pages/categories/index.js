import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";

// Components
import Filter from './filter/';
import Breadcrumbs from './breadcrumbs';

// Modules
import Item from '../../module/item/product';
import Loading from '../../module/loading/mallLoading';
import BlockList from '../../module/blockList';
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
            loading: false,
            current: props.current,
            total: props.total,
            limit: props.limit,
            data: props.list
        }
    }

    static getDerivedStateFromProps( props,state ) {
        return{
            current: props.current,
            total: props.total,
            limit: props.limit,
            data: props.list
        }
    }

    render(){
        
        const { match, location, history } = this.props;
        const { loading, current, limit, total, data } = this.state;

        return(
            <React.Fragment>
                <Helmet encodeSpecialCharacters={false}>
                    <title>{`網紅電商 - `}</title>
                    <meta name="keywords" content={`網紅電商 - }`} />
                    <meta name="description" content={``} />
                </Helmet>
                <div className="row">
                    <section className="container main-content">
                        <Filter
                            history= {history}
                            match= {match}
                            location= {location}
                        />
                        <section className="container-col" data-flexdirection="column" >
                            <Breadcrumbs
                                history= {history}
                                match= {match}
                                location= {location}
                            />
                            <BlockList className="product-card">
                                {
                                    data.map( item => {
                                        return(
                                            <li key={item['token']}>
                                                {/* <Item path={`/approach/${item['token']}`} data={item}/> */}
                                                <Item path={`/detail/${item['token']}`} data={item}/>
                                            </li>
                                        )
                                    })
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
        current: state.categories.current,
        total: state.categories.total,
        limit: state.categories.limit,
        list: state.categories.list
    }
}

export default connect( mapStateToProps )( Index );