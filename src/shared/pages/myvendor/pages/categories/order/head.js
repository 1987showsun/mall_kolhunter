import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus }from '@fortawesome/free-solid-svg-icons';

// Lang
import lang from '../../../../../public/lang/lang.json';

class HeadProduct extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            formSearchObject: {
                search: "",
                query_key: 0,
                filter: 0
            }
        }
    }

    render(){

        const { formSearchObject } = this.state;
        const { to_be_shipped_area,on_passage,successful_delivery,cancel,returned_purchase,total } = this.props;

        return(
            <React.Fragment>
                <div className="page-head-action">
                    <div className="page-head-action-row">
                        <form className="admin-search-form" onSubmit={this.handleSearchSubmit.bind(this)}>
                            <ul>
                                <li>
                                    <div className="input-box">
                                        <input type="text" name="search" value={formSearchObject['search']} placeholder={lang['zh-TW']['Product name']} onChange={this.handleSearchChange.bind(this)}/>
                                        <div className="input-box select">
                                            <select name="query_key" value={ formSearchObject['query_key'] } onChange={this.handleSearchChange.bind(this)}>
                                                <option value="0">訂單編號</option>
                                                <option value="1">訂購人</option>
                                            </select>
                                        </div>
                                        <button className="basic">搜尋</button>
                                    </div>
                                </li>
                                <li>
                                    <div className="input-box select">
                                        <select name="filter" value={ formSearchObject['filter'] } onChange={this.handleSearchChange.bind(this)}>
                                            <option value="0">顯示全部</option>
                                            <option value="1">待出貨</option>
                                            <option value="2">運送中</option>
                                            <option value="3">完成</option>
                                            <option value="4">取消訂單</option>
                                            <option value="5">退貨</option>
                                        </select>
                                    </div>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
                <div className="page-alert-info">
                    <p>待出貨：{to_be_shipped_area}   運送中：{on_passage}   完成：{successful_delivery}   取消訂單：{cancel}   退貨：{returned_purchase}   訂單總數：{total}</p>
                </div>
            </React.Fragment>
        );
    }

    handleSearchChange = (e) => {
        let { formSearchObject } = this.state;
        let name = e.target.name;
        let val = e.target.value;
        formSearchObject = { ...formSearchObject, [name]: val }
        this.setState({
            formSearchObject
        })
    }

    handleSearchSubmit = (e) => {
        e.preventDefault();
    }
}

const mapStateToProps = (state) => {
    return{
        to_be_shipped_area: state.myvendor.to_be_shipped_area,
        on_passage: state.myvendor.on_passage,
        successful_delivery: state.myvendor.successful_delivery,
        cancel: state.myvendor.cancel,
        returned_purchase: state.myvendor.returned_purchase,
        total: state.myvendor.total,
    }
}

export default connect(mapStateToProps)(HeadProduct);