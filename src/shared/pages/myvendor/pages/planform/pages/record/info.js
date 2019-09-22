import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Modules
import Loading from '../../../../../../module/loading';

// Actions
import { buyCaseBillInfo } from '../../../../../../actions/myvendor';

// Lang
import lang from '../../../../../../public/lang/lang.json';

class Info extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            info: []
        }
    }

    static getDerivedStateFromProps(props,state){
        return{
            info: props.info
        }
    }

    render(){

        const { loading, info } = this.state;

        return(
            <section className="admin-content">
                {
                    info.length!=0?(
                        <React.Fragment>
                            <Loading loading={loading} />
                            <section className="admin-content-row">
                                <article className="admin-content-title">
                                    <h4>基本資料</h4>
                                </article>
                                <ul className="table-row-list">
                                    <li>
                                        <label>帳單編號</label>
                                        <div>{info[0]['orderID']}</div>
                                    </li>
                                    <li>
                                        <label>購買人</label>
                                        <div>{info[0]['orderName']}</div>
                                    </li>
                                    <li>
                                        <label>聯絡信箱</label>
                                        <div>{info[0]['orderEmail']}</div>
                                    </li>
                                    <li>
                                        <label>聯絡電話</label>
                                        <div>{info[0]['orderPhone']}</div>
                                    </li>
                                </ul>
                            </section>
                            <section className="admin-content-row">
                                <article className="admin-content-title">
                                    <h4>付款資料</h4>
                                </article>
                                <ul className="table-row-list">
                                    <li>
                                        <label>付款方式</label>
                                        <div>{lang['zh-TW']['payment'][info[0]['payMethod']]}</div>
                                    </li>
                                    <li>
                                        <label>帳單狀態</label>
                                        <div>{lang['zh-TW']['orderStatus'][info[0]['orderStatus']]}</div>
                                    </li>
                                    {
                                        info[0]['payMethod']=='atm' &&
                                            <React.Fragment>
                                                <li>
                                                    <label>銀行代號</label>
                                                    <div>{info[0]['payAdditionalInfo']['BankCode']}</div>
                                                </li>
                                                <li>
                                                    <label>虛擬帳號</label>
                                                    <div>{info[0]['payAdditionalInfo']['VaccNo']}</div>
                                                </li>
                                            </React.Fragment>
                                    }
                                </ul>
                            </section>
                            <section className="admin-content-row">
                                <div className="">
                                    <span>總金額</span>
                                    <span>{info[0]['amount']}</span>
                                </div>
                            </section>
                        </React.Fragment>
                    ):(
                        <Loading loading={loading} />
                    )
                }
            </section>
        );
    }

    componentDidMount() {
        const { location, match } = this.props;
        const { pathname, search } = location;
        const orderID = match['params']['id'];
        this.setState({
            loading: true,
        },()=>{
            this.props.dispatch( buyCaseBillInfo(pathname,{...queryString.parse(search), orderID}) ).then( res => {
                this.setState({
                    loading: false,
                })
            });
        })
    }
    
}

const mapStateToProps = state => {
    return{
        info: state.myvendor.billInfo
    }
}

export default connect( mapStateToProps )( Info );