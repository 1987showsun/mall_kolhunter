import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Modules
import Datetime from '../../../../module/datetime';

// Lang
import lang from '../../../../public/lang/lang.json';

class HeadProduct extends React.Component{

    constructor(props){
        super(props);
        const { location } = props;
        const searchObject = queryString.parse(location['search']);
        this.state = {
            orderStatus: searchObject['orderStatus'] || "",
            refundStatus: searchObject['refundStatus'] || "",
            startDate: "",
            endDate: "",
            formSearchObject: {
                keyword: "",
                query_key: "orderID"
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
                                    <div className="input-box admin-keyword">
                                        <input type="text" name="keyword" value={formSearchObject['keyword']} placeholder={lang['zh-TW']['Product name']} onChange={this.handleSearchChange.bind(this)}/>
                                    </div>
                                    <div className="input-box select">
                                        <select name="query_key" value={ formSearchObject['query_key'] } onChange={this.handleSearchChange.bind(this)}>
                                            <option value="orderID">訂單編號</option>
                                            <option value="orderName">訂購人</option>
                                        </select>
                                    </div>
                                    <Datetime returnForm={ (val) => {
                                        this.setState({
                                            startDate: `${val['year']}-${val['month']}-${val['day']}`
                                        })
                                    }}/>
                                    <Datetime returnForm={ (val) => {
                                        this.setState({
                                            endDate: `${val['year']}-${val['month']}-${val['day']}`
                                        })
                                    }}/>
                                    <button className="basic">搜尋</button>
                                </form>
                            </li>
                            <li> 
                                <div className="input-box select">
                                    <select name="orderStatus" value={ orderStatus } onChange={this.filterData.bind(this)}>
                                        <option value="">顯示全部</option>
                                        <option value="init">待付款</option>
                                        <option value="paid">已付款</option>
                                        <option value="payfailure">付款失敗</option>
                                    </select>
                                </div>
                            </li>
                            <li>
                                <div className="input-box select">
                                    <select name="refundStatus" value={ refundStatus } onChange={this.filterData.bind(this)}>
                                        <option value="">顯示全部</option>
                                        <option value="none">沒有</option>
                                        <option value="request">請求</option>
                                        <option value="approve">批准</option>
                                        <option value="waiting">運送中</option>
                                        <option value="reject">拒絕</option>
                                        <option value="done">完成</option>
                                    </select>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="page-alert-info">
                    <ul>
                        <li>
                            訂單總筆數：{total}
                        </li>
                        <li>
                            當前頁面總金額：{totalAmount}
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }

    handleSearchChange = (e) => {
        let { formSearchObject } = this.state;
        let name = e.target.name;
        let val = e.target.value;

        if( name=="startDate" || name=="endDate" ){            
            formSearchObject = { ...formSearchObject, [name]: val }
        }else{
            formSearchObject = { ...formSearchObject, [name]: val }
        }

        this.setState({
            formSearchObject
        })
    }

    handleSearchSubmit = (e) => {
        e.preventDefault();
        const { location, history } = this.props;
        const { formSearchObject } = this.state;
        const { pathname, search } = location;
        let searchObject = {
            startDate: this.state.startDate,
            endDate: this.state.endDate
        };
        if( formSearchObject['keyword']!="" ){
            searchObject = { 
                ...searchObject,
                [formSearchObject['query_key']]: formSearchObject['keyword'],
            }
        }
        
        history.push({
            pathname: pathname,
            search: queryString.stringify({ ...queryString.parse(search), ...searchObject })
        })
        console.log( searchObject );
    }

    filterData = (e) => {

        const { history, location } = this.props;
        const { pathname,search } = location;
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value
        },()=>{

            const query = { ...queryString.parse(search),[name]: value };
            if( value=="" ){
                delete query[name];
            }

            history.push({
                pathname: pathname,
                search: queryString.stringify(query)
            })
        })
    }
}

const mapStateToProps = (state) => {
    return{
    }
}

export default connect(mapStateToProps)(HeadProduct);