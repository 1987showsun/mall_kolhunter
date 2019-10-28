import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus }from '@fortawesome/free-solid-svg-icons';

// Components
import InputTable from '../../../../../../../module/inputTable';

// Actions
import { createProduct } from '../../../../../../../actions/myvendor';

// Lang
import lang from '../../../../../../../public/lang/lang.json';

class Freight extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading           : false,
            msg               : [],
            required          : ['deliveryID','deliveryCost'],
            id                : props.id,
            deliveries        : props.deliveries,
            data              : props.data,
            inputTableHeadKey : [
                {
                    key         : 'deliveryID',
                    type        : 'select',
                    title       : '貨運名稱',
                    options     : []
                },
                {
                    key         : 'deliveryCost',
                    type        : 'number',
                    title       : '費用',
                    className   : 'number'
                },
                {
                    key         : 'action',
                    type        : 'action',
                    title       : '其他'
                }
            ]
        }
    }

    render(){

        const { loading, msg, deliveries, inputTableHeadKey, data } = this.state;
        const initOption = {
            value: "",
            name : "請選擇運送方式",
        }
        inputTableHeadKey['0']['options'] = [
            initOption,
            ...deliveries.map( (item,i)=> {
                return{
                    value : item['id'],
                    name  : item['name']
                }
            })
        ]
        return(
            <section className="admin-content-row">
                <article className="admin-content-title">
                    <h4>運送方式</h4>
                    <button type="button" onClick={this.addCondition.bind(this)}>
                        <i><FontAwesomeIcon icon={faPlus} /></i>
                        新增條件
                    </button>
                </article>
                <div className="admin-content-container">     
                    <form onSubmit={this.handleSubnit.bind(this)}>
                        <InputTable 
                            loading       = {loading}
                            tableHeadData = {inputTableHeadKey}
                            tableBodyData = {data}
                            onChangeData  = {(data)=>{
                                this.setState({
                                    data
                                })
                            }}
                        />
                        {
                            msg.length>0 &&
                                <div className="admin-form-msg">{msg}</div>
                        }
                        <ul className="action-ul">
                            <li><button type="button" className="cancel" onClick={this.props.returnCancel.bind(this)}>取消</button></li>
                            <li><button className="basic">更新</button></li>
                        </ul>
                    </form>
                </div>
            </section>
        );
    }
    
    addCondition = () => {
        this.setState({
            data: [
                ...this.state.data,
                {
                    deliveryID    : "",
                    deliveryCost  : 0
                }
            ]
        })
    }

    handleSubnit = (e) => {
        e.preventDefault();
        const { required, id, data } = this.state;
        const checkRequiredFilter = data.length==0? [<div key='0' className="items">{ lang['zh-TW']['note'][`deliveries required`] }</div>]:required.filter( keys => {
            return data.some( someItem => {
                if( someItem[keys]=='' ){
                    return true;
                }
            });
        }).map( keys => <div key={keys} className="items">{ lang['zh-TW']['note'][`${keys} required`] }</div>);

        if( checkRequiredFilter.length==0 ){
            this.setState({
                loading: true
            },()=>{
                this.props.returnResult( data );
                this.setState({
                    loading: false
                });
                this.props.dispatch( createProduct({ id, deliveries: data }, 5, 'put') ).then( res => {
                    this.setState({
                        loading: false
                    },()=>{
                        switch( res['status'] ){
                            case 200:
                                this.props.returnResult( data );
                                break;

                            default:
                                break;
                        }
                    })
                });
            });
        }else{
            this.setState({
                msg: checkRequiredFilter
            })
        }
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Freight );