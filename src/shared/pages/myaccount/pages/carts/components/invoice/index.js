// 發票
import React       from 'react';
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
            invoiceType: "2",
            formObject_2: {},
            formObject_3: {},
            formObject_d: {}
        }
    }

    render(){

        const { invoiceType } = this.state;

        return(
            <React.Fragment>
                <ul className="card-form-list">
                    <li>
                        <label className="radio full-W">
                            <input type="radio" name="invoiceType" value="2" onChange={this.handleChange.bind(this)} checked={invoiceType=='2'}/>
                            <div className="box"></div>
                            <div className="radio-container">
                                <span>電子發票</span>
                                {
                                    invoiceType=='2' &&
                                        <Electronic 
                                            returnForm= {(val)=>{
                                                this.setState({
                                                    formObject_2: val
                                                },()=>{
                                                    this.returnForm();
                                                })
                                            }}
                                        />
                                }
                            </div>
                        </label>
                    </li>
                    <li>
                        <label className="radio full-W">
                            <input type="radio" name="invoiceType" value="3" onChange={this.handleChange.bind(this)} checked={invoiceType=='3'}/>
                            <div className="box"></div>
                            <div className="radio-container">
                                <span>三聯式發票</span>
                                {
                                    invoiceType=='3' &&
                                        <Triplicate 
                                            returnForm= {(val)=>{
                                                this.setState({
                                                    formObject_3: val
                                                },()=>{
                                                    this.returnForm();
                                                })
                                            }}
                                        />
                                }
                            </div>
                        </label>
                    </li>
                    <li>
                        <label className="radio full-W">
                            <input type="radio" name="invoiceType" value="donate" onChange={this.handleChange.bind(this)} checked={invoiceType=='donate'}/>
                            <div className="box"></div>
                            <div className="radio-container">
                                <span>捐贈發票</span>
                                {
                                    invoiceType=='donate' &&
                                        <Donation 
                                            returnForm= {(val)=>{
                                                this.setState({
                                                    formObject_d: val
                                                },()=>{
                                                    this.returnForm();
                                                })
                                            }}
                                        />
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
           [name]: value
        },() => {
            this.returnForm();
        })
    }

    returnForm = ( val ) => {
        const { invoiceType, formObject_2, formObject_3, formObject_d } = this.state;
        let mergeFormObject = {};
        switch( invoiceType ){
            case "2":
                mergeFormObject = { ...formObject_2, invoiceType: invoiceType };
                break;

            case "3":
                mergeFormObject = { ...formObject_3, invoiceType: invoiceType };
                break;

            default:
                mergeFormObject = { ...formObject_d, invoiceType: invoiceType };
                break;
        }
        if( this.props.returnHandleChange!=undefined ){
            this.props.returnHandleChange(mergeFormObject);
        }
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Index );