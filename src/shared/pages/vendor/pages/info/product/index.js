import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

//Compoents
import Table from '../../../../../module/table';
import Cover from './cover';
import Basic from './basic';
import Freight from './freight';
import Depiction from './depiction';
import Format from './format';

// Actions
import { infoProduct } from '../../../../../actions/vendor';
import { deliveries, categories } from '../../../../../actions/common';

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

        const { tableHeadKey, status, data, deliveries, categories } = this.state;
        // deliveries 運送方式
        // categories 類別

        return(
            <React.Fragment>
                {
                    Object.keys(data).length!=0 &&
                        <React.Fragment>
                            <Cover 
                                status= {status}
                                data={data['img']}
                            />
                            <Basic 
                                status= {status}
                                categories= {categories}
                                data={{
                                    ...data['info'], 
                                    categories:data['category']
                                }}
                            />
                            <Format
                                status= {status}
                                data={data['spec']}
                            />
                            <Freight 
                                status= {status}
                                data={data['delivery']}
                                deliveries={deliveries} 
                            />
                            <Depiction 
                                status= {status}
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
                status: res['data']['info']['status'],
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
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Product );