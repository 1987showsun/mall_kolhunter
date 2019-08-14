import React from 'react';
import { connect } from 'react-redux';

// Components
import Kv from './kv';
import Store from './store';
import Category from './category';
import Product from './product';

// Actions
import { getHome } from '../../actions/home';

// Stylesheets
import './style.scss';

class Home extends React.Component{

    static initialAction( NODE_ENV,pathname,query ) {
        return getHome( NODE_ENV,pathname,query );
    }

    constructor(props){
        super(props);
        this.state = {
            kv: props.kv,
            latest: props.latest,
            categories: props.categories
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            kv: props.kv,
            latest: props.latest,
            categories: props.categories
        }
    }

    render(){

        const { kv, latest, categories } = this.state;

        return(
            <React.Fragment>
                <Kv data={kv} />
                <Store />
                <Category data={categories}/>
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
        latest: state.home.latest,
        categories: state.common.categoriesList,
    }
}

export default connect( mapStateToProps )( Home );