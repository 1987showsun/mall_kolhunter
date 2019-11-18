/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                                       from 'react';
import queryString                                 from 'query-string';
import { connect }                                 from 'react-redux';
import { Helmet }                                  from "react-helmet";

// Components
import Cover                                       from './components/cover';
import Description                                 from './components/description';

// Actions
import { ssrApproachProduct, mallApproachProduct } from '../../actions/categories';

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
            info                 : {
                token              : "",
                name               : "",
                celebrityNum       : 0,
                images             : [],
                description        : [],
                delivery           : [],
                spec               : [],
                onSale             : false,
                price              : 0,
                sellPrice          : 0
            }
        }
    }

    static getDerivedStateFromProps( props,state ){
        return {
            imageData: props.images,
            info: {
                ...state.info,
                token              : props.token,
                name               : props.name,
                celebrityNum       : props.celebrityNum,
                images             : props.images,
                description        : props.description,
                delivery           : props.delivery,
                spec               : props.spec,
                onSale             : props.onSale,
                price              : props.price,
                sellPrice          : props.sellPrice
            }
        }
    }

    render(){

        const { location, match, history } = this.props;
        const { imageData, info }          = this.state;
        const { description }              = info;

        return(
            <React.Fragment>
                <Helmet encodeSpecialCharacters={false}>
                    <title>{`網紅電商 KOL Mall | 網紅來幫你 - ${info['name']}`}</title>
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
                                        match= {match}
                                        history= {history}
                                        location= {location}
                                        data= {info}
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
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { location, match } = this.props;
        const { pathname, search } = location;
        const query = {
            ...queryString.parse( search ),
            productToken: match['params']['id'] || ""
        }
        this.props.dispatch( mallApproachProduct( pathname, query ) ).then( res => {
            this.setState({
                info: {
                    ...this.state.info,
                    token: res['data']['token'],
                    name: res['data']['name'],
                    celebrityNum: res['data']['celebrityNum'],
                    images: res['data']['images'],
                    description: res['data']['description'],
                    delivery: res['data']['delivery'],
                    spec: res['data']['spec'],
                    onSale: res['data']['onSale'],
                    price: res['data']['price'],
                    sellPrice: res['data']['sellPrice']
                }
            })
        });
    }
}

const mapStateToProps = state => {
    return{
        ...state.approach
    }
}

export default connect( mapStateToProps )( Index );