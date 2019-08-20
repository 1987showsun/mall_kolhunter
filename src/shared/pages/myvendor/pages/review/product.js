import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faArrowRight }from '@fortawesome/free-solid-svg-icons';

//Components
import Head from './headAction/product';
import Table from '../../../../module/table';
import Confirm from '../../../../module/confirm';

// Actions
import { listProduct, programContract } from '../../../../actions/vendor';

class Product extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            loading: true,
            popupMsg: "",
            selectedResult: [],
            isSelectedAll: true,
            total: props.total,
            initQuery: {
                page: "1",
                sort: 'desc',
                sortBy: 'created',
                limit: "30",
                status: 'none-auth'
            },
            tableHeadKey : [
                {
                    key: 'checkbox',
                    type: 'checkbox',
                    title: ''
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
                    key: 'category',
                    type: 'text',
                    title: '分類'
                },
                {
                    key: 'brand',
                    type: 'text',
                    title: '品牌'
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
                }
            ],
            tableBodyData : props.list
        }
    }

    static getDerivedStateFromProps(props,state){
        if( props.list.length!=state.tableBodyData.length ){
            return{
                total: props.total,
                tableBodyData: props.list,
                selectedResult: state.isSelectedAll? [...props.list] : []
            }
        }
        return null;
    }

    render(){

        const { 
            loading,
            total,
            tableHeadKey, 
            tableBodyData, 
            selectedResult, 
            open,popupMsg, 
            isSelectedAll 
        } = this.state;

        return(
            <React.Fragment>
                <Head 
                    addProductTotal= {total}
                    selectedQuantity= {selectedResult.length}
                    totalAmount= {selectedResult.length*50000}
                />
                <Table 
                    loading={loading}
                    isSelectedAll={isSelectedAll}
                    tableHeadData={tableHeadKey}
                    tableBodyData={tableBodyData}
                    returnCheckbox={this.returnCheckbox.bind(this)}
                />
                <div className="admin-content-footer">
                    <ul>
                    </ul>
                    <ul>
                        <li>
                            <button className="basic" onClick={this.onBuy.bind(this)}>
                                我已確定選擇購買的數量，並下一步
                                <i style={{marginLeft: "10px"}}><FontAwesomeIcon icon={faArrowRight} /></i>
                            </button>
                        </li>
                    </ul>
                </div>
                <Confirm 
                    open={open}
                    method='alert'
                    container={popupMsg}
                    onConfirm={this.handleConfirm.bind(this)}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { location } = this.props; 
        const { search } = location;
        let loading = this.state.loading;
        let initQuery = { ...this.state.initQuery };
        initQuery = { ...initQuery, ...queryString.parse(search) }
        this.props.dispatch( listProduct( `?${queryString.stringify(initQuery)}` ) ).then( res => {
            this.setState({
                loading: false
            })
        });
    }

    returnCheckbox = ( val ) => {
        this.setState({
            selectedResult: val,
        });
    }

    handleConfirm = ( val ) => {
        if( val ){
            this.setState({
                open: false,
            })
        }
    }

    onBuy = () => {

        const { selectedResult, tableBodyData } = this.state;
        const selectObject = tableBodyData.filter( filterItem => selectedResult.includes(filterItem['id']));
        console.log( selectedResult,selectObject );

        if( selectedResult.length!=0 ){
            //this.props.dispatch( programContract(selected) ).then( res => {
                if( true ){
                    this.props.history.push('/myvendor/program/product');
                }
            //});
        }else{
            this.setState({
                open: true,
                popupMsg: '請選擇一個以上的商品，才可進行購買方案'
            })
        }
    }
}

const mapStateToProps = (state) => {
    return{
        total: state.vendor.total,
        list : state.vendor.list,
    }
}

export default connect(mapStateToProps)(Product);