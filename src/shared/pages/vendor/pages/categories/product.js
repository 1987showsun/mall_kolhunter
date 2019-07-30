import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

//Components
import Head from './headAction/product';
import Table from '../../../../module/table';
import Pagination from '../../../../module/pagination';

// Actions
import { listProduct, productPutsaleAndDiscontinue } from '../../../../actions/vendor';

class Product extends React.Component{

    constructor(props){
        super(props);
        this.state = {
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
                    }
                },
                {
                    key: 'cover',
                    type: 'img',
                    title: '圖片'
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
                // {
                //     key: 'other',
                //     type: 'other',
                //     title: '其他',
                //     link: [
                //         {
                //             text: '編輯',
                //             path: '/myvendor/update/product',
                //             search: ['id']
                //         }
                //     ]
                // }
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

        const { total, tableHeadKey, tableBodyData } = this.state;
        const { match, location, history } = this.props;

        return(
            <React.Fragment>
                <Head
                    match= {match} 
                    history= {history}
                    location= {location}
                />
                <Table 
                    tableHeadData={tableHeadKey}
                    tableBodyData={tableBodyData}
                    tableButtonAction={this.tableButtonAction.bind(this)}
                    returnCheckBoxVal={this.returnCheckBoxVal.bind(this)}
                />
                <Pagination 
                    total= {total}
                    match= {match}
                    location= {location}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        const locationSearch = this.props.location['search'];
        this.props.dispatch( listProduct( locationSearch ) );
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        const prevlocationSearch = prevProps.location['search'];
        const locationSearch = this.props.location['search'];
        if( prevlocationSearch!=locationSearch ){
            this.props.dispatch( listProduct( locationSearch ) );
        }
        return null;
    }

    componentDidUpdate(){
        return null;
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

    returnCheckBoxVal = ( val ) => {
        //console.log( val );
    }
}

const mapStateToProps = (state) => {
    return{
        total: state.vendor.total,
        list: state.vendor.list
    }
}

export default connect(mapStateToProps)(Product);