/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

import React                              from 'react';
import queryString                        from 'query-string';
import { connect }                        from 'react-redux';
import { FontAwesomeIcon }                from '@fortawesome/react-fontawesome';
import { faCheck }                        from '@fortawesome/free-solid-svg-icons';

class Delivery extends React.Component{

    constructor(props){

        const { search } = props.location;
        const delivery = queryString.parse(search)['delivery'];
        let deliveryArray = [];
        if( delivery!=undefined ){
            deliveryArray=delivery.split(',')!=undefined? delivery.split(','): [];
        }

        super(props);
        this.state = {
            data: [],
            delivery: deliveryArray
        }
    }

    static getDerivedStateFromProps( props,state ){
        let delivery = state.delivery;
        if( props.clear == true ){
            delivery = [];
        }
        return{
            delivery,
            data: props.deliveries
        }
    }

    render(){
        const { data, delivery } = this.state;
        return(
            <div className="filter-unit" data-direction="column" >
                <div className="filter-unit-row title">
                    <h3>運送方式</h3>
                </div>
                <div className="filter-unit-row">
                    <ul className="filter-list-ul">
                        {
                            data.map( item => {
                                return(
                                    <li key={ item['id'] }>
                                        <label htmlFor={ item['id'] }>
                                            <input type="checkbox" id={ item['id'] } name="delivery" value={item['id']} onChange={this.handleChange.bind(this)} checked={delivery.includes( String(item['id']) )}/>
                                            <div className="box">
                                                <FontAwesomeIcon icon={faCheck} />
                                            </div>
                                            <div className="text">{ item['name'] }</div>
                                        </label>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }

    handleChange = (e) => {
        let { delivery } = this.state;
        let { search } = this.props.location;
        const value = e.target.value;

        // 檢查有無相同條件
        if( !delivery.includes(value) ){
            delivery = [ ...delivery, value ]
        }else{
            delivery = delivery.filter( filterItem => filterItem!=value );
        }

        this.setState({
            delivery
        },()=>{
            let searchObject = { ...queryString.parse(search), page:1 };
            if( delivery.length!=0 ){
                searchObject = { ...searchObject, delivery: delivery.toString()};
                this.props.history.push({
                    search: `?${queryString.stringify(searchObject)}`
                })
            }else{
                delete searchObject['delivery'];
                this.props.history.push({
                    search: `?${queryString.stringify(searchObject)}`
                })
            }
        })
    }
}

const mapStateToProps = state => {
    return{
        deliveries: state.common.deliveries
    }
}

export default connect( mapStateToProps )( Delivery );