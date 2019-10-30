import React             from 'react';
import queryString       from 'query-string';
import { Helmet }        from "react-helmet";
import { connect }       from 'react-redux';

// Components
import Breadcrumbs       from './components/breadcrumbs';

// Modules
import BlockList         from '../../../module/blockList';
import Item              from '../../../module/item/store';
import Pagination        from '../../../module/pagination';
import Loading           from '../../../module/loading/mallLoading';

// Actions
import { ssrStoreList, storeList }  from '../../../actions/store';

class Index extends React.Component{

    static initialAction( NODE_ENV,pathname,query ) {
        return ssrStoreList( NODE_ENV,pathname,query );
    }

    constructor(props){
        super(props);
        this.state = {
            loading     : false,
            data        : props.list,
            total       : props.total,
            limit       : props.limit,
            current     : props.current,
            totalPages  : props.totalPages
        }
    }

    static getDerivedStateFromProps( props,state ) {
        return{
            data        : props.list,
            total       : props.total,
            limit       : props.limit,
            current     : props.current,
            totalPages  : props.totalPages
        }
    }

    render(){

        const { location } = this.props;
        const { search }   = location;
        const { loading, data, total, current, limit, totalPages } = this.state;

        return(
            <React.Fragment>
                <Helmet encodeSpecialCharacters={false}>
                    <title>{`網紅電商,網紅店舖列表 - `}</title>
                    <meta name="keywords" content={`網紅電商,網紅獵人,找網紅就是快,幫你賣,電商,網購}`} />
                    <meta name="description" content={``} />
                </Helmet>
                <div className="row">
                    <section className="container main-content">
                        <section className="container-col" data-flexdirection="column" >
                            <Breadcrumbs />
                            <BlockList className="store-card">
                                {
                                    data.map( item => {
                                        return(
                                            <li key={item['id']}>
                                                <Item path={`/store/${item['id']}`} data={item}/>
                                            </li>
                                        )
                                    })
                                }
                            </BlockList>
                            <Pagination
                                query    = {{...queryString.parse(search)}}
                                current  = {current}
                                limit    = {limit}
                                total    = {total}
                                location = {location}
                            />
                            <Loading loading={loading}/>
                        </section>
                    </section>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.callAPIFunction();
    }

    componentDidUpdate(prevProps, prevState) {
        const prevLocation  = prevProps.location;
        const { location }  = this.props;
        if( location['search']!=prevLocation['search'] ){
            this.callAPIFunction();
        }
    }

    callAPIFunction = () => {
        const { location }         = this.props;
        const { pathname, search } = location;
        this.setState({
            loading: true
        },() => {
            this.props.dispatch( storeList(pathname, {...queryString.parse(search)}) ).then( res => {
                this.setState({
                    loading: false
                },()=>{
                    switch( res['status'] ){
                        case 200:
                            break;
                    }
                })
            });
        });
    }
}

const mapStateToProps = state => {
    return{
        list        : state.store.list,
        total       : state.store.total,
        limit       : state.store.limit,
        current     : state.store.current,
        totalPages  : state.store.totalPages
    }
}

export default connect( mapStateToProps )( Index );