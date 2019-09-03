import React from "react";
import { connect } from 'react-redux';

class Cvs extends React.Component{
    render(){
        return(
            <React.Fragment>
                Cvs
            </React.Fragment>
        );
    }
}

const mapStateToProps = state =>{
    return{

    }
}

export default connect( mapStateToProps )( Cvs );