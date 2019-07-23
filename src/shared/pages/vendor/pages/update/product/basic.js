import React from 'react';
import CurrencyFormat from 'react-currency-format';

export default class Product extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            categoriesItem: props.categoriesItem,
            status: props.status,
            data: props.data,
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
            categoriesItem: props.categoriesItem
        }
    }

    render(){

        const { data,status,categoriesItem,categoriesLevel1,categoriesLevel2 } = this.state;
        console.log( status );

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>基本資料</h4>
                    </article>
                    <ul className="table-row-list">
                        <li>
                            <label>* 商品名稱：</label>
                            <div>
                                {
                                    status==2? (
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
                            <label>* 商品分類：</label>
                            <div>
                                {
                                    status==2? (
                                        <React.Fragment>
                                            <div className="input-box select">
                                                <select name="categoriesLevel1" value={data['categoriesLevel1']} onChange={this.categoriesChange.bind(this)}>
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
                                                            <div className="input-box select" key={i}>
                                                                <select name="categoriesLevel2" value={data['categoriesLevel2']} onChange={this.categoriesChange.bind(this)}>
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
                                        <React.Fragment>
                                            {
                                                data['categories'].map( (item,i) => {
                                                    if(i==data['categories'].length-1){
                                                        return `${item['name']}`;
                                                    }
                                                    return `${item['name']} / `;
                                                })
                                            }
                                        </React.Fragment>
                                    )
                                }
                            </div>
                        </li>
                        <li>
                            <label>* 原價：</label>
                            <div>
                                <div className="input-box">
                                    <CurrencyFormat thousandSeparator={true} value={data['price']} onValueChange={ values => { this.handleChangeMoney( values['value'], 'price' ) }}/>
                                </div>
                            </div>
                        </li>
                        <li>
                            <label>特價：</label>
                            <div>
                                <div className="input-box">
                                    <CurrencyFormat thousandSeparator={true} value={data['priceSale']} onValueChange={ values => { this.handleChangeMoney( values['value'], 'priceSale' ) }}/>
                                </div>
                            </div>
                        </li>
                    </ul>
                </section>
            </React.Fragment>
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
            },()=>{
                this.returnBack();
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

    returnBack = () => {
        const { data } = this.state;
        //this.props.onHandleChange('basic',data);
    }
}