import React from 'react';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faCheck }from '@fortawesome/free-solid-svg-icons';

export default class Delivery extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            delivery: []
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
                                <input type="checkbox" id="delivery_001" name="delivery" value="001" onChange={this.handleChange.bind(this)} />
                                <div className="box">
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                                <div className="text">全家 宅配通</div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="delivery_002">
                                <input type="checkbox" id="delivery_002" name="delivery" value="002" onChange={this.handleChange.bind(this)} />
                                <div className="box">
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                                <div className="text">7-11 黑貓宅急便</div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="delivery_003">
                                <input type="checkbox" id="delivery_003" name="delivery" value="003" onChange={this.handleChange.bind(this)} />
                                <div className="box">
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                                <div className="text">萊爾富</div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="004">
                                <input type="checkbox" id="004" name="delivery" value="004" onChange={this.handleChange.bind(this)} />
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
        const value = e.target.value;
        if( !delivery.includes(value) ){
            delivery = [ ...delivery, value ]
        }else{
            delivery = delivery.filter( filterItem => filterItem!=value );
        }
        this.setState({
            delivery
        },()=>{
            console.log( delivery );
        })
    }
}