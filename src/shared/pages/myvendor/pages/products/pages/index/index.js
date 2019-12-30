/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                                         from 'react';
import toaster                                       from 'toasted-notes';
import queryString                                   from 'query-string';
import { connect }                                   from 'react-redux';
import { Helmet }                                    from "react-helmet";

//Components
import Head                                          from './head';
import Thead                                         from './table/thead';
import Tbody                                         from './table/tbody';

// Modules
import Table                                         from '../../../../../../module/table-new';
import Pagination                                    from '../../../../../../module/pagination';
import Loading                                       from '../../../../../../module/loading';

// Actions
import { listProduct, productPutsaleAndDiscontinue } from '../../../../../../actions/myvendor';

// Lang
import lang                                          from '../../../../../../public/lang/lang.json';

class Product extends React.Component{

    constructor(props){        
        super(props);
        this.state = {
            loading       : false,
            tableBodyData : props.list,
            noneDisplay   : props.noneDisplay,
            display       : props.display,
            review        : props.review,
            total         : props.total,
        }
    }

    static getDerivedStateFromProps ( props,state ){
        return{
            noneDisplay    : props.noneDisplay,
            display        : props.display,
            review         : props.review,
            total          : props.total,
            tableBodyData  : props.list
        }
    }

    render(){

        const { loading, total, tableBodyData } = this.state;
        const { match, location, history }      = this.props;
        const { search } = location;

        return(
            <React.Fragment>
                <Helmet encodeSpecialCharacters={false}>
                    <title>{`網紅電商廠商管理介面 - 商品列表`}</title>
                </Helmet>

                <section className="page-title">
                    <h3>{ lang['zh-TW']['Commodity management'] }</h3>
                </section>

                <Head
                    match              = {match} 
                    history            = {history}
                    location           = {location}
                />

                <section className="admin-content-row">
                    <Table
                        className = "v-product-table"
                        thead     = {<Thead />}
                    >
                        {
                            tableBodyData.map(item => {
                                return(
                                    <Tbody 
                                        {...item}
                                        key={item['id']} 
                                        tableButtonAction = {this.tableButtonAction.bind(this)}
                                    />
                                );
                            })
                        }
                    </Table>

                    <Loading 
                        loading             = {loading}
                    />
                </section>

                <Pagination
                    query              = {{...queryString.parse( search )}}
                    total              = {total}
                    match              = {match}
                    location           = {location}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.getProductList();
    }

    componentDidUpdate(prevProps, prevState) {
        return null;
    }
    
    getSnapshotBeforeUpdate(prevProps, prevState){
        const prevlocationSearch = prevProps.location['search'];
        const locationSearch     = this.props.location['search'];
        if( prevlocationSearch!=locationSearch ){
            this.getProductList();
        }
        return null;
    }

    getProductList = () => {
        const { location }         = this.props;
        const { pathname, search } = location;
        this.setState({
            loading: true
        },()=>{
            clearTimeout( this.delay );
            this.delay = setTimeout(()=>{
                this.props.dispatch( listProduct(pathname,{ ...queryString.parse(search) }) ).then( res => {
                    this.setState({
                        loading: false
                    })
                });
            },2000);
        })
    }

    tableButtonAction = ( val ) => {
        
        const { noneDisplay, display, review, total, tableBodyData } = this.state;
        const { location }           = this.props;
        const { pathname, search }   = location;
        const mergeData              = {
            noneDisplay, 
            display, 
            review,
            total,
            tableBodyData
        }

        this.setState({
            loading: true
        },()=>{
            this.props.dispatch( productPutsaleAndDiscontinue(pathname, {...queryString.parse(search)}, {productToken: val['id'], productDisplay: val['display']? false:true}, mergeData) ).then( res => {
                this.setState({
                    loading: false
                },()=>{
                    let status      = "failure";
                    let status_text = "變更失敗";

                    if( res['status']==200 ){
                        status      = 'success';
                        status_text = '變更成功';
                    }

                    toaster.notify(
                        <div className={`toaster-status ${status}`}>{status_text}</div>
                    ,{
                        position: 'bottom-right',
                        duration: 3000
                    });
                });
            });
        });
    }
}

const mapStateToProps = (state) => {
    return{
        noneDisplay    : state.myvendor.productStatus.noneDisplay,
        display        : state.myvendor.productStatus.display,
        review         : state.myvendor.productStatus.review,
        total          : state.myvendor.productStatus.total,
        list           : state.myvendor.productList
    }
}

export default connect(mapStateToProps)(Product);