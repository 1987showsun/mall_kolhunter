import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Modules
import Table from '../../../../module/table';

// Actions
import { mystoreSalesList } from '../../../../actions/mystore';

class Index extends React.Component{

    constructor( props ){
        super(props);
        this.state = {
            tableHeadData: [
                {
                    key: 'id',
                    type: 'text',
                    title: '訂單編號'
                },
                {
                    key: 'name',
                    type: 'text',
                    title: '訂購人',
                    className: 'name'
                },
                {
                    key: 'itemNum',
                    type: 'number',
                    title: '購買數量'
                },
                {
                    key: 'status',
                    type: 'text',
                    title: '訂單狀態'
                },
                {
                    key: 'orderDate',
                    type: 'text',
                    title: '訂購時間'
                },
                {
                    key: 'total',
                    type: 'number',
                    title: '總額'
                }
            ]
        }
    }

    render(){

        const { tableHeadData } = this.state;

        return(
            <React.Fragment>
                <section className="container-unit">
                    <Table 
                        tableHeadData= {tableHeadData}
                        tableBodyData= {[]}
                    />
                </section>
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { location, match } = this.props;
        const { pathname, search } = location;
        this.props.dispatch( mystoreSalesList( pathname,{...queryString.parse(search)} ) );
    }
}

const mapStateToprops = state => {
    return{

    }
}
export default connect( mapStateToprops )( Index );