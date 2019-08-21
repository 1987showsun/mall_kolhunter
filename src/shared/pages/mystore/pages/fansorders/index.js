import React from 'react';

// Modules
import Table from '../../../../module/table';

export default class Index extends React.Component{

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
}