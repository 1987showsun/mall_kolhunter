import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus, faMinus }from '@fortawesome/free-solid-svg-icons';

// Modules
import CoverSlider from '../../module/coverSlider';

export default class Cover extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: props.data,
            formObject: {
                cartToken: "",
                productToken: props.data['token'],
                productDeliveryID: props.data['delivery'].length!=0? props.data['delivery'][0]['productDeliveryID'] : "",
                specToken: props.data['spec'].length!=0? props.data['spec'][0]['token'] : "",
                itemNumber: 1,
                storeID: ""
            },
            mainSettings: {
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                className: 'cover-slick-block cover-slick-main'
            },
            navSettings: {
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 5,
                slidesToScroll: 5,
                className: 'cover-slick-block cover-slick-nav',
                responsive: [
                    {
                      breakpoint: 1280,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                      }
                    },
                    {
                      breakpoint: 860,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                      }
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    }
                ]
            },
            imageData: props.data['images'].map( item => {
                return item['path'];
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if( nextProps.data!=this.state.data ){
            return true;
        }
        return false;
    }

    render(){

        const { data, imageData, mainSettings, navSettings, formObject } = this.state;

        return(
            <div className="detail-cover-wrap">
                <div className="detail-cover-wrap-col left">
                    <CoverSlider 
                        data= {imageData}
                        mainSettings= {mainSettings}
                        navSettings= {navSettings}
                    />
                </div>
                <div className="detail-cover-wrap-col right">
                    <div className="detail-cover-row cover-title">
                        <h1>{data['name'] || ""}</h1>
                    </div>
                    <div className="detail-cover-row cover-other">
                        <ul className="cover-other-ul">
                            <li>
                                <label>販賣店家家數</label>
                                <div>12</div>
                            </li>
                            <li>
                                <label>已售數量</label>
                                <div>12</div>
                            </li>
                            <li>
                                <label>庫存數量</label>
                                <div>12</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-cover-row cover-money">
                        <div className="cover-money-price">{data['price']}</div>
                        <div className="cover-money-sellPrice">{data['sellPrice']}</div>
                    </div>
                    <div className="detail-cover-row cover-select">
                        <label>運送方式</label>
                        <ul className="select-list">
                            {
                                data['delivery'].map( item => {
                                    return(
                                        <li key={item['productDeliveryID']}>
                                            <label htmlFor={`${item['productDeliveryID']}`}>
                                                <input type="radio" name="productDeliveryID" id={`${item['productDeliveryID']}`} className="variant" value={`${item['productDeliveryID']}`} onChange={this.handleChange.bind(this)} checked={formObject['productDeliveryID']== item['productDeliveryID'] } />
                                                <span>{item['name']}</span>
                                            </label>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="detail-cover-row cover-select">
                        <label>型號 / 尺寸 / 顏色</label>
                        <ul className="select-list">
                            {
                                data['spec'].map( item => {
                                    return(
                                        <li key={item['token']}>
                                            <label htmlFor={`${item['token']}`}>
                                                <input type="radio" name="specToken" id={`${item['token']}`} className="variant" value={`${item['token']}`} onChange={this.handleChange.bind(this)} checked={formObject['specToken']== item['token'] } />
                                                <span>{item['name']}</span>
                                            </label>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="detail-cover-row cover-quantity">
                        <label>數量</label>
                        <div className="quantity-wrap">
                            <button type="button" onClick={this.quantityChange.bind(this,"minus")}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <div className="input-box">
                                <CurrencyFormat value={formObject['itemNumber']} format={this.cardExpiry} thousandSeparator={true} onValueChange={ values => this.handleQuantity.bind(this,values)} />
                            </div>
                            <button type="button" onClick={this.quantityChange.bind(this,"plus")}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </div>
                    <div className="detail-cover-row cover-quantity">
                        <label>購買店家</label>
                        <div>
                            <div className="detail-store-wrap">
                                <div className="img">
                                    <img src="https://static.kolhunter.com/kol/cyberImg-1429.jpg" alt="蔡阿嘎" title="" />
                                </div>
                                <div className="name">
                                    <h3>蔡阿嘎</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="detail-cover-row cover-action">
                        <ul>
                            <li className="add-cart-li"><button type="button" className="add-cart">加入購物車</button></li>
                            <li className="direct-purchase-li"><button type="button" className="direct-purchase">直接購買</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    handleChange = (e) => {
        const name = e.target.name;
        const val = e.target.value;
        let formObject = { ...this.state.formObject, [name]: val }
        if( name=="quantity" ){
            let nu = parseInt(val);
            if( isNaN(nu) || nu<=0 ){
                nu = 1;
            }
            formObject = { ...this.state.formObject, [name]: nu }
        }
        this.setState({
            formObject
        })
    }

    handleQuantity = (values) => {
        this.setState({
            formObject: { ...this.state.formObject, itemNumber: values['value'] }
        })
    }

    quantityChange = ( method ) => {
        const { itemNumMax, formObject } = this.state;
        let itemNum = formObject['itemNum'];
        switch( method ){
            case 'minus':
                // 減
                itemNum<=1? 1 : itemNum--;
                break;

            default:
                // 加
                itemNum>=itemNumMax? itemNumMax : itemNum++;
                break;
        }

        this.setState({
            formObject : { ...formObject, itemNum } 
        },()=>{
            // 更新該商品數量 調用 API 位子
        })
    }

    cardExpiry = ( val ) =>{
        const { itemNumMax } = this.state;
        val = Number( val );
        if( val<=0 ){
            val = 1;
        }else if( val>=itemNumMax ){
            val = itemNumMax;
        } 

        return String(val);
    }
}