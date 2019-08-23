import React from 'react';

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
            <ul className="program-form-ul">
                <li>
                    <label className="radio">
                        <input type="radio" name="payMethod" value="atm" onChange={this.handleChange.bind(this)} checked={ formObject['payMethod']=='atm' }/>
                        <div className="box"></div>
                        <div>ATM 付款</div>
                    </label>
                </li>
                {/* <li>
                    <label className="radio">
                        <input type="radio" name="payMethod" value="cc" onChange={this.handleChange.bind(this)} checked={ formObject['payMethod']=='cc' }/>
                        <div className="box"></div>
                        <div>信用卡 付款</div>
                    </label>
                </li>
                <li>
                    <label className="radio">
                        <input type="radio" name="payMethod" value="cvs" onChange={this.handleChange.bind(this)} checked={ formObject['payMethod']=='cvs' }/>
                        <div className="box"></div>
                        <div>超商 付款</div>
                    </label>
                </li> */}
            </ul>
        );
    }

    componentDidMount() {
        this.returnHandleChange();
    }

    handleChange = ( e ) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            formObject: { ...this.state.formObject, [name]: value }
        },()=>{
            this.returnHandleChange();
        })
    }

    returnHandleChange = () => {
        let { formObject } = this.state;
        if( this.props.returnHandleChange ){
            this.props.returnHandleChange(formObject);
        }
    }
}