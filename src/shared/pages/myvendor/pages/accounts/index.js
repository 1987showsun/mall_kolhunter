import React from 'react';
import dayjs from 'dayjs';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import Head from './head';

// Modules
import Table from '../../../../module/table';
import Loading from '../../../../module/loading';
import Pagination from '../../../../module/pagination';

// Actions
import { incListAccount } from '../../../../actions/myvendor';

// Lang
import lang from '../../../../public/lang/lang.json';

class Account extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            tableHeadKey : [
                {
                    key: 'id',
                    type: 'text',
                    title: '訂單編號',
                    path: '/inc/info/order'
                },
                {
                    key: 'orderer',
                    type: 'text',
                    title: '訂購人'
                },
                {
                    key: 'quantity',
                    type: 'number',
                    title: '購買數量'
                },
                {
                    key: 'orderStatus',
                    type: 'text',
                    title: '訂單狀態'
                },
                {
                    key: 'total',
                    type: 'number',
                    title: '總額'
                },
                {
                    key: 'date',
                    type: 'text',
                    title: '訂購時間'
                }
            ],
            tableBodyData: []
        }
    }

    static getDerivedStateFromProps ( props,state ){
        return{
            tableBodyData: props.list
        }
    }

    render(){

        const { loading, tableHeadKey,tableBodyData } = this.state;
        const { match, history, location } = this.props;
        const { pathname, search } = location;
        const period = queryString.parse(search)['period'] || "1";

        return(
            <React.Fragment>
                <section className="page-title">
                    <h3>{ lang['zh-TW']['account details'] }</h3>
                </section>
                <Head 
                    match= {match}
                    history= {history}
                    location= {location}
                />
                <section className="admin-content-row">
                    <Table 
                        tableHeadData={tableHeadKey}
                        tableBodyData={tableBodyData}
                    />
                    <Loading loading={loading} />
                </section>
                {/* <Pagination 
                    total= {10}
                    match= {match}
                    location= {location}
                /> */}
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.callAPI();
    }

    componentDidUpdate(prevProps, prevState) {
        const search = queryString.parse(this.props.location.search);
        const prevPropsSearch = queryString.parse(prevProps.location.search);
        let request = false;
        
        // 比對 search 有沒有變動
        if( Object.keys(search).length>Object.keys(prevPropsSearch).length ){
            request = Object.keys(search).some( keys => search[keys]!=prevPropsSearch[keys] );
        }else{
            request = Object.keys(prevPropsSearch).some( keys => prevPropsSearch[keys]!=search[keys] );
        }
        if( request ){
            this.callAPI();
        }
    }
    
    callAPI = () => {
        const { location } = this.props;
        const { pathname, search } = location;
        const query = queryString.parse(search);
        const YYYY  = dayjs().format('YYYY');
        const MM    = dayjs().format('DD')<=15? dayjs().format('MM')-1: dayjs().format('MM');

        if( query['year']==undefined || query['month']==undefined || Number(query['month'])<=MM && Number(query['year'])<=YYYY ){
            this.setState({
                loading: true
            },()=>{
                this.props.dispatch( incListAccount( pathname,{...queryString.parse(search)} ) ).then(res => {
                    this.setState({
                        loading: false
                    })
                });
            })
        }
    }
}

const mapStateToProps = (state) => {
    return{
        list: state.myvendor.accountsList
    }
}

export default connect(mapStateToProps)(Account);