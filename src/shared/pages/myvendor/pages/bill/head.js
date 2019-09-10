import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus }from '@fortawesome/free-solid-svg-icons';

// Lang
import lang from '../../../../public/lang/lang.json';

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
                                <div className="input-box select">
                                    <select>
                                        <option value="0">付款完成</option>
                                        <option value="1">未付款</option>
                                        <option value="2">取消訂單</option>
                                    </select>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="page-alert-info">
                    <ul>
                        <li>已付款：2</li>
                        <li>未付款：1</li>
                        <li>取消：2</li>
                    </ul>
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