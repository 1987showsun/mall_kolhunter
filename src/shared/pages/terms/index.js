import React from 'react';
import { connect } from 'react-redux';

class Index extends React.Component{
    render(){
        return(
            <React.Fragment>
                條款
            </React.Fragment>
        );
    }
}

const mapStateToProps = () => {
    return{

    }
}

export default connect( mapStateToProps )( Index );