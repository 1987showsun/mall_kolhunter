import React from 'react';
import queryString from 'query-string';
import { Helmet } from "react-helmet";
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
                <Helmet encodeSpecialCharacters={false}>
                    <title>{`網紅電商 - `}</title>
                    <meta name="keywords" content={`網紅電商,網紅獵人,找網紅就是快,幫你賣,電商,網購}`} />
                    <meta name="description" content={``} />
                </Helmet>
                <Kv data={kv} />
                <Store />
                <Category data={categories}/>
                <Product data={latest} />
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { location, match } = this.props;
        const { pathname, search } = location;

        this.props.dispatch( getHome(pathname,{...queryString.parse(search)}) );
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