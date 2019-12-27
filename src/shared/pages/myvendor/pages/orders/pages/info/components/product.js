/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';
import { connect } from 'react-redux';

// Components
import DeliveryUpdate from './deliveryUpdate';

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
            info: props.info,
            data: props.data,
            tableHeadKey : [
                {
                    key: 'name',
                    type: 'text',
                    title: '商品名稱',
                    className: 'table-min-width'
                },
                {
                    key: 'specName',
                    type: 'text',
                    title: '顏色 / 尺寸'
                },
                {
                    key: 'deliveryStatus',
                    type: 'button',
                    title: '運送狀態',
                    text: '變更狀態'
                },
                {
                    key: 'refundStatus',
                    type: 'text',
                    title: '退貨狀態'
                },
                {
                    key: 'refundAction',
                    type: 'text',
                    title: '退貨狀態變更'
                },
                {
                    key: 'total',
                    type: 'number',
                    title: '總額'
                }
            ],
            update: false,
            selectUpdateFormObject: {
                deliveryCode     : "",
                deliveryStatus   : "init"
            }
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            loading  : props.loading,
            info     : props.info,
            data     : props.data
        }
    }

    render(){

        const { info, location, match } = this.props;
        const { update, selectUpdateFormObject, loading, tableHeadKey, data } = this.state;

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>商品清單</h4>
                    </article>
                    {
                        info['orderDetail']!=undefined &&
                            <Table 
                                tableHeadData={tableHeadKey}
                                tableBodyData={data}
                                tableButtonAction= {this.tableButtonAction.bind(this)}
                            />
                    }
                    <Loading loading={loading} />
                </section>
                {
                    update &&
                        <DeliveryUpdate 
                            match= {match}
                            location= {location}
                            handleCancel= {()=>{ this.setState({ update: false }) }}
                            selectUpdateFormObject= {selectUpdateFormObject}
                            returnOpen= { (val=false)=> {
                                this.setState({ 
                                    update: val 
                                })
                            }} 
                        />
                }
            </React.Fragment>
        );
    }

    tableButtonAction = ( selectedItem ) => {
        if( selectedItem['t_method']=="deliveryStatus" ){
            const { selectUpdateFormObject, info, data } = this.state;
            this.setState({
                update: true,
                selectUpdateFormObject: {
                    ...selectUpdateFormObject,
                    orderID: info['orderID'],
                    productID: selectedItem['id'],
                    specID: selectedItem['specToken'],
                    specSku: selectedItem['specSku'],
                    deliveryCode: selectedItem['deliveryCode'],
                    deliveryStatus: selectedItem['deliveryStatus']
                }
            });
        }
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Products );