import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";

//Components
import Head from './head';

// Modules
import Table from '../../../../../../module/table';
import Pagination from '../../../../../../module/pagination';
import Loading from '../../../../../../module/loading';

// Actions
import { listProduct, productPutsaleAndDiscontinue } from '../../../../../../actions/myvendor';

// Lang
import lang from '../../../../../../public/lang/lang.json';

// Set
import { tableHeadKey } from './public/set/tableHeaderData';

class Product extends React.Component{

    constructor(props){        
        super(props);
        this.state = {
            loading: false,
            tableHeadKey : tableHeadKey,
            tableBodyData : props.list,
            noneDisplay: props.noneDisplay,
            display: props.display,
            review: props.review,
            total: props.total,
        }
    }

    static getDerivedStateFromProps ( props,state ){
        return{
            noneDisplay: props.noneDisplay,
            display: props.display,
            review: props.review,
            total: props.total,
            tableBodyData: props.list
        }
    }

    render(){

        const { loading, total, tableHeadKey, tableBodyData } = this.state;
        const { match, location, history } = this.props;
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
                    match= {match} 
                    history= {history}
                    location= {location}
                />
                <section className="admin-content-row">
                    <Table 
                        loading={loading}
                        tableHeadData={tableHeadKey}
                        tableBodyData={tableBodyData}
                        tableButtonAction={this.tableButtonAction.bind(this)}
                    />
                    <Loading 
                        loading= {loading}
                    />
                </section>
                <Pagination
                    query= {{
                         ...queryString.parse( search )
                    }}
                    total= {total}
                    match= {match}
                    location= {location}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.getProductList();
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        const prevlocationSearch = prevProps.location['search'];
        const locationSearch = this.props.location['search'];
        if( prevlocationSearch!=locationSearch ){
            this.getProductList();
        }
        return null;
    }

    componentDidUpdate(){
        return null;
    }

    getProductList = () => {
        const { location } = this.props;
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
        const { location, match } = this.props;
        const { pathname, search } = location;
        const mergeData = {
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
                    switch( res['status'] ){
                        case 200:
                            break;

                        default:
                            break;
                    }
                })
            });
        });
    }
}

const mapStateToProps = (state) => {
    return{
        noneDisplay: state.myvendor.productStatus.noneDisplay,
        display: state.myvendor.productStatus.display,
        review: state.myvendor.productStatus.review,
        total: state.myvendor.productStatus.total,
        list: state.myvendor.productList
    }
}

export default connect(mapStateToProps)(Product);