import React from 'react';

// Components
import Card from './card';

export default  class PayMethod extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            formObject: {
                payMethod: 'atm'
            }
        }
    }

    render(){

        const { formObject } = this.state;

        return(
            <ul className="card-form-list">
                <li>
                    <label className="radio">
                        <input type="radio" name="payMethod" value="atm" onChange={this.handleChange.bind(this)} checked={ formObject['payMethod']=='atm' }/>
                        <div className="box"></div>
                        <div>ATM</div>
                    </label>
                </li>
                {/* <li>
                    <label className="radio">
                        <input type="radio" name="payMethod" value="cc" onChange={this.handleChange.bind(this)} checked={ formObject['payMethod']=='cc' }/>
                        <div className="box"></div>
                        <div>信用卡</div>
                    </label>
                </li> */}
                <li>
                    <label className="radio">
                        <input type="radio" name="payMethod" value="cc" onChange={this.handleChange.bind(this)} checked={ formObject['payMethod']=='cc' }/>
                        <div className="box"></div>
                        <div className="radio-container">
                            <span>信用卡</span>
                            {
                                formObject['payMethod'] == 'cc' &&
                                    <Card 
                                        match = {this.props.match}
                                        location = {this.props.location}
                                        returnHandleChange = {this.returnCardInfo.bind(this)}
                                    />
                            }
                        </div>
                    </label>
                </li>
            </ul>
        );
    }

    componentDidMount() {
        this.returnHandleChange();
    }

    handleChange = ( e ) => {
        const { name, value } = e.target;
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
        // let { formObject } = this.state;
        // if( this.props.returnHandleChange ){
        //     this.props.returnHandleChange(formObject);
        // }

        if( this.props.returnHandleChange!=undefined ){
            const { formObject } = this.state;
            const { payMethod } = formObject;
            if( payMethod!='cc' ){
                delete formObject['cardno'];
                delete formObject['cvc'];
                delete formObject['exp'];
            }
            this.props.returnHandleChange(formObject);
        }
    }
}