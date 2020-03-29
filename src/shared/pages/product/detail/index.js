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

// Skeleton
import SCover                 from '../../../skeleton/detail/cover';

// Modules
import Popup                  from '../../../module/popup';

// Actions
import { ssrApproachProduct } from '../../../actions/categories';

// Images
import up18                   from '../../../public/images/18up.png';

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
                                    <SCover />
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
        window.scrollTo(0, 0);
        const { location, match }  = this.props;
        const { pathname, search } = location;
        this.props.dispatch( ssrApproachProduct(pathname,{ ...queryString.parse(search), productToken: match['params']['id'] || "" }) )
        .then(()=>{
            let { info } = this.props
            let cateString = '';
            info['categories'].map((cate, i)=>{
                if (i!=0) {
                    cateString += '/';
                }
                cateString += cate['name'];
            })
            gtag('event', 'view_item', {
                "items": [
                    {
                        "id": info['token'],
                        "name": info['name'],
                        "category": cateString,
                        "price": info['sellPrice']
                    }
                ]
            });
        })

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
        ...state.approach
    }
}

export default connect( mapStateToProps )( Index );