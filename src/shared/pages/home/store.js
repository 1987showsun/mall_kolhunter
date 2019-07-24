import React from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

// Components
import Slider from '../../module/slider';

export default class Store extends React.Component{
    render(){

        const settings = {
            className: "slider-nromal store-wrap",
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 6,
            initialSlide: 0,
            responsive: [
              {
                breakpoint: 1280,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 5,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 720,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  initialSlide: 3
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2
                }
              }
            ]
          };

        return(
            <div className="row">
                <section className="container" data-direction="column" >
                    <div className="unit">
                        <div className="block-title">
                            <h2>熱門網紅店家</h2>
                        </div>
                        <Slider settings={settings}>
                            <figure>
                                <div className="card-item-img">
                                    <img src="https://static.kolhunter.com/kol/235/20190703/90d5b6148eb40ee9ae2f523d962a37a6.jpeg" alt="" title="" />
                                </div>
                                <figcaption>
                                    <div className="figcaption-row">
                                        <h3><Link to="">飆捍-館長成吉思汗</Link></h3>
                                    </div>
                                    <div className="figcaption-row" data-content="space-between">
                                        <div className="label">品項數</div>
                                        <div className="value">
                                            <CurrencyFormat value="246981" displayType={'text'} thousandSeparator={true} />
                                        </div>
                                    </div>
                                    <div className="figcaption-row" data-content="space-between">
                                        <div className="label">累計銷量</div>
                                        <div className="value">
                                            <CurrencyFormat value="12456981" displayType={'text'} thousandSeparator={true} />
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>
                            <figure>
                                <div className="card-item-img">
                                    <img src="https://static.kolhunter.com/kol/cyberImg-2875.jpg" alt="" title="" />
                                </div>
                                <figcaption>
                                    <div className="figcaption-row">
                                        <h3><Link to="">在不瘋狂就等死</Link></h3>
                                    </div>
                                    <div className="figcaption-row" data-content="space-between">
                                        <div className="label">品項數</div>
                                        <div className="value">
                                            <CurrencyFormat value="2456981" displayType={'text'} thousandSeparator={true} />
                                        </div>
                                    </div>
                                    <div className="figcaption-row" data-content="space-between">
                                        <div className="label">累計銷量</div>
                                        <div className="value">
                                            <CurrencyFormat value="2456981" displayType={'text'} thousandSeparator={true} />
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>
                            <figure>
                                <div className="card-item-img">
                                    <img src="https://static.kolhunter.com/kol/cyberImg-644.jpg" alt="" title="" />
                                </div>
                                <figcaption>
                                    <div className="figcaption-row">
                                        <h3><Link to="">這群人TGOP</Link></h3>
                                    </div>
                                    <div className="figcaption-row" data-content="space-between">
                                        <div className="label">品項數</div>
                                        <div className="value">
                                            <CurrencyFormat value="2456981" displayType={'text'} thousandSeparator={true} />
                                        </div>
                                    </div>
                                    <div className="figcaption-row" data-content="space-between">
                                        <div className="label">累計銷量</div>
                                        <div className="value">
                                            <CurrencyFormat value="2456981" displayType={'text'} thousandSeparator={true} />
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>
                            <figure>
                                <div className="card-item-img">
                                    <img src="https://static.kolhunter.com/kol/cyberImg-1429.jpg" alt="" title="" />
                                </div>
                                <figcaption>
                                    <div className="figcaption-row">
                                        <h3><Link to="">蔡阿嘎</Link></h3>
                                    </div>
                                    <div className="figcaption-row" data-content="space-between">
                                        <div className="label">品項數</div>
                                        <div className="value">
                                            <CurrencyFormat value="2456981" displayType={'text'} thousandSeparator={true} />
                                        </div>
                                    </div>
                                    <div className="figcaption-row" data-content="space-between">
                                        <div className="label">累計銷量</div>
                                        <div className="value">
                                            <CurrencyFormat value="2456981" displayType={'text'} thousandSeparator={true} />
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>
                            <figure>
                                <div className="card-item-img">
                                    <img src="https://static.kolhunter.com/kol/cyberImg-2366.jpg" alt="" title="" />
                                </div>
                                <figcaption>
                                    <div className="figcaption-row">
                                        <h3><Link to="">Sandy & Mandy</Link></h3>
                                    </div>
                                    <div className="figcaption-row" data-content="space-between">
                                        <div className="label">品項數</div>
                                        <div className="value">
                                            <CurrencyFormat value="2456981" displayType={'text'} thousandSeparator={true} />
                                        </div>
                                    </div>
                                    <div className="figcaption-row" data-content="space-between">
                                        <div className="label">累計銷量</div>
                                        <div className="value">
                                            <CurrencyFormat value="2456981" displayType={'text'} thousandSeparator={true} />
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>
                            <figure>
                                <div className="card-item-img">
                                    <img src="https://static.kolhunter.com/kol/cyberImg-2366.jpg" alt="" title="" />
                                </div>
                                <figcaption>
                                    <div className="figcaption-row">
                                        <h3><Link to="">Sandy & Mandy</Link></h3>
                                    </div>
                                    <div className="figcaption-row" data-content="space-between">
                                        <div className="label">品項數</div>
                                        <div className="value">
                                            <CurrencyFormat value="56981" displayType={'text'} thousandSeparator={true} />
                                        </div>
                                    </div>
                                    <div className="figcaption-row" data-content="space-between">
                                        <div className="label">累計銷量</div>
                                        <div className="value">
                                            <CurrencyFormat value="2456981" displayType={'text'} thousandSeparator={true} />
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>
                        </Slider>
                    </div>
                </section>
            </div>
        );
    }
}