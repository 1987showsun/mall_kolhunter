import React from 'react';
import { connect } from 'react-redux';

class Index extends React.Component{
    render(){
        return(
            <React.Fragment>
                categories
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default connect( mapStateToProps )( Index );