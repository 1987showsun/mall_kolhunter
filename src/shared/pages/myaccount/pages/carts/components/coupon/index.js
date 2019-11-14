/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

// 優惠券 ＆ 折扣碼
import React                    from 'react';
import { connect }              from 'react-redux';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            formObject: {
                coupon: ""
            }
        }
    }

    render(){

        const { formObject } = this.state;

        return(
            <ul className="card-form-list">
                <li>
                    <label>代碼</label>
                    <div className="input-box">
                        <input type="text" name="coupon" value={formObject['coupon']} onChange={this.handleChange.bind(this)} />
                        <button type="submit" className="coupon" onClick={this.handleSubmit.bind(this)}>查詢</button>
                    </div>
                </li>
            </ul>
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