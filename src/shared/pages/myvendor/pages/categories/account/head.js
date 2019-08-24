import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus }from '@fortawesome/free-solid-svg-icons';

// Lang
import lang from '../../../../../public/lang/lang.json';

class HeadAccount extends React.Component{

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

        return(
            <React.Fragment>
                <div className="page-head-action">
                    <div className="page-head-action-row">
                        <ul>
                            <li>
                                <a href="" className="download">下載報表</a>
                            </li>
                            <li>
                                <div className="input-box select">
                                    <select>
                                        <option value="0">本期</option>
                                        <option value="1">第一期</option>
                                        <option value="2">第二期</option>
                                        <option value="3">第三期</option>
                                        <option value="4">第四期</option>
                                        <option value="5">第五期</option>
                                    </select>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="page-alert-info">
                    <p>待出貨：4   運送中：1   完成：4   取消訂單：2   退貨：2   訂單總數：13</p>
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

    }
}

export default connect(mapStateToProps)(HeadAccount);