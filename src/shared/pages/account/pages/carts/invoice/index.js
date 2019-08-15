// 發票
import React from 'react';
import { connect } from 'react-redux';

// Components
import Electronic from './electronic';
import Duplicate from './duplicate';
import Triplicate from './triplicate';
import Donation from './donation';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            formObject: {
                invoiceMethod: "electronic"
            }
        }
    }

    render(){

        const { formObject } = this.state;

        return(
            <React.Fragment>
                <ul className="card-form-list">
                    <li>
                        <label className="radio full-W">
                            <input type="radio" name="invoiceMethod" value="electronic" onChange={this.handleChange.bind(this)} checked={formObject['invoiceMethod']=='electronic'}/>
                            <div className="box"></div>
                            <div className="radio-container">
                                <span>電子發票</span>
                                {
                                    formObject['invoiceMethod']=='electronic' &&
                                        <Electronic />
                                }
                            </div>
                        </label>
                    </li>
                    <li>
                        <label className="radio full-W">
                            <input type="radio" name="invoiceMethod" value="triplicate" onChange={this.handleChange.bind(this)} checked={formObject['invoiceMethod']=='triplicate'}/>
                            <div className="box"></div>
                            <div className="radio-container">
                                <span>三聯式發票</span>
                                {
                                    formObject['invoiceMethod']=='triplicate' &&
                                        <Triplicate />
                                }
                            </div>
                        </label>
                    </li>
                    <li>
                        <label className="radio full-W">
                            <input type="radio" name="invoiceMethod" value="donation" onChange={this.handleChange.bind(this)} checked={formObject['invoiceMethod']=='donation'}/>
                            <div className="box"></div>
                            <div className="radio-container">
                                <span>捐贈發票</span>
                                {
                                    formObject['invoiceMethod']=='donation' &&
                                        <Donation />
                                }
                            </div>
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