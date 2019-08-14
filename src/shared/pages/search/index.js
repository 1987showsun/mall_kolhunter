import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Compoents
import Breadcrumbs from './breadcrumbs';
import BlockList from '../../module/blockList';
import StoreItem from '../../module/item/store';
import ProductItem from '../../module/item/product';
import Loading from '../../module/loading/mallLoading';

// Actions
import {searchList, ssrSearchList} from '../../actions/search';

const initQuery = {
    page: 1,
    limit: 30,
    sort: "desc",
    sortBy: "created"
}

class Index extends React.Component{

    static initialAction( NODE_ENV,pathname,query ) {
        console.log('--->',pathname,query);
        query = {
            ...initQuery,
            ...query
        }
        return ssrSearchList( NODE_ENV,pathname,query );
    }

    constructor(props){
        const { location } = props;
        const search = queryString.parse(location['search']);
        super(props);
        this.state = {
            loading: false,
            type: search['type'] || "product",
            keyword: search['keyword'] || "",
            data: props.searchList,
        }
    }

    static getDerivedStateFromProps( props, state) {
        const { location } = props;
        const search = queryString.parse(location['search']);
        const type = search['type'];
        const keyword = search['keyword'];
        if( type!=state.type || keyword!=state.keyword ){
            return{
                type: search['type'] || "product",
                keyword: search['keyword'] || ""
            }
        }
        return {
            data: props.searchList
        };
    }

    render(){

        const { loading, data, type, keyword } = this.state;

        return(
            <React.Fragment>
                <div className="row">
                    <section className="container main-content">
                        <section className="container-col" data-flexdirection="column" >
                            <Breadcrumbs keyword={keyword}/>
                            {
                                data.length==0? (
                                    <div>無可搜尋資料</div>
                                ):(
                                    <BlockList className={`${type}-card`}>
                                        {
                                            data.map( (item,i)=> {
                                                if( type == 'product' ){
                                                    return (
                                                        <li key={item['id']}>
                                                            <ProductItem
                                                                path={`/approach/${item['id']}`}
                                                                data={item}
                                                            />
                                                        </li>
                                                    );
                                                }else{
                                                    return (
                                                        <li key={item['id']}>
                                                            <StoreItem 
                                                                path={`/store/${item['id']}`}
                                                                data={item}
                                                            />
                                                        </li>
                                                    );
                                                }
                                            })
                                        }
                                    </BlockList>
                                )
                            }
                            <Loading loading={loading}/>
                        </section>
                    </section>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { location } = this.props;
        const { pathname } = location;
        const search = {...initQuery,...queryString.parse(location['search'])};
        this.setState({
            loading: true,
        },()=>{
            this.props.dispatch( searchList(pathname,search) ).then( res => {
                this.setState({
                    loading: false,
                })
            });
        })
    }

    componentDidUpdate( prevProps,prevState ) {
        if( prevState['keyword']!=this.state.keyword || prevState['type']!=this.state.type ){
            const { location } = this.props;
            const { pathname } = location;
            const search = {...initQuery,...queryString.parse(location['search'])};
            this.setState({
                loading: true,
            },()=>{
                this.props.dispatch( searchList(pathname,search) ).then( res => {
                    this.setState({
                        loading: false,
                    })
                });
            })
        }
    }
}

const mapStateToProps = state => {
    return{
        searchList: state.search.list
    }
}

export default connect( mapStateToProps )( Index );