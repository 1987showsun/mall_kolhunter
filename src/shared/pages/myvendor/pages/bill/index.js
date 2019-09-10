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

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            tableHeadData: tableHeadData,
            tableBodyData: []
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            tableBodyData: props.list
        }
    }

    render(){

        const { loading, tableHeadData,tableBodyData } = this.state;
        const { match, location } = this.props;

        return(
            <React.Fragment>
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
                    total= {10}
                    match= {match}
                    location= {location}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
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
        list: state.myvendor.billList
    }
}

export default connect( mapStateToProps )( Index );