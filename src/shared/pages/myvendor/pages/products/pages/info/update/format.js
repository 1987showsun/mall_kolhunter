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

class Format extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            id: props.id,
            status: props.status,
            msg: [],
            required: ['name','quantity'],
            data: props.data,
            inputTableHeadKey : [
                {
                    key: 'name',
                    type: 'text',
                    title: '型號 / 尺寸 / 顏色'
                },
                // {
                //     key: 'sku',
                //     type: 'text',
                //     title: '商品編號'
                // },
                {
                    key: 'quantity',
                    type: 'number',
                    title: '庫存數量',
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

        const { msg, loading, data, inputTableHeadKey } = this.state;

        return(
            <section className="admin-content-row">
                <article className="admin-content-title">
                    <h4>商品規格</h4>
                    <button type="button" onClick={this.addCondition.bind(this)}>
                        <i><FontAwesomeIcon icon={faPlus} /></i>
                        新增規格
                    </button>
                </article>
                <div className="admin-content-container">
                    <form onSubmit={this.handleSubnit.bind(this)}>
                        <InputTable
                            loading={loading}
                            tableHeadData={inputTableHeadKey}
                            tableBodyData={data}
                            onChangeData={this.onChangeData.bind(this)}
                        />
                        {
                            msg.length!=0 &&
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

    onChangeData = ( data ) => {
        this.setState({
            data
        })
    }

    addCondition = () => {
        let { data } = this.state;
        data = [
            ...data, 
            {
                name: "",
                // sku: "",
                quantity: 0
            }
        ]
        this.setState({
            data
        })
    }

    handleSubnit = (e) => {
        e.preventDefault();
        const method = 'put';
        const { required, id, data } = this.state;
        const checkRequiredFilter = data.length==0? [<div key='0' className="items">{ lang['zh-TW']['note'][`spec required`] }</div>] : required.filter( keys => {
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
                this.props.dispatch( createProduct({id, spec: data}, 3, method) ).then( res => {
                    this.setState({
                        loading: false
                    },()=>{
                        switch( res['status'] ){
                            case 200:
                                this.props.returnResult(data);
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

export default connect( mapStateToProps )( Format );