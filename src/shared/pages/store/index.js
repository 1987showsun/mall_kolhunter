import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Components
import Breadcrumbs from './breadcrumbs';
import BlockList from '../../module/blockList';
import Item from '../../module/item/store';

// Actions
import { storeList,ssrStoreList } from '../../actions/store';

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
        return ssrStoreList( NODE_ENV,pathname,query );
    }

    constructor(props){
        super(props);
        this.state = {
            data: props.list
        }
    }

    static getDerivedStateFromProps( props,state ) {
        return{
            data: props.list
        }
    }

    render(){

        const { match, location } = this.props;
        const { data } = this.state;

        return(
            <React.Fragment>
                <div className="row">
                    <section className="container main-content">
                        <section className="container-col" data-flexdirection="column" >
                            <Breadcrumbs />
                            <BlockList className="store-card">
                                {
                                    data.map( item => {
                                        return(
                                            <li key={item['id']}>
                                                <Item path={`/approach/${item['id']}`} data={item}/>
                                            </li>
                                        )
                                    })
                                }
                            </BlockList>
                        </section>
                    </section>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { location } = this.props;
        const query = { ...initQuery, ...queryString.parse(location['search']) };
        const pathname = location['pathname'];
        this.props.dispatch( storeList(pathname,query) );
    }
}

const mapStateToProps = state => {
    return{
        list: state.store.list
    }
}

export default connect( mapStateToProps )( Index );