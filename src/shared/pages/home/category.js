import React from 'react';

// Components
import Slider from '../../module/slider';

export default class Category extends React.Component{
    render(){

        const settings = {
            className: "category-wrap",
            centerMode: false,
            infinite: false,
            centerPadding: "60px",
            slidesToShow: 1,
            speed: 500,
            rows: 2,
            slidesPerRow: 10,
            responsive: [
                {
                  breakpoint: 1280,
                  settings: {
                    centerPadding: "0px",
                    slidesPerRow: 10
                  }
                },
                {
                  breakpoint: 1024,
                  settings: {
                    centerPadding: "0px",
                    slidesPerRow: 8,
                  }
                },
                {
                    breakpoint: 820,
                    settings: {
                      centerPadding: "0px",
                      slidesPerRow: 7,
                    }
                  },
                {
                  breakpoint: 720,
                  settings: {
                    centerPadding: "0px",
                    slidesPerRow: 6,
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    centerPadding: "0px",
                    slidesPerRow: 4
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    centerPadding: "0px",
                    slidesPerRow: 3
                  }
                }
            ]
          };

        return(
            <div className="row category-wrap">
                <section className="container" data-direction="column" >
                    <div className="unit">
                        <Slider settings={settings}>
                            <figure>
                                <div className="category-figure-img">
                                    <img src="https://cf.shopee.tw/file/17f3879a1872099681d7b85101e187db_tn" alt="" title="" />
                                </div>
                                <figcaption>女生衣著</figcaption>
                            </figure>
                            <figure>
                                <div className="category-figure-img">
                                    <img src="https://cf.shopee.tw/file/227ec8335e695172de26c637ec8f8697_tn" alt="" title="" />
                                </div>
                                <figcaption>美妝保健</figcaption>
                            </figure>
                            <figure>
                                <div className="category-figure-img">
                                    <img src="https://cf.shopee.tw/file/64ee86afd347eae0cb20279aa1c8e878_tn" alt="" title="" />
                                </div>
                                <figcaption>嬰幼童與母親</figcaption>
                            </figure>
                            <figure>
                                <div className="category-figure-img">
                                    <img src="https://cf.shopee.tw/file/dfaf1340a3440f2f664278081d909d45_tn" alt="" title="" />
                                </div>
                                <figcaption>居家生活</figcaption>
                            </figure>
                            <figure>
                                <div className="category-figure-img">
                                    <img src="https://cf.shopee.tw/file/24bc8017d2628d023b171825f081ec06_tn" alt="" title="" />
                                </div>
                                <figcaption>女生配件</figcaption>
                            </figure>
                            <figure>
                                <div className="category-figure-img">
                                    <img src="https://cf.shopee.tw/file/49dd854cf0f455b275d9e8dccae218f9_tn" alt="" title="" />
                                </div>
                                <figcaption>女鞋</figcaption>
                            </figure>
                            <figure>
                                <div className="category-figure-img">
                                    <img src="https://cf.shopee.tw/file/274d5b49c36e9eb47484535823cf42af_tn" alt="" title="" />
                                </div>
                                <figcaption>女生包包/精品</figcaption>
                            </figure>
                            <figure>
                                <div className="category-figure-img">
                                    <img src="https://cf.shopee.tw/file/f7ea5e16b692ede244bf6d54058ddf1a_tn" alt="" title="" />
                                </div>
                                <figcaption>美食、伴手禮</figcaption>
                            </figure>
                            <figure>
                                <div className="category-figure-img">
                                    <img src="https://cf.shopee.tw/file/253830d7b66ebfc16b976c2f26643fa8_tn" alt="" title="" />
                                </div>
                                <figcaption>寵物</figcaption>
                            </figure>
                            <figure>
                                <div className="category-figure-img">
                                    <img src="https://cf.shopee.tw/file/24c20644f3e7ec92c9e21d149d994897_tn" alt="" title="" />
                                </div>
                                <figcaption>服務、票券</figcaption>
                            </figure>
                            <figure>
                                <div className="category-figure-img">
                                    <img src="https://cf.shopee.tw/file/71fa5b118eb60cabe38caa3cae4a8c93_tn" alt="" title="" />
                                </div>
                                <figcaption>男生衣著</figcaption>
                            </figure>
                            <figure>
                                <div className="category-figure-img">
                                    <img src="https://cf.shopee.tw/file/508706d0720263ce8ee415bce40d0d33_tn" alt="" title="" />
                                </div>
                                <figcaption>手機平板與周邊</figcaption>
                            </figure>
                            <figure>
                                <div className="category-figure-img">
                                    <img src="https://cf.shopee.tw/file/9326868176f0878a0b03ae278d82f0d6_tn" alt="" title="" />
                                </div>
                                <figcaption>3C</figcaption>
                            </figure>
                            <figure>
                                <div className="category-figure-img">
                                    <img src="https://cf.shopee.tw/file/c000a3e95e7adc783826b992dbe2a5f7_tn" alt="" title="" />
                                </div>
                                <figcaption>家電影音</figcaption>
                            </figure>
                            <figure>
                                <div className="category-figure-img">
                                    <img src="https://cf.shopee.tw/file/e9815e64e65bde8f8fa4a4fe367423c2_tn" alt="" title="" />
                                </div>
                                <figcaption>男生包包與配件</figcaption>
                            </figure>
                            <figure>
                                <div className="category-figure-img">
                                    <img src="https://cf.shopee.tw/file/8d53bfc3ea2a689d2885cf9977cfcaab_tn" alt="" title="" />
                                </div>
                                <figcaption>男鞋</figcaption>
                            </figure>
                            <figure>
                                <div className="category-figure-img">
                                    <img src="https://cf.shopee.tw/file/cda34cfd1235b787c2f6b378c906ebb7_tn" alt="" title="" />
                                </div>
                                <figcaption>戶外與運動用品</figcaption>
                            </figure>
                            <figure>
                                <div className="category-figure-img">
                                    <img src="https://cf.shopee.tw/file/41e63c17a4e0412883fac61d94592268_tn" alt="" title="" />
                                </div>
                                <figcaption>汽機車零件百貨</figcaption>
                            </figure>
                            <figure>
                                <div className="category-figure-img">
                                    <img src="https://cf.shopee.tw/file/1071d365b731ef6e2619699c3b6d3492_tn" alt="" title="" />
                                </div>
                                <figcaption>娛樂、收藏</figcaption>
                            </figure>
                            <figure>
                                <div className="category-figure-img">
                                    <img src="https://cf.shopee.tw/file/2ce3822327a87bd4e3e96a131e5ea082_tn" alt="" title="" />
                                </div>
                                <figcaption>遊戲王</figcaption>
                            </figure>
                        </Slider>
                    </div>
                </section>
            </div>
        );
    }
}