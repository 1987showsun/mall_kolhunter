import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus }from '@fortawesome/free-solid-svg-icons';

// Lang
import lang from '../../../../../lang/lang.json';

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
        const { total,on_shelves,no_longer_be_sold,number_of_shelves_available } = this.props;

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
                                                <option value="">名稱</option>
                                                <option value="">品牌</option>
                                            </select>
                                        </div>
                                        <button className="basic">搜尋</button>
                                    </div>
                                </li>
                                <li>
                                    <div className="input-box select">
                                        <select name="filter" value={formSearchObject['filter']} onChange={this.handleSearchChange.bind(this)}>
                                            <option value="-1">顯示全部</option>
                                            <option value="0">上架中</option>
                                            <option value="1">下架中</option>
                                        </select>
                                    </div>
                                </li>
                            </ul>
                        </form>
                    </div>
                    <div className="page-head-action-row">
                        <ul>
                            <li>
                                <Link className="create" to={`/myvendor/categories/product/review`}>
                                    審查商品 / 新增商品 / 購買方案
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="page-alert-info">
                    <p>上架中：{on_shelves}  下架中：{no_longer_be_sold}  商品總數：{total}</p>
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
        total: state.vendor.total,
        on_shelves: state.vendor.on_shelves,
        no_longer_be_sold: state.vendor.no_longer_be_sold
    }
}

export default connect(mapStateToProps)(HeadProduct);