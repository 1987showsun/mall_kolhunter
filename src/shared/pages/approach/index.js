import React from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";

// Components
import Search from './search';
import Breadcrumbs from './breadcrumbs';

// Modules
import CoverSlider from '../../module/coverSlider';
import BlockList from '../../module/blockList';
import StoreItem from '../../module/item/store';

// Actions
import { ssrApproachProduct, mallApproachProduct } from '../../actions/categories';

// Lang
import lang from '../../public/lang/lang.json';

// Stylesheets
import './public/stylesheets/style.scss';

const demo = [
    {storeName: "Store A", celebName: null, id: "f63d87094b7e948d2b5f", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 5},
    {storeName: "Store B", celebName: null, id: "30c626d028898297de32", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
    {storeName: "Store C", celebName: null, id: "c586f6013377119aebf0", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
    {storeName: "Store D", celebName: null, id: "078da2cdeb703149eba3", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
    {storeName: "Store E", celebName: null, id: "82f24beed8161a3c8e0e", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
    {storeName: "Store F", celebName: null, id: "1cb1022a146e32956c95", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
    {storeName: "Store G", celebName: null, id: "d7068406800c5ca474fb", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
    {storeName: "Store H", celebName: null, id: "e8f222f1830fea82874a", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
    {storeName: "Store I", celebName: null, id: "712655c53fb66de05056", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
    {storeName: "Store J", celebName: null, id: "99250f24900ef7a1569f", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
    {storeName: "Store K", celebName: null, id: "779df62ece0e17c33e1d", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
    {storeName: "Store L", celebName: null, id: "058d7b540728b2d89049", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
    {storeName: "Store M", celebName: null, id: "8f9ccca0424b13596bbd", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
    {storeName: "Store N", celebName: null, id: "5d0bf4701a0dca17be07", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0}
  ]

class Index extends React.Component{

    static initialAction( NODE_ENV,pathname,query ){
        const pathnameArray = pathname.split('/').filter( item => item!="" );
        query = { ...query, productToken: pathnameArray[1] };
        return ssrApproachProduct(NODE_ENV,pathname,{ ...query, productToken: pathnameArray[1] });
    }

    constructor(props){
        super(props);
        this.state = {
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
            imageData: [],
            info: {
                token: "",
                name: "",
                images: [],
                description: [],
                delivery: [],
                spec: [],
                onSale: false,
                price: 0,
                sellPrice: 0
            }
        }
    }

    static getDerivedStateFromProps( props,state ){
        return {
            imageData: props.images.map( item => {
                return item['path'];
            }),
            info: {
                ...state.info,
                token: props.token,
                name: props.name,
                images: props.images,
                description: props.description,
                delivery: props.delivery,
                spec: props.spec,
                onSale: props.onSale,
                price: props.price,
                sellPrice: props.sellPrice
            }
        }
    }

    render(){

        const { match } = this.props;
        const { 
            info,
            imageData, 
            mainSettings, 
            navSettings, 
        } = this.state;
        const { name } = info;

        return(
            <React.Fragment>
                <Helmet encodeSpecialCharacters={false}>
                    <title>{`網紅電商 - ${info['name']}`}</title>
                    <meta name="keywords" content={`網紅電商 - ${info['name']}`} />
                </Helmet>
                <div className="row">
                    <section className="container approach-content" >
                        <div className="container-col left">
                            <div className="container-row unit">
                                <CoverSlider 
                                    data= {imageData}
                                    mainSettings= {mainSettings}
                                    navSettings= {navSettings}
                                />
                            </div>
                            <div className="container-row unit">
                                <h1>{name}</h1>
                            </div>
                            <div className="container-row unit">
                                <Link to={`/detail/${match['params']['id']}`} className="buy-now">{lang['zh-TW']['button']['watch the product introduction now']}</Link> 
                            </div>
                        </div>
                        <div className="container-col right">
                            <Breadcrumbs />
                            <div className="container-row unit">
                                <div className="unit-head approach">
                                    <h4>{lang['zh-TW']['choose which store you want to buy this item from']}</h4>
                                </div>
                                <Search />
                                <BlockList className="store-card">
                                    {
                                        demo.map( (item,i) => {
                                            return(
                                                <li key={item['id']}>
                                                    <StoreItem path={`/detail/${match['params']['id']}?storeID=store_id`} data={item} />
                                                </li>
                                            )
                                        })
                                    }
                                </BlockList>
                            </div>
                        </div>
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

        });
    }
}

const mapStateToProps = state => {
    return{
        ...state.approach
    }
}

export default connect( mapStateToProps )( Index );