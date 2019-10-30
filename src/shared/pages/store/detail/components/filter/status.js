import React from 'react';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faCheck }from '@fortawesome/free-solid-svg-icons';

export default class Product extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            status: []
        }
    }

    render(){

        const { status } = this.state;

        return(
            <div className="filter-unit" data-direction="column" >
                <div className="filter-unit-row title">
                    <h3>商品狀況</h3>
                </div>
                <div className="filter-unit-row">
                    <ul className="filter-list-ul">
                        <li>
                            <label htmlFor="status_001">
                                <input type="checkbox" id="status_001" name="status" value="001" onChange={this.handleChange.bind(this)} />
                                <div className="box">
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                                <div className="text">現貨</div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="status_002">
                                <input type="checkbox" id="status_002" name="status" value="002" onChange={this.handleChange.bind(this)} />
                                <div className="box">
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                                <div className="text">預購商品</div>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="status_003">
                                <input type="checkbox" id="status_003" name="status" value="003" onChange={this.handleChange.bind(this)} />
                                <div className="box">
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                                <div className="text">免運費</div>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    handleChange = (e) => {
        let { status } = this.state;
        const value = e.target.value;
        if( !status.includes(value) ){
            status = [ ...status, value ]
        }else{
            status = status.filter( filterItem => filterItem!=value );
        }
        this.setState({
            status
        })
    }
}