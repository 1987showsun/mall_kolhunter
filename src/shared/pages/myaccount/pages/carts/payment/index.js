// 付款方式
import React from 'react';
import { connect } from 'react-redux';

import Card from './card';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            formObject: {
                method: "atm"
            }
        }
    }

    render(){

        const { formObject } = this.state;

        return(
            <React.Fragment>
                <ul className="card-form-list">
                    <li>
                        <label className="radio">
                            <input type="radio" name="method" value="atm" onChange={this.handleChange.bind(this)} checked={formObject['method']=='atm'}/>
                            <div className="box"></div>
                            <div>ATM</div>
                        </label>
                    </li>
                    <li>
                        <label className="radio">
                            <input type="radio" name="method" value="card" onChange={this.handleChange.bind(this)} checked={formObject['method']=='card'}/>
                            <div className="box"></div>
                            <div className="radio-container">
                                <span>Credit card</span>
                                {
                                    formObject['method'] == 'card' &&
                                        <Card />
                                }
                            </div>
                        </label>
                    </li>
                    <li>
                        <label className="radio">
                            <input type="radio" name="method" value="payment-711" onChange={this.handleChange.bind(this)} checked={formObject['method']=='payment-711'}/>
                            <div className="box"></div>
                            <div>7-11 超商付款</div>
                        </label>
                    </li>
                    <li>
                        <label className="radio">
                            <input type="radio" name="method" value="payment-family" onChange={this.handleChange.bind(this)} checked={formObject['method']=='payment-family'}/>
                            <div className="box"></div>
                            <div>全家 超商付款</div>
                        </label>
                    </li>
                </ul>
            </React.Fragment>
        );
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            formObject: { ...this.state.formObject, [name]: value }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Index );