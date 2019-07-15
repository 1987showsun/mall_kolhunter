import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus }from '@fortawesome/free-solid-svg-icons';

// Lang
import lang from '../../../../../lang/lang.json';
import inc from '../../../../../redux/reducers/inc.js';

class HeadProduct extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            formSearchObject: {
                search: ""
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
                        <ul>
                            <li>
                                <form className="admin-search-form" onSubmit={this.handleSearchSubmit.bind(this)}>
                                    <div className="input-box">
                                        <input type="text" name="search" value={formSearchObject['search']} placeholder={lang['zh-TW']['Product name']} onChange={this.handleSearchChange.bind(this)}/>
                                    </div>
                                    <button className="basic">搜尋</button>
                                </form>
                            </li>
                            <li>
                                <select>
                                    <option value="0">顯示全部</option>
                                    <option value="1">上架中</option>
                                    <option value="2">下架中</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                    <div className="page-head-action-row">
                        <ul>
                            <li>
                                <button>已選下架</button>
                            </li>
                            <li>
                                <button>已選上架</button>
                            </li>
                            <li>
                                <Link className="create" to={`/inc/create/product`}>
                                    <i><FontAwesomeIcon icon={faPlus} /></i>
                                    新增商品({number_of_shelves_available})
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="page-alert-info">
                    <p>上架中：{on_shelves}  下架中：{no_longer_be_sold}  商品總數：{total}  剩下可上架數：{number_of_shelves_available}</p>
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
        total: state.inc.total,
        on_shelves: state.inc.on_shelves,
        no_longer_be_sold: state.inc.no_longer_be_sold,
        number_of_shelves_available: state.inc.number_of_shelves_available,
    }
}

export default connect(mapStateToProps)(HeadProduct);