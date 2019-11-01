import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux';

// Modules
import Loading from '../../../../../../module/loading';

// Actions
import { createProduct } from '../../../../../../actions/myvendor';

// Lang
import lang from '../../../../../../public/lang/lang.json';

class Basic extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            step: props.step,
            msg: [],
            required: ['name','categories','price'],
            categoriesItem: props.categoriesItem,
            data: {
                id: "",
                name: "",
                categories: [],
                price: "",
                priceSale: ""
            },
            categoriesLevel1: {
                id: "",
                title: ""
            },
            categoriesLevel2: {
                id: "",
                title: ""
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        return{
            step: props.step,
            categoriesItem: props.categoriesItem
        }
    }

    render(){

        const { loading, msg, step, data, categoriesItem, categoriesLevel1 } = this.state;

        return(
            <React.Fragment>
                <article className="admin-content-title">
                    <h4>基本資料</h4>
                </article>
                <form className="create-form" onSubmit={this.handleSubmit.bind(this)}>
                    <ul className="table-row-list">
                        <li>
                            <label>* 商品名稱</label>
                            <div>
                                <div className="input-box">
                                    <input type="text" name="name" value={data['name']} onChange={this.handleChange.bind(this)} />
                                </div>
                            </div>
                        </li>
                        <li>
                            <label>* 商品分類</label>
                            <div>
                                <div className="input-box select category">
                                    <select name="categoriesLevel1" value={data['categoriesLevel1']} onChange={this.categoriesChange.bind(this)}>
                                        <option value="" >請選擇主分類</option>
                                        {
                                            categoriesItem.map( (cItem,i)=> {
                                                return(
                                                    <option key={cItem['id']} value={cItem['id']}>{cItem['title']}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                                {
                                    categoriesItem.map( (cItem,i)=> {
                                        if(cItem['id']==categoriesLevel1['id'] && cItem['children'].length!=0){                                     
                                            return(
                                                <div className="input-box select category" key={i}>
                                                    <select name="categoriesLevel2" value={data['categoriesLevel2']} onChange={this.categoriesChange.bind(this)}>
                                                        <option value="" >請選擇次分類</option>
                                                        {
                                                            cItem['children'].map( (childrenItem,c_i) => {
                                                                return(
                                                                    <option key={childrenItem['id']} value={childrenItem['id']}>{childrenItem['title']}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </li>
                        <li>
                            <label>* 原價</label>
                            <div>
                                <div className="input-box">
                                    <CurrencyFormat thousandSeparator={true} value={data['price']} onValueChange={ values => { this.handleChangeMoney( values['value'], 'price' ) }}/>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label>特價</label>
                            <div>
                                <div className="input-box">
                                    <CurrencyFormat thousandSeparator={true} value={data['priceSale']} onValueChange={ values => { this.handleChangeMoney( values['value'], 'priceSale' ) }}/>
                                </div>
                            </div>
                        </li>
                    </ul>
                    {
                        msg.length!=0 &&
                            <div className="admin-form-msg">{msg}</div>
                    }
                    <div className="admin-form-action">
                        <ul>
                            <li>
                                <button type="button" className="cancel" onClick={this.props.returnCancel}>取消</button>
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

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            data: {
                ...this.state.data,
                [name]: value
            }
        })
    }

    categoriesChange = (e) => {
        let { data } = this.state; 
        let name = e.target.name;
        let val = e.target.value;
        let index = e.nativeEvent.target.selectedIndex;
        let text = e.nativeEvent.target[index].text;

        this.setState({
            [name] : {
                id: val,
                title: text
            }
        },()=>{
            const { categoriesLevel1,categoriesLevel2 } = this.state;
            if( categoriesLevel1['id']!='' ){
                data['categories'][0] = categoriesLevel1;
            }
            if( categoriesLevel2['id']!='' ){
                data['categories'][1] = categoriesLevel2;
            }
            this.setState({
                data
            })
        })

    }

    handleChangeMoney = ( val,name ) => {
        let { data } = this.state;
        data[name] = val;
        this.setState({
            data
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const method = 'post';
        const { step, required, data } = this.state;
        const checkRequiredFilter = required.filter( keys => {
            if( keys=='categories' ){
                return data[keys].length<=0;
            }else{
                return data[keys]=='';
            }
        }).map( keys => <div key={keys} className="items">{ lang['zh-TW']['note'][`${keys} required`] }</div>);
        
        // this.props.returnSuccess({ step: step+1});
        if( checkRequiredFilter.length==0 ){
            this.setState({
                loading: true
            },()=>{
                this.props.dispatch( createProduct( data, step, method ) ).then( res => {
                    this.setState({
                        loading: false,
                    },()=>{
                        switch( res['status'] ){
                            case 200:
                                const { id } = res.data;
                                this.setState({
                                    msg: []
                                },()=>{                        
                                    this.props.returnSuccess({ step: step+1, id: id });
                                })
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

export default connect( mapStateToProps )( Basic );