import React from 'react';
import toaster from 'toasted-notes';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Components
import Cover from '../../../../components/store/cover';

// Modules
import Table from '../../../../module/table';
import Loading from '../../../../module/loading/mallLoading';
import Pagination from '../../../../module/pagination';

// Actions
import { mystoreStoreInfo, mystoreStoreProductList, mystoreStoreProductRemove } from '../../../../actions/mystore';

// Set
import tableHeadData from './public/set/tableHead';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            storeInfo: props.storeInfo,
            total: props.total,
            limit: props.limit,
            current: props.current,
            tableHeadData: tableHeadData,
            tableBodyData: props.list
        }
    }

    static getDerivedStateFromProps( props,state ){
        return {
            storeInfo: props.storeInfo,
            total: props.total,
            limit: props.limit,
            current: props.current,
            tableBodyData: props.list
        }
    }

    render(){

        const { 
            loading,
            storeInfo,
            total,
            limit,
            current,
            tableHeadData, 
            tableBodyData
        } = this.state;
        const { location } = this.props;
        const query = queryString.parse(location['search']);
        const pathname = location['pathname'].split('/').filter( filterItem => filterItem!='' );

        return(
            <React.Fragment>
                <section className="container-unit none-padding">
                    <Cover 
                        className= "mystore"
                        data= {storeInfo}
                        actionSwitchDisplay= {false}
                        editFormDisplay={ pathname[0]=='mystore' }
                    />
                </section>
                <section className="container-unit relative">
                    <Table 
                        tableHeadData= {tableHeadData}
                        tableBodyData= {tableBodyData}
                        tableButtonAction= {this.tableButtonAction.bind(this)}
                    />
                    <Pagination
                        query= {query}
                        current= {current}
                        limit= {limit}
                        total= {total}
                        location= {location}
                    />
                    <Loading 
                        loading= {loading}
                    />
                </section>
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { location, match } = this.props;
        const { pathname, search } = location;
        this.props.dispatch( mystoreStoreInfo(pathname, {...queryString.parse(), id: match['params']['id']}) );
        this.reCallAPI();
    }

    tableButtonAction = ( val ) => {
        const { location } = this.props;
        const { pathname, search } = location;
        const data = { productID: val['id'] };
        this.setState({
            loading: true
        },()=>{
            this.props.dispatch( mystoreStoreProductRemove(pathname, queryString.parse(search), data) ).then( res => {
                switch( res['status'] ){
                    case 200:
                        this.reCallAPI();
                        toaster.notify(
                            <div className={`toaster-status success`}>下架成功</div>
                        ,{
                            position: 'bottom-right',
                            duration: null
                        })
                        break;

                    default:
                        break;
                }
            });
        })
    }

    reCallAPI = () => {
        const { location } = this.props;
        const { pathname, search } = location;
        this.setState({
            loading: true
        },()=>{
            this.props.dispatch( mystoreStoreProductList( pathname, queryString.parse(search) ) ).then( res => {
                this.setState({
                    loading: false
                })
            });
        })
    }
}

const mapStateToProps = state => {
    return{
        storeInfo: state.mystore.info,
        total: state.mystore.total,
        limit: state.mystore.limit,
        current: state.mystore.current,
        list: state.mystore.list
    }
}

export default connect( mapStateToProps )( Index );