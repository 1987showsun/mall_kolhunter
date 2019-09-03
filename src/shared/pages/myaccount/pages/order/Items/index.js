import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus }from '@fortawesome/free-solid-svg-icons';

// Components
import Items from './items';
import Loading from '../../../../../module/loading/mallLoading';

// Actions
import { ordersList } from '../../../../../actions/myaccount';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            list: []
        }
    }

    render(){

        const { loading, list } = this.state;
        return(
            <React.Fragment>
                {
                    list.map( item => {
                        return <Items key={item['orderID']} {...item}/>
                    })
                }

                {/* 備註聲明 */}
                <ul className="remarks-ul">
                    <li>商品將於您付款成功後1~3個工作天左右送達；預購/特殊商品寄送請參考各商品網頁或店家說明為準。</li>
                    <li>查詢訂單詳情 (如商品明細/付款資料等)，請點選訂購日期後面的 (查看明細) 進行查詢。</li>
                    <li>建議您可先參考 維修 / 換貨 / 退貨 / 取消 相關辦法後，再點選維修/退貨/換貨/取消等服務。</li>
                    <li>若需要購買證明 (做為購買憑證/保固維修等)，待商品出貨後您可點選購買證明自行列印。</li>
                    <li>發票將在付款完成、出貨後開立，將會email通知您，更多詳情可參考「電子發票流程說明」。</li>
                    <li>三聯式發票將於廠商完成出貨後5個工作天平信寄出，約2-7個工作天內送達，如遇國定假日將順延寄送。</li>
                    <li>若有任何訂單問題請聯絡「客服中心」，我們將在當天儘速以mail回覆您。</li>
                </ul>
                <Loading 
                    loading= {loading}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.callAPI();
    }
    
    callAPI = () => {
        const { location, match } = this.props;
        const { pathname, search } = location;
        this.setState({
            loading: true,
        },()=>{
            this.props.dispatch( ordersList(pathname,queryString.parse(search)) ).then( res => {
                this.setState({
                    loading: false,
                    list: res
                })
            });
        })
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Index );