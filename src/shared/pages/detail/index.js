/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                  from 'react';
import queryString            from 'query-string';
import { connect }            from 'react-redux';
import { Helmet }             from "react-helmet";

// Components
import Cover                  from './components/cover/';
import Description            from './components/description/';

// Modules
import Popup                  from '../../module/popup';

// Actions
import { ssrApproachProduct } from '../../actions/categories';

// Images
import up18                   from '../../public/images/18up.png';

// Stylesheets
import './public/stylesheets/style.scss';

class Index extends React.Component{

    static initialAction( pathname,query ){
        const pathnameArray = pathname.split('/').filter( item => item!="" );
        return ssrApproachProduct(pathname,{ ...query, productToken: pathnameArray[1] });
    }

    constructor(props){
        super(props);
        this.state = {
            imageData            : [],
            info                 : {}
        }
    }

    static getDerivedStateFromProps( props,state ){
        return {
            imageData: props.images,
            info     : props.info
        }
    }

    render(){

        const { location, match, history } = this.props;
        const { imageData, info }          = this.state;
        const { description, adult }       = info;

        return(
            <>

                <Helmet encodeSpecialCharacters={false}>
                    <title>{`網紅電商 KOL Mall | 網紅來幫你賣 - ${info['name']}`}</title>
                    <meta name="keywords"                  content={`網紅電商,網紅獵人,找網紅就是快,幫你賣,電商,網購,網紅`} />
                    <meta name="description"               content={`網紅電商結合時下熱門網紅幫你推銷商品，讓消費者可透過網紅電商用最划算的價格買到所有需要、想要的商品，包含美妝保健、流行服飾配件、母嬰居家、美食旅遊票券、3C家電影音等千萬件熱銷好物等你來選購`} />
                    <meta property="og:url"                content={typeof window!="undefined"? window.location.href:''} />
                    <meta property="og:title"              content={`網紅電商 - ${info['name']}`} />
                    <meta property="og:description"        content={`網紅電商結合時下熱門網紅幫你推銷商品，讓消費者可透過網紅電商用最划算的價格買到所有需要、想要的商品，包含美妝保健、流行服飾配件、母嬰居家、美食旅遊票券、3C家電影音等千萬件熱銷好物等你來選購`} />
                    <meta property="og:image"              content={`${imageData.length>0? imageData[0]['path']:''}`} />
                    {/* Twitter Card data */}
                    <meta name="twitter:title"             content={`網紅電商 - ${info['name']}`} /> 
                    <meta name="twitter:description"       content={`網紅電商結合時下熱門網紅幫你推銷商品，讓消費者可透過網紅電商用最划算的價格買到所有需要、想要的商品，包含美妝保健、流行服飾配件、母嬰居家、美食旅遊票券、3C家電影音等千萬件熱銷好物等你來選購`} /> 
                    <meta name="twitter:creator"           content="sun li" /> 
                    <meta name="twitter:image:src"         content={`${imageData.length>0? imageData[0]['path']:''}`} />
                </Helmet>

                <div className="row">
                    <section className="container detail-content" >
                        <div className="container-row">
                            {
                                info['token']!=""? (
                                    <Cover 
                                        match        = {match}
                                        history      = {history}
                                        location     = {location}
                                        data         = {info}
                                    />
                                ):(
                                    <div className="detail-cover-loading"> Loading... </div>
                                )
                            }
                        </div>                    
                        <Description 
                            name={ info['name'] }
                            data={ description  }
                        />
                    </section>
                </div>
                <Popup 
                    className         = "adultsOnly18"
                    popupStatus       = {typeof window !== 'undefined'? (sessionStorage.getItem('adultsOnly')||adult):(false) }
                    returnPopupStatus = {()=> this.judgeOlder.bind(this,'no')}
                >
                    <div className="popup-head">
                        <img src={up18} alt="" title="" />
                    </div>
                    <div className="popup-content">
                        本區為限制級專區，如未滿18歲請儘速離開謝謝！！
                    </div>
                    <ul className="popup-action">
                        <li><button className="on-the-shelf" onClick={this.judgeOlder.bind(this,'yes')}>我已滿18歲</button></li>
                        <li><button className="in-the-shelf" onClick={this.judgeOlder.bind(this,'no')}>我未滿18歲</button></li>
                    </ul>
                </Popup>
            </>
        );
    }

    componentDidMount() {
        const { location, match }  = this.props;
        const { pathname, search } = location;
        this.props.dispatch( ssrApproachProduct(pathname,{ ...queryString.parse(search), productToken: match['params']['id'] || "" }) );
    }

    judgeOlder = ( actionType ) => {
        const { history } = this.props;
        const { info }    = this.state;
        switch(actionType){
            case 'yes':
                sessionStorage.setItem('adultsOnly',false);
                this.setState({
                    info : { ...info, adult : false }
                });
                break;

            default:
                history.goBack();
                break;
        }
    }
}

const mapStateToProps = state => {
    return{
        info : state.approach,
        ...state.approach,
        // info: {
        //     "token": "TESTCOmboDD",
        //     "name": "【茉愛多】時間軸 - SWELL不鏽鋼保溫水瓶 (兩入任選)",
        //     "price": 4600,
        //     "sellPrice": 4600,
        //     "createTimeMs": 1572608047008,
        //     "modifyTimeMs": 1572608047008,
        //     "onSale": "n",
        //     "adult": true,
        //     "combo": true,
        //     "celebrityNum": 0,
        //     "description": [],
        //     "images": [
        //         {
        //             "path": "https://static.kolhunter.com/vendor/product/2019/11/01/a50e8a46794e94ea9016/70a1c10e1a10353dc321957c74807a44.png",
        //             "sort": 0
        //         },
        //         {
        //             "path": "https://static.kolhunter.com/vendor/product/2019/11/01/a50e8a46794e94ea9016/c5277ec5228c2904b1f0b4989624f8c1.png",
        //             "sort": 1
        //         },
        //         {
        //             "path": "https://static.kolhunter.com/vendor/product/2019/11/01/a50e8a46794e94ea9016/132a3bb8d553d40f7ac90cac58711c6f.png",
        //             "sort": 2
        //         },
        //         {
        //             "path": "https://static.kolhunter.com/vendor/product/2019/11/01/a50e8a46794e94ea9016/30c5abb45e5501234227ccf6367cc4da.png",
        //             "sort": 3
        //         },
        //         {
        //             "path": "https://static.kolhunter.com/vendor/product/2019/11/01/a50e8a46794e94ea9016/44c80eb58172012a4110fdb5740b20e1.png",
        //             "sort": 4
        //         },
        //         {
        //             "path": "https://static.kolhunter.com/vendor/product/2019/11/01/a50e8a46794e94ea9016/775d33fcb0ccacb34976e38c282708a3.png",
        //             "sort": 5
        //         },
        //         {
        //             "path": "https://static.kolhunter.com/vendor/product/2019/11/01/a50e8a46794e94ea9016/e241fbb4c8808ef13017ceea143bab19.png",
        //             "sort": 6
        //         },
        //         {
        //             "path": "https://static.kolhunter.com/vendor/product/2019/11/01/a50e8a46794e94ea9016/6193bbafb14edc4199842334513b18e6.png",
        //             "sort": 7
        //         },
        //         {
        //             "path": "https://static.kolhunter.com/vendor/product/2019/11/01/a50e8a46794e94ea9016/42cb12a94f2cecc675468385cd5de607.png",
        //             "sort": 8
        //         },
        //         {
        //             "path": "https://static.kolhunter.com/vendor/product/2019/11/01/a50e8a46794e94ea9016/61505a3ce481ca2500f837f8fc8a2aa3.png",
        //             "sort": 9
        //         }
        //     ],
        //     "delivery": [],
        //     "spec": [
        //         [
        //             {
        //                 "productName": "【茉愛多】時間軸 - SWELL不鏽鋼保溫水瓶 (白線)",
        //                 "prodoctToken": "e3b4300e9a539b760242",
        //                 "token": "92eea8fc5f2ad2806d28",
        //                 "name": "Peridot  (橄欖石綠色)",
        //                 "storage": 0
        //             },
        //             {
        //                 "productName": "【茉愛多】時間軸 - SWELL不鏽鋼保溫水瓶 (白線)",
        //                 "prodoctToken": "e3b4300e9a539b760242",
        //                 "token": "355145c5aadaf81d9107",
        //                 "name": "Rose quartz (玫瑰粉色)",
        //                 "storage": 0
        //             }
        //         ],
        //         [
        //             {
        //                 "productName": "【茉愛多】時間軸 - SWELL不鏽鋼保溫水瓶 (黑線)",
        //                 "prodoctToken": "f23d11008ee378f42147",
        //                 "token": "20bc36a5df86ba933706",
        //                 "name": "Blaze  (火焰橘紅色)",
        //                 "storage": 1
        //             },
        //             {
        //                 "productName": "【茉愛多】時間軸 - SWELL不鏽鋼保溫水瓶 (黑線)",
        //                 "prodoctToken": "f23d11008ee378f42147",
        //                 "token": "f50061d24c67b8aaff4a",
        //                 "name": "Smokey Eye (煙燻灰色)",
        //                 "storage": 0
        //             }
        //         ]
        //     ]
        // }
    }
}

export default connect( mapStateToProps )( Index );