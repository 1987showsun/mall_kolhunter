import React from 'react';
import { connect } from 'react-redux';

// Components
import Kv from './kv';
import Store from './store';
import Category from './category';
import Product from './product';

// Stylesheets
import './style.scss';

class Home extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Kv />
                <Store />
                <Category />
                <Product />
            </React.Fragment>
        );
    }
}

const mapStateToProps = stste => {
    return{
        
    }
}

export default connect( mapStateToProps )( Home );