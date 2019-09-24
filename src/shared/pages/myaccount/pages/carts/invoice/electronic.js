// 電子
import React from 'react';
import { connect } from 'react-redux';

class Electronic extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            formObject: {
                invoiceCarruerType: "0",
                invoiceCarruerNum: "",
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
                            <input type="radio" name="invoiceCarruerType" value={0} onChange={this.handleChange.bind(this)} checked={formObject['invoiceCarruerType']=='0'}/>
                            <div className="box"></div>
                            <div className="radio-container">
                                <span>電商載具</span>
                                {
                                    formObject['invoiceCarruerType']=='0' &&
                                        <div className="input-box no-margin" style={{marginTop: '10px'}}>
                                            <input type="text" name="invoiceCarruerNum" value={formObject['invoiceCarruerNum']} onChange={this.handleChange.bind(this)} />
                                        </div>
                                }
                            </div>
                        </label>
                    </li>
                    <li>
                        <label className="radio full-W">
                            <input type="radio" name="invoiceCarruerType" value={1} onChange={this.handleChange.bind(this)} checked={formObject['invoiceCarruerType']=='1'}/>
                            <div className="box"></div>
                            <div className="radio-container">
                                <span>自然人憑證載具</span>
                                {
                                    formObject['invoiceCarruerType']=='1' &&
                                        <div className="input-box no-margin" style={{marginTop: '10px'}}>
                                            <input type="text" name="invoiceCarruerNum" value={formObject['invoiceCarruerNum']} onChange={this.handleChange.bind(this)} />
                                        </div>
                                }
                            </div>
                        </label>
                    </li>
                    <li>
                        <label className="radio full-W">
                            <input type="radio" name="invoiceCarruerType" value={2} onChange={this.handleChange.bind(this)} checked={formObject['invoiceCarruerType']=='2'}/>
                            <div className="box"></div>
                            <div className="radio-container">
                                <span>手機條碼載具</span>
                                {
                                    formObject['invoiceCarruerType']=='2' &&
                                        <div className="input-box no-margin" style={{marginTop: '10px'}}>
                                            <input type="text" name="invoiceCarruerNum" value={formObject['invoiceCarruerNum']} onChange={this.handleChange.bind(this)} />
                                        </div>
                                }
                            </div>
                        </label>
                    </li>
                </ul>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.returnForm();
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        let formObject = { ...this.state.formObject };

        if( name=="invoiceCarruerType" ){
            formObject = { ...formObject, [name]: value, invoiceCarruerNum: "" }
        }else{
            formObject = { ...formObject, [name]: value }
        }

        this.setState({
            formObject
        },()=>{
            this.returnForm();
        })
    }

    returnForm = () => {
        if( this.props.returnForm!=undefined ){
            const { formObject } = this.state;
            this.props.returnForm(formObject);
        }
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )(Electronic);