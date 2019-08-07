import React from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

// Components
import Slider from '../../module/slider';
import StroeItem from '../../module/item/store';

export default class Store extends React.Component{
    render(){

        const settings = {
            className: "slider-nromal store-wrap",
            dots: false,
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
                  slidesToScroll: 5
                }
              },
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4
                }
              },
              {
                breakpoint: 720,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
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
                            <StroeItem path={`/store/store_id`}/>
                            <StroeItem path={`/store/store_id`}/>
                            <StroeItem path={`/store/store_id`}/>
                            <StroeItem path={`/store/store_id`}/>
                            <StroeItem path={`/store/store_id`}/>
                            <StroeItem path={`/store/store_id`}/>
                            <StroeItem path={`/store/store_id`}/>
                            <StroeItem path={`/store/store_id`}/>
                            <StroeItem path={`/store/store_id`}/>
                            <StroeItem path={`/store/store_id`}/>
                            <StroeItem path={`/store/store_id`}/>
                            <StroeItem path={`/store/store_id`}/>
                            <StroeItem path={`/store/store_id`}/>
                            <StroeItem path={`/store/store_id`}/>
                            <StroeItem path={`/store/store_id`}/>
                        </Slider>
                    </div>
                </section>
            </div>
        );
    }
}