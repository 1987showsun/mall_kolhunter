import React from 'react';

// Components
import Head from './head';

// Modules
import Table from '../../../../../module/table';
import Pagination from '../../../../../module/pagination';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            tableHeadKey : [
                {
                    key: 'id',
                    type: 'link',
                    title: '訂單編號',
                    path: '/myvendor/info/order'
                },
                {
                    key: 'orderer',
                    type: 'text',
                    title: '訂購人'
                },
                {
                    key: 'quantity',
                    type: 'number',
                    title: '購買方案數量'
                },
                {
                    key: 'transport',
                    type: 'text',
                    title: '付款方式'
                },
                {
                    key: 'status',
                    type: 'text',
                    title: '付款狀態'
                }
            ],
            tableBodyData: []
        }
    }

    render(){

        const { tableHeadKey,tableBodyData } = this.state;
        const { match, location } = this.props;

        return(
            <React.Fragment>
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
}