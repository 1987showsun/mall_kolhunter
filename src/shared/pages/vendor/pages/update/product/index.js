import React from 'react';
import { Link } from 'react-router-dom';

// Components
import Cover from './cover';
import Basic from './basic';
import Freight from './freight';
import Format from './format';
import Depiction from './depiction';

// Lang
import lang from '../../../../../lang/lang.json';

const categoriesItem = [
    {
        "id": "35096221867e8d90eaa1",
        "title": "喇叭",
        "children": []
    },
    {
        "id": "5c6c97b086b56e2214da",
        "title": "美妝保健",
        "children": [
            {
                "id": "3eb6a97e0862c384771d",
                "title": "專櫃彩妝"
            },
            {
                "id": "696693091caba66d7638",
                "title": "專櫃清潔保養"
            }
        ]
    },
    {
        "id": "366caff843e078734dd7",
        "title": "家電影音",
        "children": [
            {
                "id": "61f489640acc966f1a77",
                "title": "生活家電"
            },
            {
                "id": "b0ee832e400705ea0315",
                "title": "電視機"
            }
        ]
    },
    {
        "id": "b65e70aa1826f6ea901c",
        "title": "其他",
        "children": []
    }
]

export default class Product extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            maxStep: 5,
            step: 1,
            formObject : {
                status: 2,
                1: {
                    name: "現貨 Thrasher Flame Logo 短T 雜誌 短袖 圓領 火焰 黑白 GD 基本款 黑",
                    categories:[
                        {
                            id: "5c6c97b086b56e2214da",
                            name: "美妝保健"
                        },
                        {
                            id: "3eb6a97e0862c384771d",
                            name: "專櫃彩妝"
                        }
                    ],
                    price: 12345,
                    priceSale: 0
                },
                2: [
                    {
                        image: 'https://s.yimg.com/zp/MerchandiseImages/259263A4AB-Product-22657178.jpg',
                        sticky: true
                    },
                    {
                        image: 'https://s.yimg.com/zp/MerchandiseImages/AADC30A6F4-Product-22657178.jpg',
                        sticky: false
                    },
                    {
                        image: 'https://s.yimg.com/zp/MerchandiseImages/323861001B-Product-22657178.jpg',
                        sticky: false
                    }
                ],
                3: [
                    {
                        name: '黑/Ｍ',
                        sku: 'TW000001',
                        quantity: 100
                    },
                    {
                        name: '白/Ｍ',
                        sku: 'TW000002',
                        quantity: 82
                    }
                ],
                4: [
                    {
                        type: 'image',
                        content: 'https://s.yimg.com/zp/MerchandiseSpec/00FE8266EC-SP-6595537.jpg'
                    },
                    {
                        type: 'image',
                        content: 'https://s.yimg.com/zp/MerchandiseSpec/0fe6552b3e-Gd-8180013.jpg'
                    },
                    {
                        type: 'image',
                        content: 'https://s.yimg.com/zp/MerchandiseSpec/a8bc5a502d-Gd-8180013.jpg'
                    },
                    {
                        type: 'image',
                        content: 'https://s.yimg.com/zp/MerchandiseSpec/79a86d01a3-Gd-8180013.jpg'
                    },
                    {
                        type: 'image',
                        content: 'https://s.yimg.com/zp/MerchandiseSpec/4e1c0b6e27-Gd-8180013.jpg'
                    },
                    {
                        type: 'text',
                        content: '我們所提供為全新產品，並提供以下保證： - 保固期限：無  - 保固範圍：新品瑕疵 顧客諮詢服務中心：本站客服中心'
                    }
                ],
                5: [
                    {
                        method: 0,
                        fee: 160
                    },
                    {
                        method: 1,
                        fee: 60
                    }
                ]
            }
        }
    }

    render(){

        const { formObject, maxStep, step } = this.state;
        const returnStep = () => {
            let returnView = [];
            for( let i=1 ;i<=maxStep ; i++){
                returnView.push( 
                    <li key={i} className={`${step==i}`}>
                        <span className={`step-number`}>{i}</span>
                        <div className="prompt">{ lang['zh-TW']['create']['product'][i] }</div>
                    </li>
                );
            }
            return returnView;
        }

        return(
            <React.Fragment>
                <div className="step-wrap">
                    <ul>
                        { returnStep() }
                    </ul>
                </div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    {
                        step==1 &&
                            <Basic 
                                data={formObject['1']} 
                                status={formObject['status']}
                                categoriesItem={categoriesItem} 
                                onHandleChange={this.onHandleChange.bind(this)}
                            />
                    }
                    {
                        step==2 &&
                            <Cover 
                                data={formObject['2']} 
                                status={formObject['status']}
                                onHandleChange={this.onHandleChange.bind(this)}
                            />
                    }
                    {
                        step==3 &&
                            <Format 
                                data={formObject['3']} 
                                status={formObject['status']}
                                onHandleChange={this.onHandleChange.bind(this)}
                            />
                    }
                    {
                        step==4 &&
                            <Depiction 
                                data={formObject['4']} 
                                status={formObject['status']}
                                onHandleChange={this.onHandleChange.bind(this)}
                            />
                    }
                    {
                        step==5 &&
                            <Freight 
                                data={formObject['5']} 
                                status={formObject['status']}
                                onHandleChange={this.onHandleChange.bind(this)}
                            />
                    }
                    <div className="admin-form-action">
                        <ul>
                            <li>
                                <button type="button" className="cancel" onClick={this.onCancel.bind(this)}>取消</button>
                            </li>
                            {
                                step!=1 &&
                                    <li>
                                        <button type="button" className="basic" onClick={ this.onPrevious.bind(this) }>{lang['zh-TW']['Previous']}</button>
                                    </li>
                            }
                            <li>
                                <button type="submit">{ step!=5? lang['zh-TW']['Submit Next'] : lang['zh-TW']['Finish'] }</button>
                            </li>
                            <li>
                                <Link to="/myvendor/preview/product">預覽</Link>
                            </li>
                        </ul>
                    </div>
                </form>
            </React.Fragment>
        );
    }

    onHandleChange = ( key, val ) => {
        let { formObject } = this.state;
        formObject = { ...formObject, [key]:val }
        this.setState({
            formObject
        })
    }

    onCancel = () => {
        this.props.history.push('/myvendor/categories/product');
    }

    onPrevious = (e) => {
        const { step } = this.state;
        this.setState({
            step: step-1,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { formObject, step, maxStep } = this.state;
        const { match } = this.props;
        const { type } = match['params'];
        console.log( type, formObject[step], step );
        //this.props.dispatch( createProduct( type, formObject[step], step ) );
        this.setState({
            step: step==maxStep? maxStep : step+1,
        })
    }
}