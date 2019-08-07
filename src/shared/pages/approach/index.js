import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import CoverSlider from '../../module/coverSlider';
import Breadcrumbs from './breadcrumbs';
import Search from './search';
import BlockList from '../../module/blockList';
import StoreItem from '../../module/item/store';

// Stylesheets
import './public/stylesheets/style.scss';

class Index extends React.Component{

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
            data: [
                'https://s.yimg.com/zp/MerchandiseImages/2DBEC82AC9-SP-6083929.jpg',
                'https://s.yimg.com/zp/MerchandiseImages/91B59BC34D-SP-6083929.jpg',
                'https://s.yimg.com/zp/MerchandiseImages/39B9537090-SP-6083929.jpg',
                'https://s.yimg.com/zp/MerchandiseImages/4989B0E6E7-SP-6083929.jpg',
                'https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg'
            ]
        }
    }

    render(){

        const { 
            data, 
            mainSettings, 
            navSettings, 
        } = this.state;

        return(
            <React.Fragment>
                <div className="row">
                    <section className="container approach-content" >
                        <div className="container-col left">
                            <div className="container-row unit">
                                <CoverSlider 
                                    data= {data}
                                    mainSettings= {mainSettings}
                                    navSettings= {navSettings}
                                />
                            </div>
                            <div className="container-row unit">
                                <h1>盛夏必備涼感單品．棉麻舒適抽繩短褲</h1>
                            </div>
                            <div className="container-row unit">
                                <Link to={`/detail/p_id`} className="buy-now">立即觀看商品介紹</Link> 
                            </div>
                        </div>
                        <div className="container-col right">
                            <Breadcrumbs />
                            <div className="container-row unit">
                                <div className="unit-head">
                                    <h4>選擇您喜歡的網紅店舖購買</h4>
                                </div>
                                <Search />
                                <BlockList className="store-card">
                                    <li>
                                        <StoreItem path={`/detail/p_id?store=store_id`}/>
                                    </li>
                                    <li>
                                        <StoreItem path={`/detail/p_id?store=store_id`}/>
                                    </li>
                                    <li>
                                        <StoreItem path={`/detail/p_id?store=store_id`}/>
                                    </li>
                                    <li>
                                        <StoreItem path={`/detail/p_id?store=store_id`}/>
                                    </li>
                                    <li>
                                        <StoreItem path={`/detail/p_id?store=store_id`}/>
                                    </li>
                                    <li>
                                        <StoreItem path={`/detail/p_id?store=store_id`}/>
                                    </li>
                                    <li>
                                        <StoreItem path={`/detail/p_id?store=store_id`}/>
                                    </li>
                                </BlockList>
                            </div>
                        </div>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Index );