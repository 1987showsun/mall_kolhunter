import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Components
import Cover from '../../../../components/store/cover';

// Modules
import Table from '../../../../module/table';
import Loading from '../../../../module/loading/mallLoading';
import Pagination from '../../../../module/pagination';

// Actions
import { mystoreStoreInfo, mystoreStoreProductList, mystoreStoreProductRemove } from '../../../../actions/mystore';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            accountInfo: props.accountInfo,
            total: props.total,
            limit: props.limit,
            current: props.current,
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
            ],
            tableBodyData: props.list
        }
    }

    static getDerivedStateFromProps( props,state ){
        return {
            accountInfo: props.accountInfo,
            total: props.total,
            limit: props.limit,
            current: props.current,
            tableBodyData: props.list
        }
    }

    render(){

        const { 
            loading,
            accountInfo,
            total,
            limit,
            current,
            tableHeadData, 
            tableBodyData
        } = this.state;
        const { location } = this.props;
        const query = queryString.parse(location['search']);
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
                <section className="container-unit relative">
                    <Table 
                        tableHeadData= {tableHeadData}
                        tableBodyData= {tableBodyData}
                        tableButtonAction= {this.tableButtonAction.bind(this)}
                    />
                    <Pagination
                        query= {query}
                        current= {current}
                        limit= {limit}
                        total= {total}
                        location= {location}
                    />
                    <Loading 
                        loading= {loading}
                    />
                </section>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.props.dispatch( mystoreStoreInfo() );
        this.reCallAPI();
    }

    tableButtonAction = ( val ) => {
        const { location } = this.props;
        const { pathname, search } = location;
        const data = { productID: val['id'] };
        this.setState({
            loading: true
        },()=>{
            this.props.dispatch( mystoreStoreProductRemove(pathname, queryString.parse(search), data) ).then( res => {
                switch( res['status'] ){
                    case 200:
                        console.log('成功');
                        this.reCallAPI();
                        break;

                    default:
                        break;
                }
            });
        })
    }

    reCallAPI = () => {
        const { location } = this.props;
        const { pathname, search } = location;
        this.setState({
            loading: true
        },()=>{
            this.props.dispatch( mystoreStoreProductList( pathname, queryString.parse(search) ) ).then( res => {
                this.setState({
                    loading: false
                })
            });
        })
    }
}

const mapStateToProps = state => {
    return{
        accountInfo: state.myaccount.info,
        total: state.mystore.total,
        limit: state.mystore.limit,
        current: state.mystore.current,
        list: state.mystore.list
    }
}

export default connect( mapStateToProps )( Index );