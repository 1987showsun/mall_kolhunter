import React from 'react';
import { connect } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

// Components
import Item from '../../../module/item/product';
import BlockList from '../../../module/blockList';
import Filter from './filter';
import Breadcrumbs from './breadcrumbs';

// Actions
import { ssrStoreProduct, storeProduct } from '../../../actions/store';

// Stylesheets
import './public/stylesheets/style.scss';

// Images
import coverBG from './public/images/channels4_banner.jpg';

const demoData = [
    {
        id: "62c08bab8215b25e9d90",
        image: "https://static.kolhunter.com/vendor/product/2019/08/01/62c08bab8215b25e9d90/1e970396a108ec33501d3bf4d853539f.png",
        name: "test",
        price: 123123,
        sellPrice: 123123
    },
    {
        id: "5dba306c43d2bbd55024",
        image: "https://static.kolhunter.com/vendor/product/2019/07/31/5dba306c43d2bbd55024/582c047b1a0f878e225e9b109d990fc2.png",
        name: "test",
        price: 123,
        sellPrice: 123123
    },
    {
        id: "47a10f5fed64d49fd5db",
        image: "https://static.kolhunter.com/vendor/product/2019/08/01/47a10f5fed64d49fd5db/8b02601955efaa8a9a54d147df9fd193.png",
        name: "test",
        price: 123,
        sellPrice: 123
    },
    {
        id: "75f0a44df069df7907fb",
        image: "https://static.kolhunter.com/vendor/product/2019/08/01/75f0a44df069df7907fb/1e69475e68faf2164ecc478666ed918f.png",
        name: "test",
        price: 123,
        sellPrice: 123
    },
    {
        id: "1c500c3e6edd33d4ff59",
        image: "https://static.kolhunter.com/vendor/product/2019/08/01/1c500c3e6edd33d4ff59/b1243ebc56994d0b7d2a458f19c6dc83.png",
        name: "test",
        price: 123,
        sellPrice: 123
    },
    {
        id: "0f95de6062898487ad89",
        image: "https://static.kolhunter.com/vendor/product/2019/07/31/0f95de6062898487ad89/3907a6bb44709f7006d127e786dcc391.png",
        name: "test",
        price: 123,
        sellPrice: 123
    }
]

class Index extends React.Component{

    // static initialAction( NODE_ENV,pathname,query ) {
    //     return ssrStoreProduct( NODE_ENV,pathname,query );
    // }

    constructor(props){
        super(props);
        this.state = {
            data: demoData
        }
    }

    render(){

        const { match, location } = this.props;
        const { data } = this.state;

        return(
            <React.Fragment>
                <div className="row store-cover-wrap">
                    <div className="store-cover-background-img" style={{backgroundImage: `url(${coverBG})`}}></div>
                    <section className="container store-cover">
                        <figure>
                            <div className="figure-img">
                                <img src="https://static.kolhunter.com/kol/cyberImg-1429.jpg" alt="" title="" />
                            </div>
                            <figcaption>
                                <div className="figcaption-row">
                                    <ul className="figcaption-info-ul">
                                        <li>
                                            <div className="figcaption-ul-head">總成交數</div>
                                            <div className="figcaption-ul-content">
                                                <CurrencyFormat value={13456981} displayType={'text'} thousandSeparator={true} />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="figcaption-ul-head">商品總數</div>
                                            <div className="figcaption-ul-content">
                                                <CurrencyFormat value={2456981} displayType={'text'} thousandSeparator={true} />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="figcaption-row">
                                    <ul className="figcaption-action-ul">
                                        <li><button type="button">個人頁面</button></li>
                                        <li><button type="button">與他合作</button></li>
                                    </ul>
                                </div>
                            </figcaption>
                        </figure>
                    </section>
                </div>
                <div className="row">
                    <section className="container main-content">
                        <Filter
                            match= {match}
                            location= {location}
                        />
                        <section className="container-col" data-flexdirection="column" >
                            <Breadcrumbs />
                            <BlockList className="product-card">
                                {
                                    data.map( item => {
                                        return(
                                            <li key={item['id']}>
                                                <Item path={`/detail/${item['id']}?store=store_id`} data={item}/>
                                            </li>
                                        )
                                    })
                                }
                            </BlockList>
                        </section>
                    </section>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { location, match } = this.props;
        const { pathname, search } = location;
        this.props.dispatch( storeProduct( pathname,search ) );
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Index );