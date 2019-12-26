/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                  from 'react';
import dayjs                  from 'dayjs';
import queryString            from 'query-string';
import { connect }            from 'react-redux';

// Components
import Head                   from './head';
import Thead                  from './table/thead';
import Tbody                  from './table/tbody';

// Modules
import Table                  from '../../../../../../module/table-new';
import Pagination             from '../../../../../../module/pagination';
import Loading                from '../../../../../../module/loading';
import Confirm                from '../../../../../../module/confirm';

// Actions
import { orderList }          from '../../../../../../actions/myvendor';

// Lang
import lang                   from '../../../../../../public/lang/lang.json';

class Order extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading           : false,
            list              : props.list,
            open              : false,
            method            : 'alert',
            popupMSG          : [],
        }
    }

    static getDerivedStateFromProps ( props,state ){
        return{
            total             : props.total,
            totalAmount       : props.totalAmount,
            list              : props.list
        }
    }

    render(){

        const { open, method, popupMSG, loading, total, totalAmount, list } = this.state;
        const { match, history, location } = this.props;

        return(
            <React.Fragment>
                <section className="page-title">
                    <h3>{ lang['zh-TW']['Order management'] }</h3>
                </section>
                <Head 
                    match          = {match}
                    history        = {history}
                    location       = {location}
                    total          = {total}
                    totalAmount    = {totalAmount}
                    returnDownload = {(val) => {
                        this.setState({
                            ...val
                        })
                    }}
                />
                <section className="admin-content-row">
                    <Table
                        thead = {<Thead />}
                    >
                        {
                            list.map( item => {
                                return <Tbody key={item['orderID']} {...item}/>
                            })
                        }
                    </Table>
                    <Loading 
                        loading          = {loading}
                    />
                </section>
                <Pagination 
                    total           = {total}
                    match           = {match}
                    location        = {location}
                />
                <Confirm
                    open            = {open}
                    method          = {method}
                    container       = {popupMSG}
                    onCancel        = {() => {
                        this.setState({
                            open            : false,
                            popupMSG        : []
                        })
                    }}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.callAPI();
    }

    componentDidUpdate(prevProps, prevState) {
        const search = queryString.parse(this.props.location.search);
        const prevSearch = queryString.parse(prevProps.location.search);
        let checkQueryIsDifferent = false;
        if( Object.keys(search).length>Object.keys(prevSearch).length ){
            checkQueryIsDifferent = Object.keys(search).some( keys => {
                return search[keys]!=prevSearch[keys];
            })
        }else{
            checkQueryIsDifferent = Object.keys(prevSearch).some( keys => {
                return prevSearch[keys]!=search[keys];
            })
        }
        
        if( checkQueryIsDifferent ){
            this.callAPI();
        }
    }
    
    callAPI = () => {
        const { location }         = this.props;
        const { pathname, search } = location;
        const searchObject         = queryString.parse(search);
        const initQuery            = {
            startDate      : searchObject['startDate'] || dayjs().format('YYYY-MM-DD'),
            endDate        : searchObject['endDate']   || dayjs().format('YYYY-MM-DD')
        }

        this.setState({
            loading: true,
        },()=> {
            this.props.dispatch( orderList(pathname,{...initQuery, ...queryString.parse(search)}) ).then( res => {
                this.setState({
                    loading: false,
                });
            });
        })
    }
}

const mapStateToProps = (state) => {
    return{
        total        : state.myvendor.orderStatus['total'],
        totalAmount  : state.myvendor.orderStatus['totalAmount'],
        list         : state.myvendor.orderList
    }
}

export default connect(mapStateToProps)(Order);