import React from 'react';
import Textarea from 'react-textarea-autosize';
import { connect } from 'react-redux';

// Components
import Items from './item';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            list: props.data || [],
            formObject: {
                msg: "test"
            }
        }
    }

    static getDerivedStateFromProps( props,state ){
        return null;
    }

    render(){

        const { formObject, list } = this.state;

        return(
            <section className="message-wrap">
                <Items />
                <Textarea 
                    defaultValue= {formObject['msg']}
                    inputRef = { (tag)=> console.log(tag) }
                />
            </section>
        );
    }

    
}

const mapStateToPeops = state => {
    return{

    }
}

export default connect( mapStateToPeops )( Index )