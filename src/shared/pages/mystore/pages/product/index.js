import React from 'react';
import toaster from 'toasted-notes';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Components
import Tab from './tab';
import Search from './search';

// Modules
import Table from '../../../../module/table';
import Loading from '../../../../module/loading/mallLoading';
import Pagination from '../../../../module/pagination';

// Actions
import { mystoreProductList, mystoreStoreProductAdd } from '../../../../actions/mystore';

// Stylesheets
import './public/stylesheets/style.scss';

// Set
import tableHeadData from './public/set/tableHead';

class Index extends React.Component{

    constructor( props ){
        super(props);
        this.state = {
            loading: false,
            total: props.total,
            limit: props.limit,
            current: props.current,
            tableHeadData: tableHeadData,
            tableBodyData: props.list
        }
    }

    static getDerivedStateFromProps( props, state) {
        return{
            total: props.total,
            limit: props.limit,
            current: props.current,
            tableBodyData: props.list
        }
    }

    render(){

        const { 
            loading,
            total,
            limit,
            current,
            tableHeadData, 
            tableBodyData 
        } = this.state;
        const { location, match, history } = this.props;
        const query = queryString.parse(location['search']);

        return(
            <React.Fragment>
                <Tab 
                    match= {match}
                    history= {history}
                    location= {location}
                    reCallAPI= {this.reCallAPI.bind(this)}
                />
                <section className="container-unit relative" >
                    <Search 
                        match= {match}
                        history= {history}
                        location= {location}
                    />
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
        this.reCallAPI();
    }

    tableButtonAction = ( val ) => {
        const { location, match } = this.props;
        const { pathname, search } = location;
        const data = { productID: val['id'] };
        this.setState({
            loading: true,
        },()=>{
            this.props.dispatch( mystoreStoreProductAdd( pathname, queryString.parse(search), data ) ).then( res => {
                switch( res['status'] ){
                    case 200:
                        this.reCallAPI();
                        toaster.notify(
                            <div className={`toaster-status success`}>更新成功</div>
                        ,{
                            position: 'bottom-right',
                            duration: null
                        })
                        break;

                    default:
                        break;
                }
            });
        });
    }

    reCallAPI = () => {

        const { pathname, search } = location;

        this.setState({
            loading: true,
        },()=>{
            this.props.dispatch( mystoreProductList(pathname,queryString.parse(search)) ).then( res => {
                this.setState({
                    loading: false,
                });
            });
        })
    }
}

const mapStateToprops = state => {
    return{
        total: state.mystore.total,
        limit: state.mystore.limit,
        current: state.mystore.current,
        list: state.mystore.list
    }
}

export default connect( mapStateToprops )( Index );