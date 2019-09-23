import React from 'react';
import { connect } from 'react-redux';

// Modules
import Table from '../../../../../../../module/table';
import Loading from '../../../../../../../module/loading';

// Lang
import lang from '../../../../../../../public/lang/lang.json';

class Products extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            data: props.data,
            tableHeadKey : [
                {
                    key: 'id',
                    type: 'text',
                    title: '商品編號'
                },
                {
                    key: 'name',
                    type: 'text',
                    title: '商品名稱',
                    className: 'table-min-width'
                },
                {
                    key: 'quantity',
                    type: 'number',
                    title: '數量'
                },
                {
                    key: 'spec',
                    type: 'text',
                    title: '顏色 / 尺寸'
                },
                {
                    key: 'deliveryStatus',
                    type: 'text',
                    title: '運送狀態'
                },
                {
                    key: 'refundStatus',
                    type: 'text',
                    title: '退換貨'
                },
                {
                    key: 'total',
                    type: 'number',
                    title: '總額'
                }
            ]
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            loading: props.loading,
            data: props.data
        }
    }

    render(){

        const { info } = this.props;
        const { loading, tableHeadKey, data } = this.state;

        return(
            <section className="admin-content-row">
                <article className="admin-content-title">
                    <h4>商品清單</h4>
                </article>
                {
                    info['orderDetail']!=undefined &&
                        <Table 
                            tableHeadData={tableHeadKey}
                            tableBodyData={data}
                        />
                }
                <Loading loading={loading} />
            </section>
        );
    }

    handleChange = (e) => {

    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Products );