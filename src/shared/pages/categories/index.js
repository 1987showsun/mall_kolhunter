import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

//Compoents
import Product from './product/';

// Actions
import { productList, ssrProductList } from '../../actions/categories';

const initQuery = {
    page: 1,
    limit: 30,
    sort: "desc",
    sortBy: "created"
}

class Index extends React.Component{

    static initialAction( NODE_ENV,pathname,query ) {
        query = {
            ...initQuery,
            ...query
        }
        return ssrProductList( NODE_ENV,pathname,query );
    }

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
        const { location } = this.props;
        const query = { ...initQuery, ...queryString.parse(location['search']) };
        const pathname = location['pathname'];
        this.props.dispatch( productList(pathname,query) );
    }

    componentDidUpdate(prevProps, prevState) {
        
    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default connect( mapStateToProps )( Index );