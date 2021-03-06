/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import $                     from 'jquery';
import React                 from 'react';
import toaster               from 'toasted-notes';
import queryString           from 'query-string';
import { connect }           from 'react-redux';

// Components
import Cover                 from './components/header';

// Modules
import Table                 from '../../../../module/table';
import Loading               from '../../../../module/loading/mallLoading';
import Pagination            from '../../../../module/newPagination';

// Actions
import { mystoreStoreInfo, mystoreStoreProductList, mystoreStoreProductRemove } from '../../../../actions/mystore';

// Set
import tableHeadData         from '../../public/setup/tableHeadData';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading           : false,
            storeInfo         : props.storeInfo,
            total             : props.total,
            limit             : props.limit,
            current           : props.current,
            tableHeadData     : tableHeadData['store'],
            tableBodyData     : props.productList
        }
    }

    static getDerivedStateFromProps( props,state ){
        return {
            storeInfo         : props.storeInfo,
            total             : props.total,
            limit             : props.limit,
            current           : props.current,
            tableBodyData     : props.productList
        }
    }

    render(){

        const { location, history } = this.props;
        const { loading, storeInfo, total, limit, current, tableHeadData, tableBodyData } = this.state;
        const { search }    = location;
        const pathname      = location['pathname'].split('/').filter( filterItem => filterItem!='' );
        const productList   = tableBodyData.map( item => {
            return{
                id          : item['id'],
                search      : '?store='+storeInfo['storeToken'],
                status      : [<button key={`status-on_`} className="status-on" onClick={this.tableButtonAction.bind(this,item)}>?????????</button>],
                image       : item['image'],
                name        : item['name'],
                price       : item['price'],
                sellPrice   : item['sellPrice'],
                kolFee      : item['kolFee']
            }
        })

        return(
            <React.Fragment>
                <section className="container-unit none-padding">
                    <Cover 
                        className= "mystore"
                        data= {storeInfo}
                        productTotal= {total}
                        actionSwitchDisplay= {false}
                        editFormDisplay={ pathname[0]=='mystore' }
                    />
                </section>
                <section className="container-unit relative">
                    <Table 
                        tableHeadData= {tableHeadData}
                        tableBodyData= {productList}
                    />
                    <Loading 
                        loading= {loading}
                    />
                </section>
                <Pagination
                    query    = {{...queryString.parse(search)}}
                    current  = {current}
                    limit    = {limit}
                    total    = {total}
                    history  = {history}
                    location = {location}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const { location, match } = this.props;
        const { pathname, search } = location;
        this.props.dispatch( mystoreStoreInfo(pathname, {...queryString.parse(), store: match['params']['id']}) );
        this.reCallAPI();
    }

    componentDidUpdate(prevProps, prevState) {
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

    tableButtonAction = ( val ) => {
        const { location } = this.props;
        const { pathname, search } = location;
        const data = { productID: val['id'] };
        this.setState({
            loading: true
        },()=>{
            this.props.dispatch( mystoreStoreProductRemove(pathname, queryString.parse(search), data) ).then( res => {
                switch( res['status'] ){
                    case 200:
                        $(`#${val['id']}`).fadeOut(1000);
                        toaster.notify(
                            <div className={`toaster-status success`}>????????????</div>
                        ,{
                            position: 'bottom-right',
                            duration: 3000
                        });
                        clearTimeout( this.delay );
                        this.delay = setTimeout(()=>{
                            this.reCallAPI();
                        },1000);
                        break;

                    default:
                        break;
                }
            });
        })
    }

    reCallAPI = () => {
        const { location } = this.props;
        const { pathname, search } = location;
        this.setState({
            loading: true
        },()=>{
            this.props.dispatch( mystoreStoreProductList( pathname,{...queryString.parse(search)} ) ).then( res => {
                this.setState({
                    loading: false
                })
            });
        })
    }
}

const mapStateToProps = state => {
    return{
        storeInfo: state.mystore.info,
        total: state.mystore.total,
        limit: state.mystore.limit,
        current: state.mystore.current,
        productList: state.mystore.list
    }
}

export default connect( mapStateToProps )( Index );