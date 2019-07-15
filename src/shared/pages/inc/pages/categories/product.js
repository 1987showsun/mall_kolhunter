import React from 'react';
import { connect } from 'react-redux';

//Components
import Head from './headAction/product';
import Table from '../../../module/table';

// Actions
import { incListProduct } from '../../../../actions/inc';

class Product extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selected: [],
            tableHeadKey : [
                {
                    key: 'checkbox',
                    type: 'checkbox',
                    title: ''
                },
                {
                    key: 'status',
                    type: 'button',
                    title: '狀態',
                    text: {
                        0: '下架中',
                        1: '上架中',
                        2: '審核中(可編輯)'
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
                    path: '/inc/info/product'
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
                }
            ],
            tableBodyData : []
        }
    }

    static getDerivedStateFromProps ( props,state ){
        return{
            tableBodyData: props.list
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
                    onTClick={this.handleChackboxChange.bind(this)}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.props.dispatch( incListProduct() );
    }

    handleChackboxChange = ( val ) => {
        console.log( val );
    }
}

const mapStateToProps = (state) => {
    return{
        list : state.inc.list,
    }
}

export default connect(mapStateToProps)(Product);