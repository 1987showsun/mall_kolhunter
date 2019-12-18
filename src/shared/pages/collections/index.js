/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React,{ useState, useEffect } from 'react';
import queryString                   from 'query-string';
import { connect }                   from 'react-redux';

// Components
import Breadcrumbs                   from './components/breadcrumbs';

// Modules
import Pagination                    from '../../module/newPagination';
import Loading                       from '../../module/loading/mallLoading';
import BlockList                     from '../../module/blockList';
import Item                          from '../../module/item/product';


// Actions
import { collections }               from '../../actions/collections';

const Index = ({ location, history, dispatch, limit, total, list }) => {

    const { pathname, search }          = location;
    const { page=1 }                    = queryString.parse(search);
    const [ statesLoading, setLoading ] = useState(false);

    useEffect(()=>{
        const { pathname, search } = location;
        const { page=1 }           = queryString.parse(search);
        setLoading(true)
        dispatch( collections(pathname, {page}) ).then( res => {
            setLoading(false);
        });

    },[search]);

    return(
        <>
            <div className="row">
                <section className="container main-content">
                    <section className="container-col" data-flexdirection="column" >
                        <Breadcrumbs />
                        <BlockList className="product-card">
                            {
                                list.map( item => {
                                    return(
                                        <li key={item['token']}>
                                            <Item  path={`/detail/${item['token']}`} data={item}/>
                                        </li>
                                    );
                                })
                            }
                        </BlockList>
                        <Pagination
                            query    = {{...queryString.parse(search)}}
                            current  = {page}
                            limit    = {limit}
                            total    = {total}
                            history  = {history}
                            location = {location}
                        />
                        <Loading loading={statesLoading} />
                    </section>
                </section>
            </div>
        </>
    );
}

Index.initialAction = (pathname,query) => {
    const { page=1 } = query;
    return collections(pathname, {page});
}

const mapStateToProps = state => {
    return{
        limit : state.collections.limit,
        total : state.collections.total,
        list  : state.collections.list
    }
}

export default connect( mapStateToProps )( Index );