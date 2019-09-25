import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Compoents
import Cover from './cover';
import Basic from './basic';
import Freight from './freight';
import Depiction from './depiction';
import Format from './format';

// Module
import Confirm from '../../../../../../module/confirm';
import Table from '../../../../../../module/table';

// Actions
import { infoProduct, deleteProduct, quota } from '../../../../../../actions/myvendor';
import { deliveries, categories } from '../../../../../../actions/common';

// Lang
import lang from '../../../../../../public/lang/lang.json';

// Demo
const demoData = [
    {
        id: "123qwdmkmdcmqwlefc",
        ranking: 1,
        name: "蔡阿嘎",
        sales: 1234,
        total_sales: 102231,
        profit: 10223
    },
    {
        id: "asdkplk123123-0-10294-",
        ranking: 2,
        name: "陳癡漢",
        sales: 1234,
        total_sales: 102231,
        profit: 10223
    },
    {
        id: "sdcpqw30402123123343234",
        ranking: 3,
        name: "Nico品筠&Kim京燁 【那對夫妻】",
        sales: 1234,
        total_sales: 102231,
        profit: 10223
    }
]

class Product extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            open: false,
            popupMsg: "",
            deliveries: [],
            categories: [],
            tableHeadKey : [
                {
                    key: 'ranking',
                    type: 'ranking',
                    title: '排名',
                    className: 'ranking'
                },
                {
                    key: 'name',
                    type: 'text',
                    title: '網紅名稱',
                    className: 'table-min-width'
                },
                {
                    key: 'sales',
                    type: 'number',
                    title: '銷售數量',
                    className: 'number'
                },
                {
                    key: 'total_sales',
                    type: 'number',
                    title: '銷售總額',
                    className: 'number'
                },
                {
                    key: 'profit',
                    type: 'number',
                    title: '分得利潤',
                    className: 'number'
                }
            ],
            status: '',
            data: {}
        }
    }

    render(){

        const { 
            open,
            popupMsg,
            tableHeadKey, 
            status, 
            data, 
            deliveries, 
            categories 
        } = this.state;
        // deliveries 運送方式
        // categories 類別

        return(
            <React.Fragment>
                <section className="page-title">
                    <h3>{ lang['zh-TW']['Product details'] }</h3>
                </section>
                {
                    Object.keys(data).length!=0 &&
                        <React.Fragment>
                            <Cover 
                                status= {status}
                                id={data['id']}
                                data={data['img']}
                            />
                            <Basic 
                                status= {status}
                                categories= {categories}
                                data={{
                                    ...data, 
                                    categories:data['category']
                                }}
                            />
                            <Format
                                status= {status}
                                id={data['id']}
                                data={data['spec']}
                            />
                            <Freight
                                status= {status}
                                id={data['id']}
                                data={data['delivery']}
                                deliveries={deliveries} 
                            />
                            <Depiction 
                                status= {status}
                                id={data['id']}
                                data={data['description']}
                            />
                        </React.Fragment>
                }
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>店家排行</h4>
                    </article>
                    <Table 
                        tableHeadData={tableHeadKey}
                        tableBodyData={demoData}
                    />
                </section>

                <div className="admin-content-row action" data-content="rigth" >
                    {
                        Object.keys(data).length!=0 &&
                            <button 
                                className="remove" 
                                onClick={()=>
                                    this.setState({
                                        open: true,
                                        popupMsg: lang['zh-TW']['Are you sure you want to delete this particular product']
                                    })
                                }
                            >
                                    刪除
                                    <span className="p_name">{data['name']}</span>
                                    商品
                            </button>
                    }
                </div>

                <Confirm 
                    open={open}
                    container={popupMsg}
                    onCancel={this.handleCancel.bind(this)}
                    onConfirm={this.handleConfirm.bind(this)}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { match, location } = this.props;
        const serach = queryString.parse( location['search'] );
        const p_id = match['params']['id'];
        const query = queryString.stringify({ ...serach, id: p_id });
        this.props.dispatch( infoProduct(query) ).then(res => {
            this.setState({
                status: res['data']['status'],
                data: res['data']
            })
        });
        this.props.dispatch( deliveries() ).then( res => {
            this.setState({
                deliveries: res['data']
            })
        });
        this.props.dispatch( categories() ).then( res => {
            this.setState({
                categories: res['data']
            })
        });
    }

    handleCancel = () => {
        this.setState({
            open: false,
            popupMsg: ""
        })
    }

    handleConfirm = () => {
        const { match, profile } = this.props;
        const { status } = this.state;
        const id = match['params']['id'];
        this.props.dispatch( deleteProduct(id) ).then( res => {
            if( res['data']['message']=="success" ){
                this.setState({
                    open: false,
                    popupMsg: ""
                },()=>{
                    if( status=='none-auth' ){
                        this.props.dispatch( quota('sum',profile) );
                    }
                    this.props.history.goBack();
                });
            }
        });
    }
}

const mapStateToProps = state => {
    return{
        profile: state.myvendor.info
    }
}

export default connect( mapStateToProps )( Product );