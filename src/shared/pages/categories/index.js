import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

// Components
import Filter from './filter/';
import Breadcrumbs from './breadcrumbs';

// Modules
import Item from '../../module/item/product';
import Loading from '../../module/loading/mallLoading';
import BlockList from '../../module/blockList';
import Pagination from '../../module/pagination';

// Actions
import { productList, mallCategories, ssrProductList } from '../../actions/categories';

const initQuery = {
    page: 1,
    limit: 30,
    sort: "desc",
    sortBy: "created"
}

class Index extends React.Component{

    static initialAction( NODE_ENV,pathname,query ) {
        query = {
            ...initQuery,
            ...query
        }
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
        const { pathname } = location;
        const query = { ...initQuery, ...queryString.parse(location['search']) }

        return(
            <React.Fragment>
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
                                            <li key={item['id']}>
                                                <Item path={`/approach/${item['id']}`} data={item}/>
                                            </li>
                                        )
                                    })
                                }
                            </BlockList>
                            <Pagination
                                query= {query}
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
        const { location } = this.props;
        this.props.dispatch( mallCategories() );
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
        const { location } = this.props;
        const query = { ...initQuery, ...queryString.parse(location['search']) };
        const pathname = location['pathname'];
        this.setState({
            loading: true
        },() => {
            this.props.dispatch( productList(pathname,query) ).then( res => {
                this.setState({
                    loading: false
                })
            });
        })
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