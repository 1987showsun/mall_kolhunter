import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Lang
import lang from '../../../../../lang/lang.json';

class HeadProduct extends React.Component{

    constructor(props){
        
        const query = queryString.parse( props.location['search'] );
        const sort = query['sort'] || 'desc';
        const sortBy = query['sortBy'] || 'created';
        const search = query['search'] || '';
        const method = query['method'] || 'name';

        super(props);
        this.state = {
            formSearchObject: {
                search,
                method,
                sort,
                sortBy
            }
        }
    }

    render(){

        const { formSearchObject } = this.state;
        const { 
            total,
            auth, 
            nonDisplay, 
            noneAuth,
            match, 
            location, 
            history
        } = this.props;

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
                                            <select name="method" value={ formSearchObject['method'] } onChange={this.handleSearchChange.bind(this)}>
                                                <option value="name">名稱</option>
                                                <option value="brand">品牌</option>
                                            </select>
                                        </div>
                                        <button className="basic">搜尋</button>
                                    </div>
                                </li>
                                <li>
                                    <div className="input-box select">
                                        <select name="sort" value={`${formSearchObject['sort']}-${formSearchObject['sortBy']}`} onChange={this.handleSortChange.bind(this)}>
                                            <option value="desc-created">建立時間由高到低</option>
                                            <option value="asc-created">建立時間由低到高</option>
                                            <option value="desc-sellPrice">促銷價格由高到低</option>
                                            <option value="asc-sellPrice">促銷價格由低到高</option>
                                            <option value="desc-price">原始售價由高到低</option>
                                            <option value="asc-price">原始售價由低到高</option>
                                            <option value="desc-modify">編輯時間由高到低</option>
                                            <option value="asc-modify">編輯時間由低到高</option>
                                        </select>
                                    </div>
                                </li>
                            </ul>
                        </form>
                    </div>
                    <div className="page-head-action-row">
                        <ul>
                            <li>
                                <Link className="create" to={`/myvendor/categories/product/review?page=1&sort=desc&sortBy=created&limit=30`}>
                                    審查商品 / 新增商品 / 購買方案
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="page-alert-info">
                    <p>上架中：{auth}  下架中：{nonDisplay}  審核中：{noneAuth}  商品總數：{total}</p>
                </div>
            </React.Fragment>
        );
    }

    handleSortChange = (e) => {
        const { location, history } = this.props;
        const pathname = location['pathname'];
        const search = queryString.parse(location['search']);
        const val = e.target.value;
        const sort = val.split('-')[0];
        const sortBy = val.split('-')[1];
        const formSearchObject = { ...this.state.formSearchObject, status: "auth,non-display", sort: sort, sortBy: sortBy }
        this.setState({
            formSearchObject
        },()=>{
           let query = { ...search, sort: formSearchObject['sort'], status: "auth,non-display", sortBy: formSearchObject['sortBy'] }
            history.push({
                pathname: pathname,
                search: `?${queryString.stringify(query)}`
            });
        })
    }

    handleSearchChange = (e) => {
        let { formSearchObject } = this.state;
        let name = e.target.name;
        let val = e.target.value;
        if( name=='sort' ){
            const sort = val.split('-')[0];
            const sortBy = val.split('-')[1];
            formSearchObject = { ...formSearchObject, ['sort']: sort, ['sortBy']: sortBy }
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
        const pathname = location['pathname'];
        const search = queryString.parse(location['search']);
        const query =  { ...search, ...this.state.formSearchObject };
        history.push({
            pathname: pathname,
            search: `?${queryString.stringify(query)}`
        });
    }
}

const mapStateToProps = (state) => {
    return{
        total: state.vendor.total,
        auth: state.vendor.auth,
        nonDisplay: state.vendor.nonDisplay,
        noneAuth: state.vendor.noneAuth
    }
}

export default connect(mapStateToProps)(HeadProduct);