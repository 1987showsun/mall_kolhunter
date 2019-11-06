/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        const name = props.name || "value";
        this.state = {
            name: name,
            data: props.data || [],
            formObject: {
                [name]: props.data.length!=0? props.data[0]['value'] : ""
            }
        }
    }

    render(){

        const { name, data, formObject } = this.state;

        return(
            <ul className="select-list">
                {
                    data.map( item => {
                        return(
                            <li key={item['id']}>
                                <label htmlFor={`${item['id']}`}>
                                    <input 
                                        type="radio" 
                                        name={name} 
                                        id={`${item['id']}`} 
                                        className="variant" 
                                        value={`${item['value']}`} 
                                        onChange={this.handleChange.bind(this)} 
                                        checked={formObject[name]== item['value'] } 
                                        disabled={ item.hasOwnProperty('quantity')? item['quantity']==0 || false : false }
                                    />
                                    <span>
                                        {item['name']} 
                                        {
                                            item.hasOwnProperty('cost') &&
                                                `(運費：${item['cost']})`
                                        }
                                    </span>
                                </label>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }

    componentDidMount() {
        this.returnForm();
    }

    handleChange = (e) => {
        this.setState({
            formObject: { ...this.state.formObject, [e.target.name]: e.target.value }
        },()=>{
            this.returnForm();
        })
    }

    returnForm = () => {
        if( this.props.returnForm!=undefined ){
            const { formObject } = this.state;
            this.props.returnForm( formObject );
        }
    }
}