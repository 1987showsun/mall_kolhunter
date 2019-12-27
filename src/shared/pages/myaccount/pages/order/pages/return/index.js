/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

// 訂單-退貨
import React                        from 'react';
import toaster                      from 'toasted-notes';
import queryString                  from 'query-string';
import { connect }                  from 'react-redux';

// Components
import Items                        from './components/items';

// Modules
import Table                        from '../../../../../../module/table-new';
import Confirm                      from '../../../../../../module/confirm';
import Loading                      from '../../../../../../module/loading/mallLoading';

// Actions
import { ordersInfo, ordersRefund } from '../../../../../../actions/myaccount';

// Lang
import lang                         from '../../../../../../public/lang/lang.json';

// Styelsheets
import './public/stylesheets/style.scss';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading       : false,
            open          : false,
            method        : 'confirm',
            header        : "",
            pupopMSG      : "",
            selected      : [],
            info          : {},
            list          : []
        }
    }

    render(){

        const { loading, open, selected, method, header, pupopMSG, list } = this.state;

        return(
            <React.Fragment>
                <section className="container-unit">
                    <div className="unit-head">
                        <h3>該筆訂單商品</h3>
                    </div>
                    <section className="container-unit-row">
                        <Table>
                            {
                                list.map((item,i) => {
                                    return(
                                        <Items 
                                            {...item}
                                            key          = {i} 
                                            selected     = {selected}
                                            handleChange = {this.handleChange.bind(this)}
                                        />
                                    )
                                })
                            }
                        </Table>
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
                    open          = {open}
                    method        = {method}
                    header        = {header}
                    container     = {pupopMSG}
                    onCancel      = {this.onCancel.bind(this)}
                    onConfirm     = {this.handleConfirm.bind(this)}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {

        const { location, match } = this.props;
        const { pathname }        = location;
        const orderID             = match['params']['id'] || "";

        this.setState({
            loading: true
        },()=>{
            this.props.dispatch( ordersInfo(pathname,{orderID: orderID}) ).then( res => {
                this.setState({
                    loading: false
                },()=>{
                    const { status, data } = res;
                    switch( status ){
                        case 200:
                            const { orderDetail } = data;
                            this.setState({
                                list: orderDetail.filter( item => item['refundStatus']=='none')
                            })
                            break;

                        default:
                            break;
                    }
                })

            });
        });
    }

    handleChange = ( val ) => {
        const { itemCode }  = val;
        const { selected }  = this.state;
        const someItem      = selected.includes(itemCode);
        this.setState({
            selected: !someItem? ([
                ...selected,
                itemCode
            ]) : selected.filter( item => item!=itemCode )
        })
    }
    
    action = ( method ) => {
        const { history } = this.props;
        const { list }    = this.state;
        switch( method ){
            case 'submit':
                const { selected } = this.state;
                if( selected.length!=0 ){
                    this.setState({
                        open         : true,
                        method       : 'confirm',
                        header       : "您確定要退貨以下商品嗎？",
                        pupopMSG     : selected.map( (items,i) => {
                            return(
                                <div key={i} className="items">
                                    {i+1}. {list.filter(item => item['itemCode']==items )[0]['productName']}
                                </div>
                            );
                        })
                    })
                }else{
                    this.setState({
                        open         : true,
                        method       : 'alert',
                        header       : "",
                        pupopMSG     : '請選擇一個以上要退貨之商品'
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
            open         : false,
            method       : 'confirm',
            header       : '',
            pupopMSG     : []
        })
    }

    handleConfirm = () => {

        const { selected, method }         = this.state;
        const { location, history, match } = this.props;
        const { pathname, search }         = location;

        if( method=='alert' ){
            this.onCancel();
        }else{

            const data = {
                orderID   : match['params']['id'],
                itemCode  : selected
            }

            this.props.dispatch( ordersRefund(pathname,{...queryString.parse(search)},data) ).then( res => {

                let   status      = 'failure';
                let   status_text = lang['zh-TW']['toaster']['refundFailure'];

                switch( res['status'] ){
                    case 200:
                        status      = 'success';
                        status_text = lang['zh-TW']['toaster']['refundSuccess'];
                        history.goBack();
                        break;

                    default:
                        status      = 'failure';
                        status_text = lang['zh-TW']['toaster']['refundFailure'];
                        break;
                }

                this.onCancel();
                // 提示視窗
                toaster.notify( <div className={`toaster-status ${status}`}>{status_text}</div> ,{
                    position: 'bottom-right',
                    duration: 3000
                })
            });
        }

    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Index );