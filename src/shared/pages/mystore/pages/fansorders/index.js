import React from 'react';
import dayjs from 'dayjs';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Components
import Tools from './components/tool';
import InfoBox from './components/infoBox';

// Modules
import Table from '../../../../module/table';
import Loading from '../../../../module/loading/mallLoading';

// Actions
import { mystoreSalesList } from '../../../../actions/mystore';

// Setup
import tableHeadData from '../../public/setup/tableHeadData';

class Index extends React.Component{

    constructor( props ){
        super(props);
        this.state = {
            loading: false,
            feeAmount: 0,
            saleAmount: 0,
            endTimeMs: dayjs().format('YYYY/MM/DD'),
            startTimeMs: dayjs().format('YYYY/MM/DD'),
            tableHeadData: tableHeadData['fansorders'],
            tableBodyData: []
        }
    }

    render(){

        const { loading, feeAmount, saleAmount, endTimeMs, startTimeMs, tableHeadData, tableBodyData } = this.state;
        const { location, history, match } = this.props;
        const ordersList = tableBodyData.map( item => {
            return{
                ...item,
                percent: `${(item['productFee']/item['totalPrice'])*100}％`
            }
        })

        return(
            <React.Fragment>
                <Tools 
                    location={location} 
                    history={history} 
                    match={match}
                />
                <section className="container-unit">
                    <ul className="table-row-list">
                        <li>
                            <label>查詢的時間</label>
                            <div>{startTimeMs} ~ {endTimeMs}</div>
                        </li>
                    </ul>
                </section>
                <InfoBox 
                    feeAmount= {feeAmount}
                    saleAmount= {saleAmount}
                />
                <section className="container-unit">
                    <Table 
                        tableHeadData= {tableHeadData}
                        tableBodyData= {ordersList}
                    />
                    <Loading loading={loading} />
                </section>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.callAPI();
    }

    componentDidUpdate(prevProps, prevState) {
        const searchObject = queryString.parse(this.props.location.search);
        const prevPropsSearchObject = queryString.parse(prevProps.location.search);
        let request = false;

        if( Object.keys( searchObject ).length>Object.keys( prevPropsSearchObject ).length ){
            request = Object.keys( searchObject ).some( keys => searchObject[keys]!=prevPropsSearchObject[keys] );
        }else{
            request = Object.keys( prevPropsSearchObject ).some( keys => prevPropsSearchObject[keys]!=searchObject[keys] );
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
                this.props.dispatch( mystoreSalesList( pathname,{...queryString.parse(search)} ) ).then( res => {
                    this.setState({
                        loading: false
                    },()=>{
                        switch( res['status'] ){
                            case 200:
                                this.setState({
                                    feeAmount     : res['data']['sales']['feeAmount'],
                                    saleAmount    : res['data']['sales']['saleAmount'],
                                    endTimeMs     : dayjs(res['data']['sales']['endTimeMs']).format('YYYY/MM/DD'),
                                    startTimeMs   : dayjs(res['data']['sales']['startTimeMs']).format('YYYY/MM/DD'),
                                    tableBodyData : res['data']['sales']['list']
                                })
                                break;

                            default:
                                break;
                        }
                    })
                });
            })
        }
    }
}

const mapStateToprops = state => {
    return{

    }
}
export default connect( mapStateToprops )( Index );