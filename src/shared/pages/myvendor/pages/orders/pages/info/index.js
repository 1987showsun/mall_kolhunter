import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

//Compoents
import Basic from './components/basic';
import Orderer from './components/orderer';
import Recipient from './components/recipient';
import Products from './components/product';

// Actions
import { orderInfo } from '../../../../../../actions/myvendor';

// Lang
import lang from '../../../../../../public/lang/lang.json';

class Info extends React.Component{

    constructor(props){
        super(props);
        this.state = {
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
        const { loading, info } = this.state;
        if( info['orderDetail']!=undefined ){
            orderDetail = info['orderDetail'].map( item => {
                return{
                    id: item['productToken'],
                    specSku: item['specSku'],
                    name: item['productName'],
                    quantity: item['itemNum'],
                    refundStatus: lang['zh-TW']['refundStatusEnum'][item['refundStatus']],
                    deliveryStatus: lang['zh-TW']['deliveryStatus'][item['deliveryStatus']],
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
            </React.Fragment>
        );
    }

    componentDidMount() {

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

    handleChange = ( key,e ) => {

    }
}

const mapStateToProps = state => {
    return{
        info: state.myvendor.orderInfo
    }
}

export default connect( mapStateToProps )( Info );