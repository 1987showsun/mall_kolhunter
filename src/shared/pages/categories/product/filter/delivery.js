import React from 'react';
import queryString from 'query-string';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faCheck }from '@fortawesome/free-solid-svg-icons';

export default class Delivery extends React.Component{

    constructor(props){

        const { search } = props.location;
        const delivery = queryString.parse(search)['delivery'];
        let deliveryArray = [];
        if( delivery!=undefined ){
            deliveryArray=delivery.split(',')!=undefined? delivery.split(','): [];
        }

        super(props);
        this.state = {
            delivery: deliveryArray
        }
    }

    render(){
        const { delivery } = this.state;
        return(
            <div className="filter-unit" data-direction="column" >
                <div className="filter-unit-row title">
                    <h3>運送方式</h3>
                </div>
                <div className="filter-unit-row">
                    <ul className="filter-list-ul">
                        <li>
                            <label htmlFor="delivery_001">
                                <input type="checkbox" id="delivery_001" name="delivery" value="001" onChange={this.handleChange.bind(this)} checked={delivery.includes('001')}/>
                                <div className="box">
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                                <div className="text">全家 宅配通</div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="delivery_002">
                                <input type="checkbox" id="delivery_002" name="delivery" value="002" onChange={this.handleChange.bind(this)} checked={delivery.includes('002')}/>
                                <div className="box">
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                                <div className="text">7-11 黑貓宅急便</div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="delivery_003">
                                <input type="checkbox" id="delivery_003" name="delivery" value="003" onChange={this.handleChange.bind(this)} checked={delivery.includes('003')}/>
                                <div className="box">
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                                <div className="text">萊爾富</div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="delivery_004">
                                <input type="checkbox" id="delivery_004" name="delivery" value="004" onChange={this.handleChange.bind(this)} checked={delivery.includes('004')}/>
                                <div className="box">
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                                <div className="text">中華郵政</div>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    handleChange = (e) => {
        let { delivery } = this.state;
        let { search } = this.props.location;
        const value = e.target.value;
        if( !delivery.includes(value) ){
            delivery = [ ...delivery, value ]
        }else{
            delivery = delivery.filter( filterItem => filterItem!=value );
        }
        this.setState({
            delivery
        },()=>{
            let searchObject = {};
            if( delivery.length!=0 ){
                searchObject = { ...queryString.parse(search),delivery: delivery.toString()};
                this.props.history.push({
                    search: `?${queryString.stringify(searchObject)}`
                })
            }else{
                searchObject = { ...queryString.parse(search) };
                delete searchObject['delivery'];
                this.props.history.push({
                    search: `?${queryString.stringify(searchObject)}`
                })
            }
        })
    }
}