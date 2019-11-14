/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                          from 'react';
import queryString                    from 'query-string';
import { connect }                    from 'react-redux';

// Compoents
import Breadcrumbs                    from './components/breadcrumbs';

// Modules
import Pagination                     from '../../module/pagination';
import BlockList                      from '../../module/blockList';
import StoreItem                      from '../../module/item/store';
import ProductItem                    from '../../module/item/product';
import Loading                        from '../../module/loading/mallLoading';

// Actions
import {searchList, ssrSearchList}    from '../../actions/search';

class Index extends React.Component{

    static initialAction( pathname,query ) {
        return ssrSearchList( pathname,query );
    }

    constructor(props){
        super(props);
        const { location } = props;
        const search       = queryString.parse(location['search']);
        this.state         = {
            loading          : false,
            type             : search['type']    || "product",
            keyword          : search['keyword'] || "",
            data             : props.searchList,
        }
    }

    static getDerivedStateFromProps( props, state) {

        const { location, total, current, searchList } = props;
        const { search }               = location;
        const query                    = queryString.parse(search);
        const { type, keyword }        = query;

        if( type!=state.type || keyword!=state.keyword ){
            return{
                type         : type         || "product",
                keyword      : keyword      || "",
                data         : searchList
            }
        }
        return {
            total          : total,
            current        : current,
            data           : searchList
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
                            <BlockList className={`${type}-card`}>
                                {
                                    data.length!=0?(
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
                                    ):(
                                        <div className="noData">該類別暫無任何商品</div>
                                    )
                                }
                            </BlockList>
                            <Pagination
                                total        = {total}
                                current      = {current}
                                location     = {location}
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
        const searchObject     = queryString.parse(this.props.location.search);
        const prevSearchObject = queryString.parse(prevProps.location.search);
        let reloadStatus       = false;
        
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

        const { location }         = this.props;
        const { pathname, search } = location;

        this.setState({
            loading: true,
        },()=>{
            this.props.dispatch( searchList(pathname, { ...queryString.parse(search) }) ).then( res => {
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