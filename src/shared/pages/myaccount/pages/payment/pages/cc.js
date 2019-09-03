import React from "react";
import { connect } from 'react-redux';

class Cc extends React.Component{
    render(){
        return(
            <React.Fragment>
                Cc
            </React.Fragment>
        );
    }
}

const mapStateToProps = state =>{
    return{

    }
}

export default connect( mapStateToProps )( Cc );