import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus }from '@fortawesome/free-solid-svg-icons';

// Lang
import lang from '../../../../../lang/lang.json';

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
        const { to_be_shipped_area,on_passage,successful_delivery,cancel,returned_purchase,total } = this.props;

        return(
            <React.Fragment>
                <div className="page-head-action">
                    <div className="page-head-action-row">
                        <ul>
                            <li>
                                <select>
                                    <option value="0">顯示全部</option>
                                    <option value="1">待出貨</option>
                                    <option value="2">運送中</option>
                                    <option value="3">完成</option>
                                    <option value="4">取消訂單</option>
                                    <option value="5">退貨</option>
                                </select>
                            </li>
                        </ul>
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
        to_be_shipped_area: state.inc.to_be_shipped_area,
        on_passage: state.inc.on_passage,
        successful_delivery: state.inc.successful_delivery,
        cancel: state.inc.cancel,
        returned_purchase: state.inc.returned_purchase,
        total: state.inc.total,
    }
}

export default connect(mapStateToProps)(HeadProduct);