import React from 'react';
import { connect } from 'react-redux';

export default class Name extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            editFormDisplay: props.editFormDisplay || false,
            formObject: {
                name: props.name || ""
            }
        }
    }

    static getDerivedStateFromProps( props, state){

        let formObject = { ...state.formObject };

        if( props.name!=undefined && props.name!=state.formObject['name'] ){
            formObject = { ...formObject, name: props.name };
        }

        return{
            formObject
        }
    }

    render(){

        const { editFormDisplay, formObject } = this.state;

        return(
            <div className="name">
                {
                    editFormDisplay? (
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="input-box">
                                <input type="text" name="name" value={formObject['name']} onChange={this.handleChange.bind(this)} placeholder=""/>
                                <button type="submit">更新</button>
                            </div>
                        </form>
                    ):(
                        formObject['name']
                    )
                }
            </div>
        );
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            formObject: { ...this.state.formObject , [name]: value }
        })
    }

    handleSubmit = ( e ) => {
        e.preventDefault();
    }
}