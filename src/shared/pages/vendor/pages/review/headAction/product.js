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