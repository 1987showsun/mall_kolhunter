/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

// Stylesheets
import './style.scss';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            max : 10,
            className: props.className || 'nromal',
            pageNumber: [],
            method: props.method || 'normal',
            query: props.query || {},
            current: Number( props.current ) || 1,
            limit: Number( props.limit ) || 30,
            total: Number( props.total ) || 0
        }
    }

    static getDerivedStateFromProps( props,state ){
        return {
            current: Number( props.current ) || 1,
            limit: Number( props.limit ) || 30,
            total: Number( props.total ) || 0
        }
    }

    render(){

        const { location } = this.props;
        const { pathname, search } = location;
        const { className, total, method, query } = this.state;
        const searchObject = queryString.parse(search);
        const limit        = Number(searchObject['limit']) || this.state.limit;
        const current      = Number(searchObject['page']) || this.state.current;
        const pageVal      = Math.ceil(total/limit);

        if( method=='normal' ){
            return(
                <div className={`pagination-wrap ${className}`}>
                    <ul>{this.totalPage()}</ul>
                </div>
            );
        }else{
            return(
                <div className={`pagination-wrap ${className}`}>
                    {
                        pageVal<=current?(
                            <div className="noData">暫無更多資料</div>
                        ):(
                            <Link className="loadMore" to={{
                                pathname: pathname,
                                search: `?${ queryString.stringify({...searchObject,page: current+1}) }`,
                                hash: "",
                            }}>載入更多</Link>
                        )
                    }
                </div>
            );
        }
    }

    totalPage = () => {
        const { location }          = this.props;
        const { pathname, search }  = location;
        const { max, total, query } = this.state;
        const searchObject          = queryString.parse(search);
        const limit                 = Number(searchObject['limit']) || this.state.limit;
        const current               = Number(searchObject['page'])  || this.state.current;
        const pageVal               = Math.ceil(total/limit)==0? 1 : Math.ceil(total/limit);
        let pageNumber              = [ ...this.state.pageNumber ];

        if( pageVal>max ){

            for( let i=0 ; i<10 ; i++ ){
                let page = i+1;
                pageNumber = [
                    ...pageNumber,
                    <li key={i} className={`${current==page}`}>
                        <Link to={{
                            pathname   : pathname,
                            search     : `?${ queryString.stringify({ ...query, ...searchObject, page}) }`,
                            hash       : "",
                        }}>
                            {i+1}
                        </Link>
                    </li>
                ]
            }

            // if( current<(pageVal-max) ){
            //     let page = pageVal;
            //     pageNumber = [
            //         ...pageNumber,
            //             <li>...</li>
            //         ,
            //         <li key={pageVal} className={`${current==(pageVal-1)}`}>
            //             <Link to={{
            //                 pathname   : pathname,
            //                 search     : `?${ queryString.stringify({ ...query, ...searchObject, page}) }`,
            //                 hash       : "",
            //             }}>
            //                 {pageVal}
            //             </Link>
            //         </li>
            //     ]
            // }else if( current>(pageVal-max) ){
            //     for( let i=pageVal ; i>(pageVal-max) ; i-- ){
            //         let page = pageVal - (pageVal-i);
            //         pageNumber = [
            //             ...pageNumber,
            //                 <li>...</li>
            //             ,
            //             <li key={pageVal} className={`${current==(pageVal-1)}`}>
            //                 <Link to={{
            //                     pathname   : pathname,
            //                     search     : `?${ queryString.stringify({ ...query, ...searchObject, page}) }`,
            //                     hash       : "",
            //                 }}>
            //                     {pageVal}
            //                 </Link>
            //             </li>
            //         ]
            //     }
            // }
        }else{
            for( let i=0 ; i<pageVal ; i++ ){
                let page = i+1;
                pageNumber = [
                    ...pageNumber,
                    <li key={i} className={`${current==page}`}>
                        <Link to={{
                            pathname: pathname,
                            search: `?${ queryString.stringify({ ...query, ...searchObject, page}) }`,
                            hash: "",
                        }}>
                            {i+1}
                        </Link>
                    </li>
                ]
            }
        }
        return pageNumber;
    }
}