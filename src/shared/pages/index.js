import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component{
    render(){
        return(
            <div className="row kv">
                
            </div>
        );
    }
}

const mapStateToProps = stste => {
    return{
        
    }
}

export default connect( mapStateToProps )( Home );