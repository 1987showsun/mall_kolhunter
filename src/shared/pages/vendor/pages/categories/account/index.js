import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import Head from './head';
import Table from '../../../../../module/table';
import Pagination from '../../../../../module/pagination';

// Actions
import { incListAccount } from '../../../../../actions/vendor';

class Account extends React.Component{

    constructor(props){
        super(props);
        this.state = {
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
                    key: 'transport',
                    type: 'text',
                    title: '運送方式'
                },
                {
                    key: 'status',
                    type: 'text',
                    title: '訂單狀態'
                },
                {
                    key: 'createdate',
                    type: 'text',
                    title: '訂購時間'
                },
                {
                    key: 'total',
                    type: 'number',
                    title: '總額'
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

        const { tableHeadKey,tableBodyData } = this.state;
        const { match, location } = this.props;

        return(
            <React.Fragment>
                <div className="tab-wrap">
                    <ul>
                        <li className="active"><Link to="">進行中的訂單</Link></li>
                        <li><Link to="">以結款的訂單</Link></li>
                    </ul>
                </div>
                <Head />
                <Table 
                    tableHeadData={tableHeadKey}
                    tableBodyData={tableBodyData}
                />
                <Pagination 
                    total= {10}
                    match= {match}
                    location= {location}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.props.dispatch( incListAccount() );
    }
}

const mapStateToProps = (state) => {
    return{
        list: state.vendor.list
    }
}

export default connect(mapStateToProps)(Account);