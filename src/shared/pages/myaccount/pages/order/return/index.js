// 訂單-退貨
import React from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Modules
import Table from '../../../../../module/table';
import Confirm from '../../../../../module/confirm';
import Loading from '../../../../../module/loading/mallLoading';

// Actions
import { ordersInfo, ordersRefund } from '../../../../../actions/myaccount';

// Set
import tableHeadData from './public/set/tableHeadData';

// Lang
import lang from '../../../../../public/lang/lang.json';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            open: false,
            method: 'confirm',
            header: "",
            pupopMSG: "",
            selected: [],
            info: {},
            tableHeadData : tableHeadData,
            tableBodyData : []
        }
    }

    render(){

        const { loading, open, method, header, pupopMSG,  tableHeadData, tableBodyData } = this.state;

        return(
            <React.Fragment>
                <section className="container-unit">
                    <div className="unit-head">
                        <h3>該筆訂單商品</h3>
                    </div>
                    <section className="container-unit-row">
                        <Table
                            className="member-order-info-table"
                            tableHeadData= {tableHeadData}
                            tableBodyData= {tableBodyData}
                            returnCheckbox= { (val) => {
                                this.setState({ 
                                    selected: val 
                                });
                            }}
                        />
                        <Loading loading={loading}/>
                    </section>
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
                    header= {header}
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
        this.setState({
            loading: true
        },()=>{
            this.props.dispatch( ordersInfo(pathname,{orderID: orderID}) ).then( res => {
                const tableBodyData = res['orderDetail'].map( item => {
                    return{
                        id: item['id'],
                        cover: item['image'],
                        name: [<Link key={`name_${item['id']}`} to={`/detail/${item['productToken']}`} target="_blank">{item['productName']}</Link>],
                        count: item['count'],
                        storeName: item['storeToken']!=""? [<Link key={'123'} to={`/store/${item['storeToken']}`} target="_blank">{item['storeName']}</Link>] : 'Kolhunter',
                        storeToken: item['storeToken'],
                        total: item['amount']
                    }
                })

                this.setState({
                    loading: false,
                    info: res,
                    tableBodyData
                })
            });
        })
    }
    
    action = ( method ) => {
        const { history } = this.props;
        switch( method ){
            case 'submit':
                const { selected } = this.state;
                if( selected.length!=0 ){
                    this.setState({
                        open: true,
                        method: 'confirm',
                        header: "您確定要退貨以下商品嗎？",
                        pupopMSG: selected.map( (item,i) => {
                            return <div key={i} className="items">{i+1}. {item['name'][0]['props']['children']}</div>;
                        })
                    })
                }else{
                    this.setState({
                        open: true,
                        method: 'alert',
                        header: "",
                        pupopMSG: '請選擇一個以上要退貨之商品'
                    });
                }
                break;

            default:
                history.goBack();
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
        const { selected } = this.state;
        const { location, match } = this.props;
        const { pathname, search } = location;
        if( this.state.method=='alert' ){
            this.onCancel();
        }else{
            this.props.dispatch( ordersRefund(pathname,{...queryString.parse(search)},selected) );
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