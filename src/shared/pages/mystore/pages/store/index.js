import React from 'react';
import toaster from 'toasted-notes';
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

// Set
import tableHeadData from '../../public/setup/tableHeadData';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            storeInfo: props.storeInfo,
            total: props.total,
            limit: props.limit,
            current: props.current,
            tableHeadData: tableHeadData['store'],
            tableBodyData: props.productList
        }
    }

    static getDerivedStateFromProps( props,state ){
        return {
            storeInfo: props.storeInfo,
            total: props.total,
            limit: props.limit,
            current: props.current,
            tableBodyData: props.productList
        }
    }

    render(){

        const { 
            loading,
            storeInfo,
            total,
            limit,
            current,
            tableHeadData, 
            tableBodyData
        } = this.state;
        const { location } = this.props;
        const query = queryString.parse(location['search']);
        const pathname = location['pathname'].split('/').filter( filterItem => filterItem!='' );
        const productList = tableBodyData.map( item => {
            return{
                status: [<button key={`status-on_`} className="status-on" onClick={this.tableButtonAction.bind(this,item)}>販賣中</button>],
                image: item['image'],
                name: item['name'],
                price: item['price'],
                sellPrice: item['sellPrice']
            }
        })

        return(
            <React.Fragment>
                <section className="container-unit none-padding">
                    <Cover 
                        className= "mystore"
                        data= {storeInfo}
                        productTotal= {total}
                        actionSwitchDisplay= {false}
                        editFormDisplay={ pathname[0]=='mystore' }
                    />
                </section>
                <section className="container-unit relative">
                    <Table 
                        tableHeadData= {tableHeadData}
                        tableBodyData= {productList}
                    />
                    <Loading 
                        loading= {loading}
                    />
                </section>
                <Pagination
                    query= {query}
                    current= {current}
                    limit= {limit}
                    total= {total}
                    location= {location}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { location, match } = this.props;
        const { pathname, search } = location;
        this.props.dispatch( mystoreStoreInfo(pathname, {...queryString.parse(), store: match['params']['id']}) );
        this.reCallAPI();
    }

    componentDidUpdate(prevProps, prevState) {
        const searchObject = queryString.parse(this.props.location.search);
        const prevSearchObject = queryString.parse(prevProps.location.search);
        let reloadStatus = false;
        
        if( Object.keys(searchObject).length>Object.keys(prevSearchObject).length ){
            reloadStatus =  Object.keys(searchObject).some( keys => {
                return searchObject[keys]!=prevSearchObject[keys];
            });
        }else{
            reloadStatus = Object.keys(prevSearchObject).some( keys => {
                return prevSearchObject[keys]!=searchObject[keys];
            });
        }

        if( reloadStatus ){
            this.reCallAPI();
        }
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
                        this.reCallAPI();
                        toaster.notify(
                            <div className={`toaster-status success`}>下架成功</div>
                        ,{
                            position: 'bottom-right',
                            duration: 3000
                        })
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
            this.props.dispatch( mystoreStoreProductList( pathname,{...queryString.parse(search)} ) ).then( res => {
                this.setState({
                    loading: false
                })
            });
        })
    }
}

const mapStateToProps = state => {
    return{
        storeInfo: state.mystore.info,
        total: state.mystore.total,
        limit: state.mystore.limit,
        current: state.mystore.current,
        productList: state.mystore.list
    }
}

export default connect( mapStateToProps )( Index );