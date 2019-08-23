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
                            <input type="radio" name="method" value="cc" onChange={this.handleChange.bind(this)} checked={formObject['method']=='cc'}/>
                            <div className="box"></div>
                            <div className="radio-container">
                                <span>信用卡</span>
                                {
                                    formObject['method'] == 'card' &&
                                        <Card 
                                            returnHandleChange = {this.returnCardInfo.bind(this)}
                                        />
                                }
                            </div>
                        </label>
                    </li>
                    <li>
                        <label className="radio">
                            <input type="radio" name="method" value="cvs" onChange={this.handleChange.bind(this)} checked={formObject['method']=='cvs'}/>
                            <div className="box"></div>
                            <div>超商付款</div>
                        </label>
                    </li>
                </ul>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.returnHandleChange();
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            formObject: { ...this.state.formObject, [name]: value }
        },()=>{
            this.returnHandleChange();
        })
    }

    returnCardInfo = ( val ) => {
        this.setState({
            formObject: { ...this.state.formObject, ...val }
        },()=>{
            this.returnHandleChange();
        })
    }

    returnHandleChange = () => {
        if( this.props.returnHandleChange!=undefined ){
            const { formObject } = this.state;
            this.props.returnHandleChange(formObject);
        }
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Index );