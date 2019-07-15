import React from 'react';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt }from '@fortawesome/free-solid-svg-icons';

export default class Format extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            format: props.format,
        }
    }

    render(){

        const { format } = this.state;

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>商品規格</h4>
                        <button type="button" onClick={this.addCondition.bind(this)}>
                            <i><FontAwesomeIcon icon={faPlus} /></i>
                            新增規格
                        </button>
                    </article>
                    <div className="admin-content-container">
                        {
                            format.length!=0? (
                                <ul>
                                    {
                                        format.map( (item,i)=> {
                                            return(
                                                <li key={i}>
                                                    <div>
                                                        <div className="input-box">
                                                            <input type="text" name={`model`} value={item['model']} onChange={this.handleChange.bind(this,i)} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="input-box">
                                                            <input type="text" name={`p_id`} value={item['p_id']} onChange={this.handleChange.bind(this,i)} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="input-box">
                                                            <input type="tel" name={`quantity`} value={item['quantity']} onChange={this.handleChange.bind(this,i)} />
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

    handleChange = (e) => {

    }

    removeItem = () => {

    }

    addCondition = () => {
        let { format } = this.state;
        format = [
            ...format, 
            {
                model: "",
                p_id: "",
                quantity: 0
            }
        ]
        this.setState({
            format
        })
    }
}