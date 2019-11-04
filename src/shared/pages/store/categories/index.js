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
                    <title>{`網紅電商 KOL Mall | 你的商品網紅幫你賣 - 網紅店舖列表`}</title>
                    <meta name="keywords" content={`網紅電商,網紅獵人,找網紅就是快,幫你賣,電商,網購,網紅`} />
                    <meta name="description" content={`網紅電商結合時下熱門網紅幫你推銷商品，讓消費者可透過網紅電商用最划算的價格買到所有需要、想要的商品，包含美妝保健、流行服飾配件、母嬰居家、美食旅遊票券、3C家電影音等千萬件熱銷好物等你來選購`} />
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