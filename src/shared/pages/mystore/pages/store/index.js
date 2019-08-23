import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Components
import Cover from '../../../../components/store/cover';

// Modules
import Table from '../../../../module/table';

// Actions
import { mystoreStoreProduct, mystoreStoreProductRemove } from '../../../../actions/mystore';

const demoData = [
    {
        id: "62c08bab8215b25e9d90",
        status: "on",
        image: "https://static.kolhunter.com/vendor/product/2019/08/01/62c08bab8215b25e9d90/1e970396a108ec33501d3bf4d853539f.png",
        name: "test",
        store: 10,
        price: 123123,
        sellPrice: 123123,
        profit: 14
    },
    {
        id: "5dba306c43d2bbd55024",
        status: "on",
        image: "https://static.kolhunter.com/vendor/product/2019/07/31/5dba306c43d2bbd55024/582c047b1a0f878e225e9b109d990fc2.png",
        name: "test",
        store: 10,
        price: 123,
        sellPrice: 123123,
        profit: 14
    },
    {
        id: "47a10f5fed64d49fd5db",
        status: "on",
        image: "https://static.kolhunter.com/vendor/product/2019/08/01/47a10f5fed64d49fd5db/8b02601955efaa8a9a54d147df9fd193.png",
        name: "test",
        store: 10,
        price: 123,
        sellPrice: 123,
        profit: 14
    },
    {
        id: "75f0a44df069df7907fb",
        status: "on",
        image: "https://static.kolhunter.com/vendor/product/2019/08/01/75f0a44df069df7907fb/1e69475e68faf2164ecc478666ed918f.png",
        name: "test",
        store: 10,
        price: 123,
        sellPrice: 123,
        profit: 14
    },
    {
        id: "1c500c3e6edd33d4ff59",
        status: "on",
        image: "https://static.kolhunter.com/vendor/product/2019/08/01/1c500c3e6edd33d4ff59/b1243ebc56994d0b7d2a458f19c6dc83.png",
        name: "test",
        store: 10,
        price: 123,
        sellPrice: 123,
        profit: 14
    },
    {
        id: "0f95de6062898487ad89",
        status: "on",
        image: "https://static.kolhunter.com/vendor/product/2019/07/31/0f95de6062898487ad89/3907a6bb44709f7006d127e786dcc391.png",
        name: "test",
        store: 10,
        price: 123,
        sellPrice: 123,
        profit: 14
    }
]

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            accountInfo: props.accountInfo,
            tableHeadData: [
                {
                    key: 'status',
                    type: 'button',
                    title: '狀態（點擊移出販售）',
                    text: {
                        "off": '未販賣',
                        "on": '販賣中'
                    },
                    className: "status-width"
                },
                {
                    key: 'image',
                    type: 'img',
                    title: '圖片',
                    className: 'img-width'
                },
                {
                    key: 'name',
                    type: 'link',
                    title: '名稱',
                    className: 'table-min-width',
                    path: '/myvendor/info/product'
                },
                {
                    key: 'store',
                    type: 'number',
                    title: '店家數'
                },
                {
                    key: 'price',
                    type: 'number',
                    title: '售價'
                },
                {
                    key: 'sellPrice',
                    type: 'number',
                    title: '特價'
                },
                {
                    key: "profit",
                    type: "number",
                    title: "分潤比"
                }
            ]
        }
    }

    static getDerivedStateFromProps( props,state ){
        return {
            accountInfo: props.accountInfo
        }
    }

    render(){

        const { accountInfo, tableHeadData } = this.state;
        const { location } = this.props;
        const pathname = location['pathname'].split('/').filter( filterItem => filterItem!='' );

        return(
            <React.Fragment>
                <section className="container-unit none-padding">
                    <Cover 
                        className= "mystore"
                        data= {accountInfo}
                        actionSwitchDisplay= {false}
                        editFormDisplay={ pathname[0]=='mystore' }
                    />
                </section>
                <section className="container-unit">
                    <Table 
                        tableHeadData= {tableHeadData}
                        tableBodyData= {demoData}
                        tableButtonAction= {this.tableButtonAction.bind(this)}
                    />
                </section>
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { location } = this.props;
        const { pathname, search } = location;
        this.props.dispatch( mystoreStoreProduct( pathname, queryString.parse(search) ) );
    }

    tableButtonAction = ( val ) => {
        console.log( val );
        const { location } = this.props;
        const { pathname, search } = location;
        const productID = val['id'];
        console.log( productID );
        //this.props.dispatch( mystoreStoreProductRemove(pathname, search,) );
    }
}

const mapStateToProps = state => {
    return{
        accountInfo: state.account.info
    }
}

export default connect( mapStateToProps )( Index );