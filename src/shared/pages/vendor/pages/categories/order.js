import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import Head from './headAction/order';
import Table from '../../../../module/table';
import Pagination from '../../../../module/pagination';

// Actions
import { incListOrder } from '../../../../actions/vendor';

class Order extends React.Component{

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
                <Head />
                <Table 
                    tableHeadData={tableHeadKey}
                    tableBodyData={tableBodyData}
                />
                <Pagination 
                    method= "ddd"
                    total= {61}
                    match= {match}
                    location= {location}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.props.dispatch( incListOrder() );
    }
}

const mapStateToProps = (state) => {
    return{
        list: state.vendor.list
    }
}

export default connect(mapStateToProps)(Order);