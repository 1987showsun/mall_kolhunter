import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

//Compoents
import Table from '../../../../../module/table';
import Basic from './basic';
import Freight from './freight';
import Depiction from './depiction';
import Format from './format';

// Actions
import { infoProduct } from '../../../../../actions/vendor';

const PDD = {
    "id": "",
    "name": "",
    "brand": "",
    "price": 0,
    "priceSale": 0,
    "status": 0,
    "categories": [
        {
            "id": "",
            "title": ""
        },
        {
            "id": "",
            "title": ""
        }
    ],
    "shippingMethods" : [
        {
            "method": "7-11 黑貓宅急便",
            "fee": 160
        },
        {
            "method": "全家 宅配通",
            "fee": 120
        }
    ],
    "variations": [
        {
            "name": "",
            "sku" : "",
            "quantity": 0,
            "sort": 0
        }
    ]
}


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
            data: {}
        }
    }

    render(){

        const { tableHeadKey, data } = this.state;

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <ul className="admin-product-img-ul">
                        {
                            data['img']!=undefined &&
                                data['img'].map( item => {
                                    return(
                                        <li key={item['imagePath']}>
                                            <img src={item['imagePath']} alt="" title="" />
                                        </li>
                                    )
                                })
                        }
                    </ul>
                </section>
                {
                    data['info']!=undefined &&
                        <Basic data={ data['info'] } />
                }
                {
                    data['spec']!=undefined &&
                        <Format data={ data['spec'] } />
                }
                {
                    data['delivery']!=undefined &&
                        <Freight data={ data['delivery'] } />
                }
                {
                    data['description']!=undefined &&
                        <Depiction data={ data['description'] } />
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
                data: res['data']
            })
        });
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Product );