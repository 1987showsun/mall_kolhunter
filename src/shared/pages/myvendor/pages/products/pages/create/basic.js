import React                   from 'react';
import CurrencyFormat          from 'react-currency-format';
import { connect }             from 'react-redux';

// Modules
import Loading                 from '../../../../../../module/loading';

// Actions
import { createProduct }       from '../../../../../../actions/myvendor';

// Lang
import lang                    from '../../../../../../public/lang/lang.json';

class Basic extends React.Component{

    constructor(props){
        super(props);
        const id   = sessionStorage.getItem('createProductId');
        const data = JSON.parse(sessionStorage.getItem(`createProductStep${props.step}`));
        console.log('constructor',id);
        this.state = {
            loading         : false,
            step            : props.step,
            msg             : [],
            required        : ['name','categories','price'],
            categoriesItem  : [],
            data            : {
                id            : id!=null  ? id                 : '',
                name          : data!=null? data['name']       : "",
                categories    : data!=null? data['categories'] : [],
                price         : data!=null? data['price']      : "",
                priceSale     : data!=null? data['priceSale']  : ""
            },
            categoriesLevel1: {
                id            : data!=null? data['categories'][0]['id']    : "",
                title         : data!=null? data['categories'][0]['title'] : ""
            },
            categoriesLevel2: {
                id            : data!=null? data['categories'][1]['id']    : "",
                title         : data!=null? data['categories'][1]['title'] : ""
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        let step           = state.step;
        let categoriesItem = state.categoriesItem;
        if( props.step!=step ){
            step = props.step;
        }
        if( categoriesItem.length==0 ){
            categoriesItem = props.categoriesItem;
        }
        return{
            step,
            categoriesItem
        }
    }

    render(){

        const { loading, msg, step, data, categoriesItem, categoriesLevel1 } = this.state;
        const { categories } = data;

        return(
            <React.Fragment>
                <article className="admin-content-title">
                    <h4>????????????</h4>
                </article>
                <form className="create-form" onSubmit={this.handleSubmit.bind(this)}>
                    <ul className="table-row-list">
                        <li>
                            <label>* ????????????</label>
                            <div>
                                <div className="input-box">
                                    <input type="text" name="name" value={data['name']} onChange={this.handleChange.bind(this)} />
                                </div>
                            </div>
                        </li>
                        <li>
                            <label>* ????????????</label>
                            <div>
                                <div className="input-box select category">
                                    <select name="categoriesLevel1" value={categories.length>0? categories[0]['id']:""} onChange={this.categoriesChange.bind(this)}>
                                        <option value="" >??????????????????</option>
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
                                                    <select name="categoriesLevel2" value={categories.length>1? categories[1]['id']:""} onChange={this.categoriesChange.bind(this)}>
                                                        <option value="" >??????????????????</option>
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
                            <label>* ??????</label>
                            <div>
                                <div className="input-box">
                                    <CurrencyFormat thousandSeparator={true} value={data['price']} onValueChange={ values => { this.handleChangeMoney( values['value'], 'price' ) }}/>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label>??????</label>
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
                                <button type="button" className="cancel" onClick={this.props.returnCancel}>??????</button>
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
        const { name, value } = e.target;
        let { data }          = this.state; 
        let index             = e.nativeEvent.target.selectedIndex;
        let text              = e.nativeEvent.target[index].text;

        this.setState({
            [name] : {
                id    : value,
                title : text
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
        
        const { step, required, data } = this.state;
        const { id } = data;
        let   method = id==""? 'post':'put';

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
                                const resId  = id==""? res['data']['id'] : id;
                                this.setState({
                                    msg: []
                                },()=>{
                                    sessionStorage.setItem('createProductId',resId);
                                    sessionStorage.setItem('createProductStep1', JSON.stringify({...data, id: resId}));     
                                    this.props.returnSuccess({ id: resId, step: Number(step)+1 });
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