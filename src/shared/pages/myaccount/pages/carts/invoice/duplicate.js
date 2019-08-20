// 二聯式
import React from 'react';
import { connect } from 'react-redux';

class Duplicate extends React.Component{
    render(){
        return(
            <React.Fragment>
                Duplicate
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.returnForm();
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

export default connect( mapStateToProps )(Duplicate);