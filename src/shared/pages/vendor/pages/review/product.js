import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

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
            popupMsg: "",
            selected: [],
            selectedResult: [],
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
                    key: 'categories',
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
            tableBodyData : props.list.filter( filterItem => filterItem['status']=='none-auth' )
        }
    }

    static getDerivedStateFromProps(props,state){

        const filterListStatus = props.list.filter( filterItem => filterItem['status']=='none-auth' );
        const selected = filterListStatus.map( item => item['id'] );
        console.log( state.selected  );
        if( selected!=state.selected ){
            return{
                tableBodyData: props.list,
                selected
            }
        }
        return null;
    }

    render(){

        const { tableHeadKey,tableBodyData,selected,open,popupMsg } = this.state;

        return(
            <React.Fragment>
                <Head />
                <Table 
                    isCheckedAll={true}
                    tableHeadData={tableHeadKey}
                    tableBodyData={tableBodyData}
                    selected={selected}
                    returnCheckBoxVal={this.returnCheckBoxVal.bind(this)}
                />
                <div className="admin-content-footer">
                    <ul>
                        <li>
                            <div className="label">目前已新增商品</div>
                            <div className="value">{tableBodyData.length}</div>
                        </li>
                        <li>
                            <div className="label">目前已選購買方案數</div>
                            <div className="value">{selected.length}</div>
                        </li>
                        <li>
                            <div className="label">購買方案總價</div>
                            <div className="value">
                                <CurrencyFormat value={selected.length*50000} displayType={'text'} thousandSeparator={true} />
                            </div>
                        </li>
                    </ul>

                    <ul>
                        <li>
                            <button className="basic" onClick={this.onBuy.bind(this)}>我已確定選擇購買的數量，並下一步</button>
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
        let { search } = location;
        this.props.dispatch( listProduct(search) );
    }

    returnCheckBoxVal = ( val ) => {
        //console.log( val );
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
        list : state.vendor.list,
    }
}

export default connect(mapStateToProps)(Product);