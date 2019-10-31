import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Components
import Head from './head';

// Modules
import Table from '../../../../../../module/table';
import Pagination from '../../../../../../module/pagination';
import Loading from '../../../../../../module/loading';

// Actions
import { orderList } from '../../../../../../actions/myvendor';

// Set
import tableHeadData from '../../public/set/tableHeadData';

// Lang
import lang from '../../../../../../public/lang/lang.json';

class Order extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            tableHeadKey : tableHeadData,
            tableBodyData: props.list
        }
    }

    static getDerivedStateFromProps ( props,state ){
        return{
            total: props.total,
            totalAmount: props.totalAmount,
            tableBodyData: props.list
        }
    }

    render(){

        const { loading, total, totalAmount, tableHeadKey, tableBodyData } = this.state;
        const { match, history, location } = this.props;

        return(
            <React.Fragment>
                <section className="page-title">
                    <h3>{ lang['zh-TW']['Order management'] }</h3>
                </section>
                <Head 
                    match= {match}
                    history= {history}
                    location= {location}
                    total= {total}
                    totalAmount= {totalAmount}

                />
                <section className="admin-content-row">
                    <Table 
                        tableHeadData={tableHeadKey}
                        tableBodyData={tableBodyData}
                    />
                    <Loading 
                        loading= {loading}
                    />
                </section>
                <Pagination 
                    total= {total}
                    match= {match}
                    location= {location}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.callAPI();
    }

    componentDidUpdate(prevProps, prevState) {
        const search = queryString.parse(this.props.location.search);
        const prevSearch = queryString.parse(prevProps.location.search);
        let checkQueryIsDifferent = false;
        if( Object.keys(search).length>Object.keys(prevSearch).length ){
            checkQueryIsDifferent = Object.keys(search).some( keys => {
                return search[keys]!=prevSearch[keys];
            })
        }else{
            checkQueryIsDifferent = Object.keys(prevSearch).some( keys => {
                return prevSearch[keys]!=search[keys];
            })
        }
        
        if( checkQueryIsDifferent ){
            this.callAPI();
        }
    }
    
    callAPI = () => {
        const { location, match } = this.props;
        const { pathname, search } = location;
        this.setState({
            loading: true,
        },()=> {
            this.props.dispatch( orderList(pathname,{...queryString.parse(search)}) ).then( res => {
                this.setState({
                    loading: false,
                },()=>{
                    switch( res['status'] ){
                        case 200:
                            break;

                        default:
                            break;
                    }
                });
            });
        })
    }
}

const mapStateToProps = (state) => {
    return{
        total: state.myvendor.orderStatus['total'],
        totalAmount: state.myvendor.orderStatus['totalAmount'],
        list: state.myvendor.orderList
    }
}

export default connect(mapStateToProps)(Order);