import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Store extends React.Component{
    render(){
        return(
            <React.Fragment>
                Store
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default connect( mapStateToProps )( Store );