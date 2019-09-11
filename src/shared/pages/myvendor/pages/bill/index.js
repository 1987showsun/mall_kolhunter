import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Components
import Head from './head';

// Modules
import Table from '../../../../module/table';
import Pagination from '../../../../module/pagination';
import Loading from '../../../../module/loading';

// Actions
import { buyCaseBillList } from '../../../../actions/myvendor';

// Set
import tableHeadData from './public/set/tableHeadData';

// Lang
import lang from '../../../../public/lang/lang.json';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            page: props.page,
            pages: props.pages,
            total: props.total,
            tableHeadData: tableHeadData,
            tableBodyData: props.list
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            page: props.page,
            pages: props.pages,
            total: props.total,
            tableBodyData: props.list
        }
    }

    render(){

        const { page, total, loading, tableHeadData,tableBodyData } = this.state;
        const { match, location } = this.props;

        return(
            <React.Fragment>
                <section className="page-title">
                    <h3>{ lang['zh-TW']['Bill management'] }</h3>
                </section>
                <Head 
                    total= {total}
                />
                <section className="admin-content-row">
                    <Table 
                        tableHeadData={tableHeadData}
                        tableBodyData={tableBodyData}
                    />
                    <Loading 
                        loading = {loading}
                    />
                </section>
                <Pagination 
                    total= {total}
                    limit= {20}
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
        const searchObject = queryString.parse(this.props.location.search);
        const prevSearchObject = queryString.parse(prevProps.location.search);
        let reloadStatus = false;
        
        if( Object.keys(searchObject).length>Object.keys(prevSearchObject).length ){
            reloadStatus =  Object.keys(searchObject).some( keys => {
                return searchObject[keys]!=prevSearchObject[keys];
            });
        }else{
            reloadStatus = Object.keys(prevSearchObject).some( keys => {
                return prevSearchObject[keys]!=searchObject[keys];
            });
        }

        if( reloadStatus ){
            this.callAPI();
        }
    }
    
    callAPI = () => {
        const { location, match } = this.props;
        const { pathname, search } = location;
        this.setState({
            loading: true,
        },()=> {
            this.props.dispatch( buyCaseBillList(pathname, queryString.parse(search)) ).then( res => {
                this.setState({
                    loading: false
                })
            });
        })
    }
}

const mapStateToProps = state => {
    return{
        page: state.myvendor.billStatus.page,
        pages: state.myvendor.billStatus.pages,
        total: state.myvendor.billStatus.total,
        list: state.myvendor.billList
    }
}

export default connect( mapStateToProps )( Index );