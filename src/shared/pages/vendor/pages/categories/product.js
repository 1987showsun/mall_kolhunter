import React from 'react';
import { connect } from 'react-redux';

//Components
import Head from './headAction/product';
import Table from '../../../../module/table';

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
                        0: '下架中',
                        1: '上架中'
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
                    key: 'special_offer',
                    type: 'number',
                    title: '特價'
                },
                {
                    key: 'divided',
                    type: 'percent',
                    title: '分潤比'
                },
                {
                    key: 'other',
                    type: 'other',
                    title: '其他',
                    link: [
                        {
                            text: '編輯',
                            path: '/myvendor/update/product',
                            search: ['id']
                        }
                    ]
                }
            ],
            tableBodyData : []
        }
    }

    static getDerivedStateFromProps ( props,state ){

        const filterStatusList = props.list.filter( filterItem =>  filterItem['status']!=2 );

        return{
            tableBodyData: filterStatusList
        }
    }

    render(){

        const { tableHeadKey,tableBodyData } = this.state;

        return(
            <React.Fragment>
                <Head />
                <Table 
                    tableHeadData={tableHeadKey}
                    tableBodyData={tableBodyData}
                    tableButtonAction={this.tableButtonAction.bind(this)}
                    returnCheckBoxVal={this.returnCheckBoxVal.bind(this)}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.props.dispatch( listProduct() );
    }

    tableButtonAction = ( val ) => {
        // 0：下架中 1：上架中
        let type = '';
        if( val['status']==0 ){
            type= 'putsale';
        }else{
            type= 'discontinue';
        }
        this.props.dispatch( productPutsaleAndDiscontinue( type, val ) );
    }

    returnCheckBoxVal = ( val ) => {
        console.log( val );
    }
}

const mapStateToProps = (state) => {
    return{
        list : state.vendor.list,
    }
}

export default connect(mapStateToProps)(Product);