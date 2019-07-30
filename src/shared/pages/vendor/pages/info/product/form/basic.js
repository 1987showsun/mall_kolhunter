import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { connect } from 'react-redux';

// Actions
import { createProduct } from '../../../../../../actions/vendor';

class Basic extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            categories: props.categories || [],
            status: props.status,
            data: props.data,
            categoriesLevel1: {
                id: props.categories.length!=0? props.data['categories'][0]['id'] : "",
                title:  props.categories.length!=0? props.data['categories'][0]['title'] : ""
            },
            categoriesLevel2: {
                id: props.categories[1]!=undefined? props.data['categories'][1]['id'] : '',
                title:  props.categories[1]!=undefined? props.data['categories'][1]['title'] : ''
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        return{
            status: props.status,
            data: props.data,
            categories: props.categories
        }
    }

    render(){

        const { status, data, categories, categoriesLevel1, categoriesLevel2 } = this.state;
        const renderCategories = () => {
            let ddd = [];
            data['categories'].map( item => {
                ddd = [ ...ddd , <span className="categories-item">{item['title']}</span> ];
            })
            return ddd;
        }

        return(
            <form onSubmit={this.handleSubnit.bind(this)}>
                <ul className="table-row-list">
                    <li>
                        <label>* 商品名稱</label>
                        <div>
                            {
                                status=="none-auth"? (
                                    <div className="input-box">
                                        <input type="text" name="name" value={data['name']} onChange={this.handleChange.bind(this)} />
                                    </div>
                                ):(
                                    data['name']
                                )
                            }
                        </div>
                    </li>
                    <li>
                        <label>* 商品分類</label>
                        <div>
                            {
                                status=="none-auth"? (
                                    <React.Fragment>
                                        <div className="input-box select">
                                            <select name="categoriesLevel1" value={categoriesLevel1['id']} onChange={this.categoriesChange.bind(this)}>
                                                <option value="" >請選擇主分類</option>
                                                {
                                                    categories.map( (cItem,i)=> {
                                                        return(
                                                            <option key={cItem['id']} value={cItem['id']}>{cItem['title']}</option>
                                                        );
                                                    })
                                                }
                                            </select>
                                        </div>
                                        {
                                            categories.map( (cItem,i)=> {
                                                if(cItem['id']==categoriesLevel1['id'] && cItem['children'].length!=0){                                  
                                                    return(
                                                        <div className="input-box select" key={i}>
                                                            <select name="categoriesLevel2" value={categoriesLevel2['id']} onChange={this.categoriesChange.bind(this)}>
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
                                    </React.Fragment>
                                ):(
                                    renderCategories()
                                )
                            }
                        </div>
                    </li>
                    <li>
                        <label>* 原價</label>
                        <div>
                            <div className="input-box">
                                <CurrencyFormat thousandSeparator={true} value={Math.round(data['price'])} onValueChange={ values => { this.handleChangeMoney( values['value'], 'price' ) }}/>
                            </div>
                        </div>
                    </li>
                    <li>
                        <label>特價</label>
                        <div>
                            <div className="input-box">
                                <CurrencyFormat thousandSeparator={true} value={Math.round(data['sellPrice'])} onValueChange={ values => { this.handleChangeMoney( values['value'], 'sellPrice' ) }}/>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul className="action-ul">
                    <li><button type="button" className="cancel" onClick={this.props.returnCancel.bind(this)}>取消</button></li>
                    <li><button className="basic">更新</button></li>
                </ul>
            </form>
        );
    }

    handleChange = (e) => {
        let { data } = this.state;
        let name = e.target.name;
        let val = e.target.value;
        data[name] = val;
        this.setState({
            data
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
        data[name] = parseInt(val);
        this.setState({
            data
        })
    }

    handleSubnit = (e) => {
        e.preventDefault();
        let { data } = this.state;
        let formObject = {
            "id": data['id'],
            "name": data['name'],
            "price": data['price'],
            "sellPrice": data['sellPrice'],
            "categories": data['categories']
        }
        this.props.dispatch( createProduct( 'product',formObject,1,'put' ) ).then( res => {
            switch( res['status'] ){
                case 200:
                    this.props.returnStatus(data);
                    break;
            }
        });
    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default connect( mapStateToProps )( Basic );