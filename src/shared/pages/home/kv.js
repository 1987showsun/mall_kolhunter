import React from 'react';

// Components
import Slider from '../../module/slider';

export default class Kv extends React.Component{
    render(){

        const settings = {
            className: "center kv-slider-wrap",
            dots: true,
            centerMode: true,
            infinite: true,
            centerPadding: "14%",
            speed: 500,
            responsive: [
                {
                  breakpoint: 1280,
                  settings: {
                    centerPadding: "0px",
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 1024,
                  settings: {
                    centerPadding: "0px",
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    centerPadding: "0px",
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 420,
                  settings: {
                    centerPadding: "0px",
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
            ]
        };

        return(
            <div className="row">
                <Slider settings={settings} >
                    <div className="slider-item">
                        <img src="https://s.yimg.com/vd/ec-material/shop_tw_shoppingapp/S1-g_b1-f_img-5d319b549af31.jpg" alt="" title="" />
                    </div>
                    <div className="slider-item">
                        <img src="https://s.yimg.com/vd/ec-material/shop_tw_shoppingapp/S1-g_b4-f_img-5d357a36bbb96.jpg" alt="" title="" />
                    </div>
                    <div className="slider-item">
                        <img src="https://s.yimg.com/vd/ec-material/shop_tw_shoppingapp/S1-g_b5-f_img-5d357a5a26f29.jpg" alt="" title="" />
                    </div>
                    <div className="slider-item">
                        <img src="https://s.yimg.com/vd/ec-material/shop_tw_shoppingapp/S2-g_b4-f_img-5d367bf2a992f.jpg" alt="" title="" />
                    </div>
                    <div className="slider-item">
                        <img src="https://s.yimg.com/vd/ec-material/shop_tw_shoppingapp/S2-g_b1-f_img-5d357b4c5c5a8.jpg" alt="" title="" />
                    </div>
                </Slider>
            </div>
        );
    }
}