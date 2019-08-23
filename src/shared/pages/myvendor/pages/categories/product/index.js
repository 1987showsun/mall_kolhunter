import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

//Components
import Head from './head';
import Table from '../../../../../module/table';
import Pagination from '../../../../../module/pagination';

// Actions
import { listProduct, productPutsaleAndDiscontinue } from '../../../../../actions/vendor';

class Product extends React.Component{

    constructor(props){        
        super(props);
        this.state = {
            loading: true,
            selected: [],
            tableHeadKey : [
                {
                    key: 'status',
                    type: 'button',
                    title: '狀態（點擊 上、下架）',
                    text: {
                        "auth": '上架中',
                        "non-display": '下架中',
                        "none-auth": '審核中'
                    },
                    className: "status-width"
                },
                {
                    key: 'cover',
                    type: 'img',
                    title: '圖片',
                    className: 'img-width'
                },
                {
                    key: 'name',
                    type: 'link',
                    title: '名稱',
                    className: 'table-min-width',
                    path: '/myvendor/info/product'
                },
                {
                    key: 'brand',
                    type: 'text',
                    title: '品牌'
                },
                {
                    key: 'category',
                    type: 'text',
                    title: '分類'
                },
                {
                    key: 'store',
                    type: 'number',
                    title: '店家'
                },
                {
                    key: 'price',
                    type: 'number',
                    title: '售價'
                },
                {
                    key: 'sellPrice',
                    type: 'number',
                    title: '特價'
                },
                {
                    key: 'divided',
                    type: 'percent',
                    title: '分潤比'
                }
            ],
            tableBodyData : [],
            total: 0
        }
    }

    static getDerivedStateFromProps ( props,state ){
        return{
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
                <Head
                    match= {match} 
                    history= {history}
                    location= {location}
                />
                <Table 
                    loading={loading}
                    tableHeadData={tableHeadKey}
                    tableBodyData={tableBodyData}
                    tableButtonAction={this.tableButtonAction.bind(this)}
                />
                <Pagination
                    query= {{
                        status: 'auth,non-display',
                        sort:'desc',
                        sortBy:'created',
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
        this.props.dispatch( listProduct(pathname,{ ...queryString.parse(search),status: 'auth,non-display' }) ).then( res => {
            this.setState({
                loading: false
            })
        });
    }

    tableButtonAction = ( val ) => {
        // non-display：下架中 
        // auth：上架中
        let type = '';
        if( val['status']=='non-display' ){
            type= 'putsale';
        }else if( val['status']=='auth' ){
            type= 'discontinue';
        }
        this.props.dispatch( productPutsaleAndDiscontinue( type, val ) );
    }
}

const mapStateToProps = (state) => {
    return{
        total: state.vendor.total,
        list: state.vendor.list
    }
}

export default connect(mapStateToProps)(Product);