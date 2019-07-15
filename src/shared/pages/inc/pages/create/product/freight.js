import React from 'react';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt }from '@fortawesome/free-solid-svg-icons';

export default class Freight extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            freight : props.freight
        }
    }

    render(){

        const { freight } = this.state;

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>運送方式</h4>
                        <button type="button" onClick={this.addCondition.bind(this)}>
                            <i><FontAwesomeIcon icon={faPlus} /></i>
                            新增條件
                        </button>
                    </article>
                    <div className="admin-content-container">
                        {
                            freight.length!=0?(
                                <ul>
                                    {
                                        freight.map( (item,i)=> {
                                            return(
                                                <li key={i}>
                                                    <div>
                                                        <div className="input-box">
                                                            <select name={`method`} value={item['method']} onChange={this.handleChange.bind(this,i)}>
                                                                <option value="0">中華郵政</option>
                                                                <option value="1">7-11 黑貓宅急便</option>
                                                                <option value="2">全家 宅配通</option>
                                                                <option value="3">萊爾富 大榮貨運</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="input-box">
                                                            <input type="tel" name={`price`} value={item['price']} onChange={this.handleChange.bind(this,i)} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button onClick={this.removeItem.bind(this,i)} className="remove">
                                                            <i><FontAwesomeIcon icon={faTrashAlt}/></i>
                                                            刪除
                                                        </button>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            ):(
                                <div className="list-no-data">請點選新增條件，新增所需條件</div>
                            )
                        }

                    </div>
                </section>
            </React.Fragment>
        );
    }

    handleChange = (i,e) => {
        let { freight } = this.state;
        let name = e.target.name;
        let val = e.target.value;
        freight[i][name] = val;
        this.setState({
            freight
        })        
    }

    removeItem = () => {

    }
    
    addCondition = () => {
        let { freight } = this.state;
        freight = [
            ...freight, 
            {
                method: "",
                price: 0
            }
        ]
        this.setState({
            freight
        })
    }
}