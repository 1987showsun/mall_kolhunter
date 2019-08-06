import React from 'react';
import { connect } from 'react-redux';

// Components
import Kv from './kv';
import Store from './store';
import Category from './category';
import Product from './product';

// Actions
import { getHome, test } from '../../actions/home';

// Stylesheets
import './style.scss';

class Home extends React.Component{

    static initialAction( NODE_ENV ) {
        return getHome( NODE_ENV );
    }

    constructor(props){
        super(props);
        this.state = {
            kv: props.kv,
            latest: props.latest
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            kv: props.kv,
            latest: props.latest
        }
    }

    render(){

        const { kv, latest } = this.state;

        return(
            <React.Fragment>
                <Kv data={kv} />
                <Store />
                <Category />
                <Product data={latest} />
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.props.dispatch( getHome() );
    }
}

const mapStateToProps = state => {
    return{
        kv: state.home.kv,
        latest: state.home.latest
    }
}

export default connect( mapStateToProps )( Home );