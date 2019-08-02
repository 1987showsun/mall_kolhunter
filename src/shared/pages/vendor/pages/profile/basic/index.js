import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPencilAlt }from '@fortawesome/free-solid-svg-icons';

// Components
import FormBasic from './form/basic';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            update: false,
            data: props.info
        }
    }

    static getDerivedStateFromProps( props, state){
        if( props.info!=state.data ){
            return{
                data: props.info
            }
        }
    }

    render(){

        const { update, data } = this.state;
        console.log( data );

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>商品圖片</h4>
                        {
                            !update &&
                                <button type="button" className="update-button" onClick={()=>this.setState({update: true}) }>
                                    <i><FontAwesomeIcon icon={faPencilAlt}/></i>
                                    編輯
                                </button>
                        }
                    </article>
                    {
                        !update? (
                            Object.keys(data).length!=0 &&
                                <React.Fragment>
                                    <div className="unit-head">
                                        <h3>一般</h3>
                                    </div>
                                    <ul className="table-row-list">
                                        <li>
                                            <label>公司名稱</label>
                                            <div className="">{data['company']}</div>
                                        </li>
                                        <li>
                                            <label>統一編號</label>
                                            <div className="">{data['invoice']}</div>
                                        </li>
                                        <li>
                                            <label>聯絡人</label>
                                            <div className="">{data['contactor']}</div>
                                        </li>
                                        <li>
                                            <label>聯絡電話</label>
                                            <div className="">{data['phone']}</div>
                                        </li>
                                        <li>
                                            <label>聯絡信箱</label>
                                            <div className="">{data['email']}</div>
                                        </li>                        
                                        <li>
                                            <label>公司地址</label>
                                            <div className="">{`${data['zipcode']} ${data['city']}${data['district']}${data['address']}`}</div>
                                        </li>
                                    </ul>
                                    <div className="unit-head">
                                        <h3>匯 / 收款銀行資料</h3>
                                    </div>
                                    <ul className="table-row-list">
                                        <li>
                                            <label>銀行名稱</label>
                                            <div className="">{data['bankName']}</div>
                                        </li>
                                        <li>
                                            <label>銀行代碼</label>
                                            <div className="">{data['bankCode']}</div>
                                        </li>
                                        <li>
                                            <label>分行</label>
                                            <div className="">{data['bankBranch']}</div>
                                        </li>
                                        {/* <li>
                                            <label>分行代碼</label>
                                            <div className="">{data['bankBranchCode']}</div>
                                        </li> */}
                                        <li>
                                            <label>帳戶名稱</label>
                                            <div className="">{data['bankAccountName']}</div>
                                        </li>
                                        <li>
                                            <label>帳號</label>
                                            <div className="">{data['bankAccount']}</div>
                                        </li>
                                    </ul>
                                </React.Fragment>
                        ):(
                            <FormBasic
                                data={data}
                                returnCancel={ this.returnCancel.bind(this) }
                            />
                        )
                    }
                </section>
            </React.Fragment>
        );
    }

    handleChange = (e) => {

    }

    returnCancel = () => {
        this.setState({
            update: false
        })
    }
}

const mapStateToProps = state => {
    return{
        info: state.vendor.info
    }
}

export default connect( mapStateToProps )( Index );