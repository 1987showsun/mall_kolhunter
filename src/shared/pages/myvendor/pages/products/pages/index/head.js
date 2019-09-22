import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Lang
import lang from '../../../../../../public/lang/lang.json';

class HeadProduct extends React.Component{

    constructor(props){
        
        const query = queryString.parse( props.location['search'] );
        const search = query['search'] || '';
        const method = query['method'] || 'name';
        const status = query['status'] || '';

        super(props);
        this.state = {
            loading: false,
            formSearchObject: {
                search,
                method,
                status
            }
        }
    }

    render(){

        const { loading, formSearchObject } = this.state;
        const { noneDisplay, display, review, total } = this.props;

        return(
            <React.Fragment>
                <div className="page-head-action">
                    <div className="page-head-action-row">
                        <ul>
                            <li>
                                <form className="admin-search-form" onSubmit={this.handleSearchSubmit.bind(this)}>
                                    <div className="input-box admin-keyword">
                                        <input type="text" name="search" value={formSearchObject['search']} placeholder={lang['zh-TW']['Product name']} onChange={this.handleSearchChange.bind(this)}/>
                                    </div>
                                    <div className="input-box select">
                                        <select name="method" value={ formSearchObject['method'] } onChange={this.handleSearchChange.bind(this)}>
                                            <option value="name">名稱</option>
                                            <option value="brand">品牌</option>
                                        </select>
                                    </div>
                                    <button className="basic">搜尋</button>
                                </form>
                            </li>
                            <li>
                                <div className="input-box select">
                                    <select name="status" value={formSearchObject['status']} onChange={this.handleStatusChange.bind(this)}>
                                        <option value="">顯示全部</option>
                                        <option value="display">上架中</option>
                                        <option value="none-display">下架中</option>
                                        <option value="review">審查中</option>
                                    </select>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="page-alert-info">
                    <ul>
                        <li>上架中：{display}</li>
                        <li>下架中：{noneDisplay}</li>
                        <li>審核中：{review}</li>
                        <li>商品總數：{total}</li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }

    handleStatusChange = (e) => {

        const { name, value } = e.target;
        const { formSearchObject } = this.state;
        const { location, history } = this.props;
        const { pathname, search } = location;
        let query = {};

        if( value=="" ){
            query = { ...queryString.parse(search), page: 1 };
            delete query[name];
        }else{
            query = { ...queryString.parse(search), page: 1, [name]: value };
        }

        this.setState({
            formSearchObject: {
                ...formSearchObject,
                [name]: value
            }
        },()=>{
            history.push({
                pathname,
                search: queryString.stringify(query)
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
        noneDisplay: state.myvendor.productStatus.noneDisplay,
        display: state.myvendor.productStatus.display,
        review: state.myvendor.productStatus.review,
        total: state.myvendor.productStatus.total
    }
}

export default connect(mapStateToProps)(HeadProduct);