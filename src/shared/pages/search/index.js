import React from 'react';
import $ from 'jquery';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Compoents
import Breadcrumbs from './breadcrumbs';

// Modules
import Pagination from '../../module/pagination';
import BlockList from '../../module/blockList';
import StoreItem from '../../module/item/store';
import ProductItem from '../../module/item/product';
import Loading from '../../module/loading/mallLoading';

// Actions
import {searchList, ssrSearchList} from '../../actions/search';

class Index extends React.Component{

    static initialAction( NODE_ENV,pathname,query ) {
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
                keyword: search['keyword'] || "",
                data: props.searchList
            }
        }
        return {
            total: props.total,
            current: props.current,
            data: props.searchList
        };
    }

    render(){

        const { location } = this.props;
        const { current, total, loading, data, type, keyword } = this.state;

        return(
            <React.Fragment>
                <div className="row">
                    <section className="container main-content">
                        <section className="container-col" data-flexdirection="column" >
                            <Breadcrumbs keyword={keyword}/>
                            {
                                data.length==0? (
                                    // 沒有任何資料
                                    !loading &&
                                        // API調用完成後
                                        <div className="list-nodata" >無可搜尋資料</div>
                                ):(
                                    // 如有資料
                                    <BlockList className={`${type}-card`}>
                                        {
                                            data.map( (item,i)=> {
                                                if( type == 'product' ){
                                                    // 調用 Product items components
                                                    return (
                                                        <li key={item['token']}>
                                                            <ProductItem
                                                                path={`/detail/${item['token']}`}
                                                                data={item}
                                                            />
                                                        </li>
                                                    );
                                                }else{
                                                    // 調用 Store items components
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
                            <Pagination
                                total= {total}
                                current= {current}
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
        this.reCallAPI();
    }

    componentDidUpdate( prevProps,prevState ) {
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
            this.reCallAPI();
        }
    }

    reCallAPI = () => {
        const { location } = this.props;
        const { pathname } = location;
        const search = { ...queryString.parse(location['search']) };
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

const mapStateToProps = state => {
    return{
        total       : state.search.total,
        current     : state.search.current,
        searchList  : state.search.list
    }
}

export default connect( mapStateToProps )( Index );