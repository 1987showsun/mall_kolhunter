import React                            from 'react';
import { connect }                      from 'react-redux';
import { FontAwesomeIcon }              from '@fortawesome/react-fontawesome';
import { faPlus }                       from '@fortawesome/free-solid-svg-icons';

// Modules
import InputTable                       from '../../../../../../module/inputTable';
import Loading                          from '../../../../../../module/loading';

// Actions
import { createProduct }                from '../../../../../../actions/myvendor';

// Lang
import lang                             from '../../../../../../public/lang/lang.json';

class Format extends React.Component{

    constructor(props){
        super(props);
        const id      = sessionStorage.getItem('createProductId');
        const data    = JSON.parse(sessionStorage.getItem(`createProductStep${props.step}`));
        this.state    = {
            loading      : false,
            id           : id!=null? id:'',
            step         : props.step,
            msg          : [],
            required     : ['name','quantity'],
            data         : data!=null? data['spec']:[],
            tableHeadKey : [
                {
                    key       : 'name',
                    type      : 'text',
                    title     : '型號 / 尺寸 / 顏色'
                },
                // {
                //     key: 'sku',
                //     type: 'text',
                //     title: '商品編號'
                // },
                {
                    key       : 'quantity',
                    type      : 'number',
                    title     : '庫存數量',
                    className : 'number'
                },
                {
                    key       : 'action',
                    type      : 'action',
                    title     : '其他'
                }
            ]
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            step: props.step
        }
    }

    render(){

        const { loading, id, step, msg, data, tableHeadKey } = this.state;

        return(
            <React.Fragment>
                <article className="admin-content-title">
                    <h4>商品規格</h4>
                    <button type="button" onClick={this.addCondition.bind(this)}>
                        <i><FontAwesomeIcon icon={faPlus} /></i>
                        新增規格
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
                                <button type="button" className="previous" onClick={this.goPrevious.bind(this)}>{lang['zh-TW']['Previous']}</button>
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

    handleSubmit = (e) => {
        e.preventDefault();
        const method = 'put';
        const { id, step, required, data } = this.state;
        const checkRequiredFilter = data.length==0? [<div key='0' className="items">{ lang['zh-TW']['note'][`spec required`] }</div>] : required.filter( keys => {
            return data.some( someItem => {
                if( someItem[keys]=='' ){
                    return true;
                }
            });
        }).map( keys => <div key={keys} className="items">{ lang['zh-TW']['note']['format'][`${keys} required`] }</div>);

        // this.props.returnSuccess({ step: step+1 });
        if( checkRequiredFilter.length==0 ){
            this.setState({
                loading: true
            },()=>{
                this.props.dispatch( createProduct( { id, spec: data}, step, method ) ).then( res => {
                    this.setState({
                        loading: false,
                    },()=>{    
                        switch( res['status'] ){
                            case 200:
                                this.setState({
                                    msg: []
                                },()=>{
                                    sessionStorage.setItem('createProductStep3', JSON.stringify({id, spec: data}));       
                                    this.props.returnSuccess({ step: Number(step)+1 });
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

    goPrevious = () => {
        const { step } = this.state;
        this.props.returnSuccess({ step: step-1 });
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Format );