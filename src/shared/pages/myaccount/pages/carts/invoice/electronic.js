// 電子
import React from 'react';
import { connect } from 'react-redux';

class Electronic extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            formObject: {
                eMethod: "mobile",
                code: "",
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
                            <input type="radio" name="eMethod" value="mobile" onChange={this.handleChange.bind(this)} checked={formObject['eMethod']=='mobile'}/>
                            <div className="box"></div>
                            <div className="radio-container">
                                <span>手機條碼載具</span>
                                {
                                    formObject['eMethod']=='mobile' &&
                                        <div className="input-box no-margin" style={{marginTop: '10px'}}>
                                            <input type="text" name="code" value={formObject['code']} onChange={this.handleChange.bind(this)} />
                                        </div>
                                }
                            </div>
                        </label>
                    </li>
                    <li>
                        <label className="radio full-W">
                            <input type="radio" name="eMethod" value="citizen" onChange={this.handleChange.bind(this)} checked={formObject['eMethod']=='citizen'}/>
                            <div className="box"></div>
                            <div className="radio-container">
                                <span>自然人憑證載具</span>
                                {
                                    formObject['eMethod']=='citizen' &&
                                        <div className="input-box no-margin" style={{marginTop: '10px'}}>
                                            <input type="text" name="code" value={formObject['code']} onChange={this.handleChange.bind(this)} />
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

        if( name=="eMethod" ){
            formObject = { ...formObject, [name]: value, code: "" }
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