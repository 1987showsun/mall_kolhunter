/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React             from 'react';
import queryString       from 'query-string';
import ReactPaginate     from 'react-paginate';

// Stylesheets
import './public/stylesheets/style.scss';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            className     : props.className         || 'nromal',
            pageNumber    : [],
            method        : props.method            || 'normal',
            query         : props.query             || {},
            current       : Number( props.current ) || 1,
            limit         : Number( props.limit )   || 30,
            total         : Number( props.total )   || 0
        }
    }

    static getDerivedStateFromProps( props,state ){
        return {
            current: Number( props.current ) || 1,
            limit  : Number( props.limit )   || 30,
            total  : Number( props.total )   || 0
        }
    }

    render(){

        const { location } = this.props;
        const { search }   = location;
        const { total }    = this.state;
        const searchObject = queryString.parse(search);
        const limit        = Number(searchObject['limit']) || this.state.limit;
        const current      = Number(searchObject['page'])  || this.state.current;
        const pageVal      = Math.ceil(total/limit)==0? 1:Math.ceil(total/limit);

        return(
            <ReactPaginate
                previousLabel          ={'<'}
                nextLabel              ={'>'}
                breakLabel             ={'...'}
                breakClassName         ={'break-me'}
                pageCount              ={pageVal}
                initialPage            ={current-1}
                marginPagesDisplayed   ={1}
                pageRangeDisplayed     ={4}
                onPageChange           ={this.handlePageClick.bind(this)}
                containerClassName     ={'pagination'}
                subContainerClassName  ={'pages pagination'}
                activeClassName        ={'active'}
            />
        );
    }

    handlePageClick = ( val ) => {
        const { location, history } = this.props;
        const { pathname, search } = location;
        const { selected } = val;
        history.push({
            pathname : pathname,
            search   : queryString.stringify({
                ...queryString.parse(search),
                page : selected+1
            })
        })
    }
}