/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                  from 'react';
import dayjs                  from 'dayjs';
import queryString            from 'query-string';
import { connect }            from 'react-redux';
import { CSVReader }          from 'react-papaparse';
import { FontAwesomeIcon }    from '@fortawesome/react-fontawesome';
import { faFileDownload }     from '@fortawesome/free-solid-svg-icons';

// Modules
import Datetime               from '../../../../../../module/datetime';

// Actions
import { orderDownload }      from '../../../../../../actions/myvendor';

// Lang
import lang                   from '../../../../../../public/lang/lang.json';

class HeadProduct extends React.Component{

    constructor(props){
        super(props);
        const { location } = props;
        const searchObject = queryString.parse(location['search']);
        const startDate    = searchObject['startDate'] || "";
        const endDate      = searchObject['endDate']   || "";
        this.fileInput = React.createRef();
        this.state         = {
            orderStatus      : searchObject['orderStatus']  || "",
            refundStatus     : searchObject['refundStatus'] || "",
            startDate        : "",
            endDate          : "",
            formSearchObject : {
                startDate      : startDate || dayjs().format('YYYY-MM-DD'),
                endDate        : endDate   || dayjs().format('YYYY-MM-DD'),
                orderStatus    : searchObject['orderStatus']  || "",
                refundStatus   : searchObject['refundStatus'] || "",
                keyword   : searchObject['keyword'] || ""
            }
        }
    }

    render(){

        const { orderStatus, refundStatus, formSearchObject } = this.state;
        const { total, totalAmount } = this.props;

        return(
            <React.Fragment>
                <div className="page-head-action">
                    <div className="page-head-action-row">
                        <ul>
                            <li>
                                <form className="admin-search-form" onSubmit={this.handleSearchSubmit.bind(this)}>
                                    <Datetime
                                        value       = {formSearchObject['startDate']}
                                        returnForm  = {(val) => {
                                            const { formSearchObject } = this.state;
                                            this.setState({
                                                startDate        : `${val['year']}-${val['month']}-${val['day']}`,
                                                formSearchObject : {
                                                    ...formSearchObject,
                                                    startDate        : `${val['year']}-${val['month']}-${val['day']}`,
                                                }
                                            })
                                        }}
                                    />
                                    <Datetime 
                                        value       = {formSearchObject['endDate']  }
                                        returnForm  = {(val) => {
                                            const { formSearchObject } = this.state;
                                            this.setState({
                                                endDate          : `${val['year']}-${val['month']}-${val['day']}`,
                                                formSearchObject : {
                                                    ...formSearchObject,
                                                    endDate          : `${val['year']}-${val['month']}-${val['day']}`,
                                                }
                                            })
                                        }}
                                    />
                                    <div className="input-box keyword">
                                        <input
                                            type="text"
                                            name="keyword"
                                            onChange={this.handleSearchChange.bind(this)}
                                            placeholder="??????????????????????????????????????????"
                                        >
                                        </input>
                                    </div>
                                    <button className="basic">??????</button>
                                </form>
                            </li>
                            {/* <li> 
                                <div className="input-box select">
                                    <select name="orderStatus" value={ orderStatus } onChange={this.filterData.bind(this)}>
                                        <option value="">????????????</option>
                                        <option value="init">????????????</option>
                                        <option value="paid">????????????</option>
                                        <option value="payfailure">????????????</option>
                                    </select>
                                </div>
                            </li> */}
                            <li>
                                <div className="input-box select">
                                    <select name="refundStatus" value={ refundStatus } onChange={this.filterData.bind(this)}>
                                        <option value="">????????????</option>
                                        <option value="deliveryinit">????????????</option>
                                        <option value="none">???????????????</option>
                                        <option value="request">????????????</option>
                                        <option value="approve">????????????</option>
                                        <option value="reject">????????????</option>
                                        <option value="done">????????????</option>
                                    </select>
                                </div>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <button onClick={this.actionYouWantToPerform.bind(this)} className="form-download">
                                    <i><FontAwesomeIcon icon={faFileDownload} /></i>????????????
                                </button>
                            </li>
                            <li>
                            <CSVReader
                            onFileLoaded={this.handleReadCSV.bind(this)}
                            inputRef={this.fileInput}
                            style={{display: 'none'}}
                            onError={this.handleOnError}
                            />
                            <button onClick={this.handleImport}>??????</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="page-alert-info">
                    <ul>
                        <li>
                            ??????????????????{total}
                        </li>
                        <li>
                            ????????????????????????{totalAmount}
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }

    handleSearchChange = (e) => {
        const { formSearchObject } = this.state;
        const { name, value }      = e.target;

        this.setState({
            formSearchObject : {
                ...formSearchObject, 
                [name]         : value
            }
        })
    }

    handleSearchSubmit = (e) => {
        e.preventDefault();
        const { location, history } = this.props;
        const { formSearchObject }  = this.state;
        const { pathname, search }  = location;
        history.push({
            pathname  : pathname,
            search    : queryString.stringify({ ...queryString.parse(search), ...formSearchObject })
        })
    }

    filterData = (e) => {

        const { formSearchObject }  = this.state;
        const { history, location } = this.props;
        const { pathname,search }   = location;
        const { name, value }       = e.target;
        let qs =  queryString.parse(search);
        qs['page'] = 1
        this.setState({
            [name]           : value,
            formSearchObject : {
                ...formSearchObject,
                [name] : value
            }
        },()=>{

            const query = { ...qs,[name]: value };
            if( value=="" ){
                delete query[name];
            }

            history.push({
                pathname   : pathname,
                search     : queryString.stringify(query)
            })
        })
    }

    handleReadCSV = (csv) => {
        let headers = []
        let csvList = []
        csv['data'].map((items, i)=>{
            if (i==0) {
                items.map((header, j)=>{
                    let headerTxt = encodeURI(header.trim());
                    switch (headerTxt) {
                        case '%E8%A8%82%E5%96%AE%E8%99%9F%E7%A2%BC': //????????????
                            headers[j] = 'orderID'
                            break;
                        case '%EF%BB%BF%E5%93%81%E9%A0%85%E8%99%9F%E7%A2%BC': //????????????
                            headers[j] = 'itemCode'
                            break;
                        case '%EF%BB%BF%E5%8C%85%E8%A3%B9%E7%B7%A8%E8%99%9F': //????????????
                            headers[j] = 'deliveryCode'
                            break;
                        case '%EF%BB%BF%E8%B2%A8%E9%81%8B%E5%85%AC%E5%8F%B8': //????????????
                            headers[j] = 'deliveryCompany'
                            break;
                    }
                })
            }
            if (i>0) {
                let rowObj = {}
                let hasDeliveryCode = false;
                items.map((itm, j)=>{
                    if (headers[j]) {
                        if (headers[j]=='deliveryCode' && itm.trim()!=='') {
                            hasDeliveryCode = true;
                        }
                        if (headers[j]=='deliveryCompany') {
                            itm = lang['zh-TW']['deliveryCompany']['1'];
                        }
                        rowObj[headers[j]] = itm
                    }
                    rowObj['status'] = '';
                })
                if (hasDeliveryCode) {
                    csvList.push(rowObj)
                }
            }
        })

        this.props.returnUpload({
            popupStatus: true,
            csvUploadList: csvList
        });
    }

    handleOnError = (err, file, inputElem, reason) => {
        console.error(err)
    }

    handleImport = () => {
        this.fileInput.current.value = null;
        this.fileInput.current.click()
    }

    actionYouWantToPerform = () => {

        const { formSearchObject } = this.state;
        const { location }         = this.props; 
        const { pathname, search } = location;
        const query                = () => {
            let correctQuery = {};
            Object.keys( formSearchObject ).map( keys => {
                if( formSearchObject[keys].trim()!='' ){
                    correctQuery = { ...correctQuery, [keys]: formSearchObject[keys] }
                }
            })
            return correctQuery;
        }

        this.props.dispatch( orderDownload(pathname,{...queryString.parse(search), ...query()}) ).then( res => {
            const { data } = res;
            switch( res['status'] ){
                case 200:
                    window.location.href = data['url']
                    break;

                default:
                    const { status_text } = data;
                    this.props.returnDownload({
                        popupMSG : [<div key={`error`} className="items">{lang['zh-TW']['note'][status_text]}</div>],
                        open     : true
                    });
                    break;
            }
        });
    }
}

const mapStateToProps = (state) => {
    return{
    }
}

export default connect(mapStateToProps)(HeadProduct);