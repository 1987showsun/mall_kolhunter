import React from 'react';
import toaster from 'toasted-notes';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Actions
import { orderInfoProductDeliveryStatus } from '../../../../../../../actions/myvendor';

// Lang
import lang from '../../../../../../../public/lang/lang.json';

class DeliveryUpdate extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selectUpdateFormObject: props.selectUpdateFormObject
        }
    }

    render(){

        const { selectUpdateFormObject } = this.state;

        return(
            <div className="small-popup">
                <div className="small-popup-mask" onClick={this.handleCancel.bind(this)}></div>
                <div className="small-popup-wrap">
                    <div className="small-popup-title">
                        <h3>運送狀態修改</h3>
                    </div>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <ul className="table-row-list">
                            <li>
                                <label>商品編號</label>
                                <div>{selectUpdateFormObject['specSku'] || "N/A"}</div>
                            </li>
                            <li>
                                <label>運送狀態</label>
                                <div>
                                    <div className="input-box select">
                                        <select name="deliveryStatus" value={selectUpdateFormObject['deliveryStatus'] || 'init'} onChange={this.handleChange.bind(this)}>
                                            {
                                                Object.keys(lang['zh-TW']['deliveryStatus']).map( keys => {
                                                    return <option key={keys} value={keys}>{ lang['zh-TW']['deliveryStatus'][keys] }</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label>運送編號</label>
                                <div>
                                    <div className="input-box">
                                        <input type="text" name="deliveryCode" value={selectUpdateFormObject['deliveryCode'] || ""} onChange={this.handleChange.bind(this)} />
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <ul className="action-ul">
                            <li><button type="button" className="cancel" onClick={this.handleCancel.bind(this)}>取消</button></li>
                            <li><button type="submit" className="basic">更新</button></li>
                        </ul>
                    </form>
                </div>
            </div>
        );
    }

    handleChange = (e) => {
        const { selectUpdateFormObject } = this.state;
        const { name, value } = e.target;
        this.setState({
            selectUpdateFormObject: {
                ...selectUpdateFormObject,
                [name]: value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { location } = this.props;
        const { selectUpdateFormObject } = this.state;
        const { pathname, search } = location;
        this.props.dispatch( orderInfoProductDeliveryStatus(pathname,{...queryString.parse(search)},selectUpdateFormObject) ).then( res => {
            switch( res['status']) {
                case 200:
                    toaster.notify(
                        <div className={`toaster-status success`}>更新成功</div>
                    ,{
                        position: 'bottom-right',
                        duration: 4000
                    })
                    this.props.returnOpen(false);
                    break;

                default:
                    break;
            }
        });
    }

    handleCancel = () => {
        if(this.props.handleCancel!=undefined){
            this.props.handleCancel();
        }
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( DeliveryUpdate );