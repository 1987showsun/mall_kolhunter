// 訂單-退貨
import React from 'react';
import dayjs from 'dayjs';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Modules
import Table from '../../../../../module/table';
import Confirm from '../../../../../module/confirm';

// Actions
import { ordersInfo } from '../../../../../actions/myaccount';

// Set
import tableHeadData from './public/set/tableHeadData';

const demo = [
    {
        id: "00000001",
        cover: "https://s.yimg.com/zp/MerchandiseImages/A0CEBA3A7A-SP-6940133.jpg",
        name: "【福利品】Apple iPhone X 64G 智慧型手機",
        itemNum: 1,
        actualPrice: "21900"
    },
    {
        id: "00000002",
        cover: "https://s.yimg.com/zp/MerchandiseImages/ED0EEA05CC-SP-7032064.jpg",
        name: "Beats Solo 3 Wireless Club 頭戴耳機",
        itemNum: 2,
        actualPrice: "6990"
    }
]

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            open: false,
            pupopMSG: "",
            method: 'confirm',
            selected: [],
            info: {},
            tableHeadData : tableHeadData,
            tableBodyData : []
        }
    }

    render(){

        const { loading, open, method, pupopMSG, selected, info,  tableHeadData, tableBodyData } = this.state;

        return(
            <React.Fragment>
                <section className="container-unit">
                    <div className="unit-head">
                        <h3>訂單資訊</h3>
                    </div>
                    <ul className="table-row-list">
                        <li>
                            <label>訂單編號</label>
                            <div>{info['orderID']}</div>
                        </li>
                        <li>
                            <label>訂購數量</label>
                            <div>{tableBodyData.length}</div>
                        </li>
                        <li>
                            <label>訂購日期</label>
                            <div>{dayjs(this.state.createTimeMs).format("YYYY / MM / DD")}</div>
                        </li>
                    </ul>
                </section>

                <section className="container-unit">
                    <div className="unit-head">
                        <h3>該筆訂單商品</h3>
                    </div>
                    <Table 
                        tableHeadData= {tableHeadData}
                        tableBodyData= {tableBodyData}
                        returnCheckbox= { (val) => {this.setState({ selected: val })} }
                    />
                </section>

                <section className="container-unit">
                    <div className="container-unit-action">
                        <ul>
                            <li><button onClick={this.action.bind(this,'cancel')} className="cancel">返回上頁</button></li>
                            <li><button onClick={this.action.bind(this,'submit')} className="mall-yes">確定退貨</button></li>
                        </ul>
                    </div>
                </section>

                <Confirm 
                    open={open}
                    method= {method}
                    header= {`您確定要退貨以下商品嗎？`}
                    container={pupopMSG}
                    onCancel={this.onCancel.bind(this)}
                    onConfirm={this.handleConfirm.bind(this)}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { location, match } = this.props;
        const { pathname, search } = location;
        const orderID = match['params']['id'] || "";
        this.props.dispatch( ordersInfo(pathname,{orderID: orderID}) ).then( res => {
            switch( res['status'] ){
                case 200:

                    const tableBodyData = res['data']['orderDetail'].map( item => {
                        return{
                            id: item['productToken'],
                            cover: item['productImgs'].filter( (filterItem,i) => { if( i==0 ){ return filterItem['images'] } })[0],
                            name: item['productName'],
                            count: item['count'],
                            price: item['amount']
                        }
                    })


                    this.setState({
                        info: res['data'],
                        tableBodyData: tableBodyData
                    })
                    break;

                default:
                    break;
            }
        });
    }
    
    action = ( method ) => {
        switch( method ){
            case 'submit':
                const { selected } = this.state;
                if( selected.length!=0 ){
                    let pupopMSG = "";
                    selected.map( (item,i) => {
                        pupopMSG = `${pupopMSG}<div class="items">${i+1}. ${item['name']}</div>`
                    })
                    this.setState({
                        open: true,
                        pupopMSG
                    })
                }
                break;
            default:
                break;
        }
    }

    onCancel = () => {
        this.setState({
            open: false,
            method: 'confirm',
            header: '',
            pupopMSG: ''
        })
    }

    handleConfirm = () => {

        if( this.state.method=='alert' ){
            this.onCancel();
        }else{
            this.setState({
                method: 'alert',
                pupopMSG: '已送出退貨請求'
            })            
        }

    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Index );