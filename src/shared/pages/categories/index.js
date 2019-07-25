import React from 'react';
import { connect } from 'react-redux';

//Compoents
import Product from './product/';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){

        const { match, location, history } = this.props;

        return(
            <React.Fragment>             
                <Product 
                    history={history}
                    match={match}
                    location={location}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default connect( mapStateToProps )( Index );