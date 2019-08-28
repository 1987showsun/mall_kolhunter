import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus }from '@fortawesome/free-solid-svg-icons';

// Lang
import lang from '../../../../../public/lang/lang.json';

class HeadProduct extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){

        const {
            addProductTotal,
            selectedQuantity,
            totalAmount
        } = this.props;

        return(
            <React.Fragment>
                <div className="page-head-action">
                    <div className="page-head-action-row">
                        <ul>
                            <li>
                                <Link className="create" to={`/myvendor/create/product`}>
                                    <i><FontAwesomeIcon icon={faPlus} /></i>
                                    新增商品
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="page-alert-info">
                    <ul>
                        <li>已新增商品：{addProductTotal}</li>
                        <li>已選方案數：{selectedQuantity}</li>
                        <li>總金額：<CurrencyFormat value={totalAmount} displayType={'text'} thousandSeparator={true} /></li>
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
        total: state.myvendor.total,
        on_shelves: state.myvendor.on_shelves,
        no_longer_be_sold: state.myvendor.no_longer_be_sold
    }
}

export default connect(mapStateToProps)(HeadProduct);