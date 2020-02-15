/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                  from 'react';
import dayjs                  from 'dayjs';
import queryString            from 'query-string';
import { connect }            from 'react-redux';

// Components
import Head                   from './head';
import Thead                  from './table/thead';
import Tbody                  from './table/tbody';
import PopupUploadPreview     from './popup';

// Modules
import Table                  from '../../../../../../module/table-new';
import Pagination             from '../../../../../../module/pagination';
import Loading                from '../../../../../../module/loading';
import Confirm                from '../../../../../../module/confirm';
import Popup                  from '../../../../../../module/popup';

// Actions
import { orderList, orderInfoProductDeliveryStatusBulk } from '../../../../../../actions/myvendor';

// Lang
import lang                   from '../../../../../../public/lang/lang.json';

class Order extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading           : false,
            list              : props.list,
            open              : false,
            method            : 'alert',
            popupMSG          : [],
            popupStatus       : false,
            csvUploadList     : [],
            uploadDone        : false
        }
    }

    static getDerivedStateFromProps ( props,state ){
        return{
            total             : props.total,
            totalAmount       : props.totalAmount,
            list              : props.list
        }
    }

    render(){

        const { open, method, popupMSG, loading, total, totalAmount, list, popupStatus, csvUploadList, uploadDone } = this.state;
        const { match, history, location } = this.props;

        return(
            <React.Fragment>
                <section className="page-title">
                    <h3>{ lang['zh-TW']['Order management'] }</h3>
                </section>
                <Head 
                    match          = {match}
                    history        = {history}
                    location       = {location}
                    total          = {total}
                    totalAmount    = {totalAmount}
                    returnUpload = {(val) => {
                        this.setState({
                            ...val
                        })
                    }}
                    returnDownload = {(val) => {
                        this.setState({
                            ...val
                        })
                    }}
                />
                <section className="admin-content-row">
                    <Table
                        thead = {<Thead />}
                    >
                        {
                            list.map( item => {
                                return <Tbody key={item['orderID']} {...item}/>
                            })
                        }
                    </Table>
                    <Loading 
                        loading          = {loading}
                    />
                </section>
                <Pagination 
                    total           = {total}
                    match           = {match}
                    location        = {location}
                />
                <Confirm
                    open            = {open}
                    method          = {method}
                    container       = {popupMSG}
                    onCancel        = {() => {
                        this.setState({
                            open            : false,
                            popupMSG        : []
                        })
                    }}
                />
                <Popup
                    className         = "csvUpload-popup-wrap"
                    popupStatus       = {popupStatus}
                    returnPopupStatus = {()=>{
                        this.setState({
                            popupStatus: false,
                        })
                    }}
                >
                    <Loading 
                        loading          = {loading}
                    />
                    <PopupUploadPreview 
                        list = {csvUploadList}
                        updateDelivery = {(i, deliveryCo)=>{
                            csvUploadList[i]['deliveryCompany'] = deliveryCo;
                            this.setState({
                                csvUploadList: csvUploadList
                            })
                        }}
                        updateDeliveryAll = {(deliveryCo)=>{
                            csvUploadList.map((v,i)=>{
                                csvUploadList[i]['deliveryCompany'] = deliveryCo;
                            })
                            this.setState({
                                csvUploadList: csvUploadList
                            })
                        }}
                        uploadDone = {uploadDone}
                        cancel = {() => {
                            this.setState({
                                uploadDone: false,
                                popupStatus: false,
                            })
                        }}
                        submit = {()=>{
                            this.callBulkOrderAPI()
                        }}
                    />
                </Popup>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.callAPI();
    }

    componentDidUpdate(prevProps, prevState) {
        const search = queryString.parse(this.props.location.search);
        const prevSearch = queryString.parse(prevProps.location.search);
        let checkQueryIsDifferent = false;
        if( Object.keys(search).length>Object.keys(prevSearch).length ){
            checkQueryIsDifferent = Object.keys(search).some( keys => {
                return search[keys]!=prevSearch[keys];
            })
        }else{
            checkQueryIsDifferent = Object.keys(prevSearch).some( keys => {
                return prevSearch[keys]!=search[keys];
            })
        }
        if (prevState.popupStatus!=this.state.popupStatus) {
            checkQueryIsDifferent = true;
        }
        
        if( checkQueryIsDifferent ){
            this.callAPI();
        }
    }
    
    callAPI = () => {
        const { location }           = this.props;
        const { pathname, search }   = location;
        const searchObject           = queryString.parse(search);
        const { startDate, endDate } = searchObject;
        const initQuery              = {
            startTimeMs    : startDate!=undefined ? dayjs(startDate).valueOf()             : dayjs(dayjs().format('YYYY-MM-DD')).valueOf(),
            endTimeMs      : endDate!=undefined   ? dayjs(endDate).add(1, 'day').valueOf() : dayjs(dayjs().add(1,'day').format('YYYY-MM-DD')).valueOf(),
        }

        this.setState({
            loading: true,
        },()=> {
            this.props.dispatch( orderList(pathname,{...searchObject, ...initQuery}) ).then( res => {
                this.setState({
                    loading: false,
                });
            });
        })
    }

    callBulkOrderAPI = () => {
        const { csvUploadList } = this.state;

        let prevOrderID = "";
        csvUploadList.map((item, i)=>{
            if(item['orderID'].trim()=='') {
                csvUploadList[i]['orderID'] = prevOrderID;
            } else {
                prevOrderID = item['orderID'];
            }
        })

        const list = {
            orders: csvUploadList
        }
        this.setState({
            loading: true,
        },()=> {
            this.props.dispatch( orderInfoProductDeliveryStatusBulk(list) ).then( res => {
                csvUploadList.map((itm, i)=>{
                    csvUploadList[i]['status'] = 'ok';
                })
                if (res['data']['errors']) {
                    let errors = res['data']['errors'];
                    Object.keys( errors ).map( (key, val) => {
                        csvUploadList[key]['status'] = 'failed';
                    })
                }
                this.setState({
                    loading: false,
                    uploadDone: true,
                    csvUploadList: csvUploadList
                });
            });
        })
    }

}

const mapStateToProps = (state) => {
    return{
        total        : state.myvendor.orderStatus['total'],
        totalAmount  : state.myvendor.orderStatus['totalAmount'],
        list         : state.myvendor.orderList,
        csvUploadList: state.myvendor.csvUploadList
    }
}

export default connect(mapStateToProps)(Order);