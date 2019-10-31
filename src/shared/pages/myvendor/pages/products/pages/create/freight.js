import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus }from '@fortawesome/free-solid-svg-icons';

// Modules
import InputTable from '../../../../../../module/inputTable';
import Loading from '../../../../../../module/loading';

// Actions
import { deliveries } from '../../../../../../actions/common';
import { createProduct } from '../../../../../../actions/myvendor';

// Lang
import lang from '../../../../../../public/lang/lang.json';

class Freight extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            id: props.id,
            step: props.step,
            msg: [],
            required: ['deliveryID','deliveryCost'],
            deliveries: [],
            data : [],
            tableHeadKey : [
                {
                    key: 'deliveryID',
                    type: 'select',
                    title: '貨運名稱',
                    options: []
                },
                {
                    key: 'deliveryCost',
                    type: 'number',
                    title: '費用',
                    className: 'number'
                },
                {
                    key: 'action',
                    type: 'action',
                    title: '其他'
                }
            ]
        }
    }

    render(){

        const { loading, id, step, msg, tableHeadKey, data } = this.state;

        return(
            <React.Fragment>
                <article className="admin-content-title">
                    <h4>運送方式</h4>
                    <button type="button" onClick={this.addCondition.bind(this)}>
                        <i><FontAwesomeIcon icon={faPlus} /></i>
                        新增條件
                    </button>
                </article>
                <form className="create-form" onSubmit={this.handleSubmit.bind(this)}>
                    <InputTable 
                        tableHeadData={tableHeadKey}
                        tableBodyData={data}
                        onChangeData={this.onChangeData.bind(this)}
                    />
                    {
                        msg.length!=0 &&
                            <div className="admin-form-msg">{msg}</div>
                    }
                    <div className="admin-form-action">
                        <ul>
                            <li>
                                <button type="button" className="cancel" onClick={this.props.returnCancel.bind(this)}>取消</button>
                            </li>
                            <li>
                                <button type="submit">{ step!=5? lang['zh-TW']['Submit Next'] : lang['zh-TW']['Finish'] }</button>
                            </li>
                        </ul>
                    </div>
                    <Loading loading={loading} />
                </form>
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { tableHeadKey } = this.state;
        this.props.dispatch( deliveries() ).then( res => {

            const options = [
                    {
                        value: "",
                        name: "請選擇運送方式"
                    },
                    ...res['data'].map( (item,i)=> {
                    return{
                        value: item['id'],
                        name: item['name']
                    }
                })
            ]
            tableHeadKey[0]['options'] = options;

            this.setState({
                deliveries: options,
                tableHeadKey
            })
        });        
    }

    onChangeData = ( data ) => {
        this.setState({
            data
        })
    }
    
    addCondition = () => {
        const { deliveries } = this.state;
        let { data } = this.state;
        data = [
            ...data, 
            {
                deliveryID: deliveries[0]['value'],
                deliveryCost: 0
            }
        ]
        this.setState({
            data
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const method = 'put';
        const { id, step, required, data } = this.state;
        const checkRequiredFilter = data.length==0? [<div key='0' className="items">{ lang['zh-TW']['note'][`deliveries required`] }</div>] : required.filter( keys => {
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
                this.props.dispatch( createProduct( { id, deliveries: data}, step, method ) ).then( res => {
                    this.setState({
                        loading: false
                    },()=>{  
                        switch( res['status'] ){
                            case 200:
                                this.setState({
                                    msg: []
                                },()=>{
                                    this.props.returnSuccess({ status: "success" });
                                })
                                break;

                            default:
                                break;
                        }
                    });
                });
            });
        }else{
            this.setState({
                msg: checkRequiredFilter
            },()=>{
                this.props.returnError( checkRequiredFilter );
            })
        }
    }

    handleCancel = () => {

    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Freight );