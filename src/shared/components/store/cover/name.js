import React from 'react';
import { connect } from 'react-redux';

export default class Name extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            editFormDisplay: props.editFormDisplay || false,
            formObject: {
                name: ""
            }
        }
    }

    static getDerivedStateFromProps( props, state){
        const { formObject } = state;
        if( formObject['name']=="" ) return{ formObject: { ...formObject, name: props.name} }
        return null;
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
        const { formObject } = this.state;
        this.props.updateInfo('name', formObject['name'] );
    }
}