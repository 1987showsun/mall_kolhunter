import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faTruck }from '@fortawesome/free-solid-svg-icons';

//Compoents
import Basic from './components/basic';
import Orderer from './components/orderer';
import Recipient from './components/recipient';
import Products from './components/product';

// Modules
import Confirm from '../../../../../../module/confirm';

// Actions
import { orderInfo, changeRefund } from '../../../../../../actions/myvendor';

// Lang
import lang from '../../../../../../public/lang/lang.json';

class Info extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            refundStep: ['request','delivery','recived','choice'],
            open: false,
            method: 'confirm',
            popupMSG: [],
            selectedRefund: {},
            loading: false,
            info: props.info
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            info: props.info
        }
    }

    render(){

        let orderDetail = [];
        const { location, match } = this.props;
        const { open, method, popupMSG, loading, info } = this.state;

        if( info['orderDetail']!=undefined ){
            orderDetail = info['orderDetail'].map( item => {
                return{
                    id: item['productToken'],
                    name: item['productName'],
                    specSku: item['specSku'],
                    quantity: item['itemNum'],
                    refundStatus: lang['zh-TW']['refundStatusEnum'][item['refundStatus']],
                    refundAction: (item['refundStatus']=='none' || item['refundStatus']=='reject' || item['refundStatus']=='approve') ? (
                        "N/A"
                    ):(
                        [
                            <button key={item['productToken']} className="basic" onClick={this.refund.bind(this,item)}>
                                變更狀態
                            </button>
                        ]
                    ),
                    deliveryStatusName: lang['zh-TW']['deliveryStatus'][item['deliveryStatus']],
                    deliveryStatus: item['deliveryStatus'],
                    deliveryCode: item['deliveryCode'],
                    specToken: item['specToken'],
                    specName: item['specName'],
                    specSku: item['specSku'],
                    total: item['amount']
                }
            })
        }

        return(
            <React.Fragment>
                <Basic 
                    loading= {loading}
                    data= {info}
                />
                {/* <Orderer 
                    data= {info}
                /> */}
                <Recipient 
                    loading= {loading}
                    data= {info}
                />
                <Products
                    location= {location}
                    match= {match}
                    loading= {loading}
                    info= {info}
                    data= {orderDetail}
                />

                <Confirm
                    open= {open}
                    method= {method}
                    container= {popupMSG}
                    onConfirm= {this.handleConfirm.bind(this)}
                    onCancel= {this.handleCancel.bind(this)}
                    onRefundConfirm= {this.onRefundConfirm.bind(this)}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.callAPI();
    }

    handleConfirm = () => {
        const { refundStep, selectedRefund, info } = this.state;
        const { location } = this.props;
        const { pathname, search } = location;
        this.setState({
            open: false,
            method: 'confirm',
            popupMSG: []
        },()=>{
            const { id, refundStatus } = selectedRefund;
            const _findIndex = refundStep.findIndex( keys => keys==refundStatus );
            if( refundStep[_findIndex+1]!='choice' ){
                const data = {
                    orderID    : info['orderID'],
                    detail     : [id],
                    refundType : refundStep[_findIndex+1]
                }
                this.props.dispatch( changeRefund(pathname,{...queryString.parse(search)},data) ).then( res => {
                    switch( res['status'] ){
                        case 200:
                            this.callAPI();
                            break;

                        default:
                            break;
                    }
                });
            }
        })
    }

    onRefundConfirm = (val) => {
        const { selectedRefund, info } = this.state;
        const { id, refundStatus } = selectedRefund;
        const { location } = this.props;
        const { pathname, search } = location;
        let data = {
            orderID    : info['orderID'],
            detail     : [id]
        }

        switch( val ){
            case 'yes':
                data = { ...data, refundType: 'approve' };
                break;

            default:
                data = { ...data, refundType: 'reject' };
                break;
        }

        this.setState({
            open: false,
            method: 'confirm',
            popupMSG: []
        },()=>{
            this.props.dispatch( changeRefund(pathname,{...queryString.parse(search)},data) ).then( res => {
                switch( res['status'] ){
                    case 200:
                        this.callAPI();
                        break;

                    default:
                        break;
                }
            });
        });
    }

    handleCancel = () => {
        this.setState({
            open: false,
            popupMSG: []
        })
    }

    refund = ( selectedRefund ) => {
        const { refundStep } = this.state;
        const { refundStatus, productName } = selectedRefund;
        const _findIndex = refundStep.findIndex( keys => keys==refundStatus );
        let open     = true;
        let method   = 'confirm';
        let popupMSG = [];

        switch( refundStep[_findIndex+1] ){
            case 'request':
                popupMSG = [<div key={`popupMSG`} className="items">是否要變更<span className="items-product-name">{productName}</span>商品，退貨狀態至<span className="items-focus"></span>狀態嗎？</div>];
                break;

            case 'delivery':
                popupMSG = [<div key={`popupMSG`} className="items">是否要變更<span className="items-product-name">{productName}</span>商品，退貨狀態至<span className="items-focus">派出物流收回</span>狀態嗎？</div>];
                break;

            case 'recived':
                popupMSG = [<div key={`popupMSG`} className="items">是否要變更<span className="items-product-name">{productName}</span>商品，退貨狀態至<span className="items-focus">已收回退貨商品</span>狀態嗎？</div>];
                break;

            default:
                method   = 'refund';
                popupMSG = [<div key={`popupMSG`} className="items">是否同意<span className="items-product-name">{productName}</span>商品的退貨請求？</div>];
                break;
        }

        this.setState({
            open,
            method,
            popupMSG,
            selectedRefund: selectedRefund
        })
    }

    callAPI = () => {
        const { location, match } = this.props;
        const { pathname, search } = location;
        const orderID = match['params']['id'];
        this.setState({
            loading: true,
        },()=>{
            this.props.dispatch( orderInfo(pathname,{...queryString.parse(search), orderID }) ).then( res => {
                this.setState({
                    loading: false
                },()=>{
                    switch( res['status'] ){
                        case 200:
                            this.setState({
                                info: res['data']
                            })
                            break;

                        default:

                            break;
                    }
                })
            });
        })
    }
}

const mapStateToProps = state => {
    return{
        info: state.myvendor.orderInfo
    }
}

export default connect( mapStateToProps )( Info );