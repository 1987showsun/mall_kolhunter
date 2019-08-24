import React from 'react';
import { Link } from 'react-router-dom';

// Modules
import Slider from '../../module/slider';
import StroeItem from '../../module/item/store';

const demo = [
  {storeName: "Store A", celebName: null, id: "f63d87094b7e948d2b5f", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 5},
  {storeName: "Store B", celebName: null, id: "30c626d028898297de32", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
  {storeName: "Store C", celebName: null, id: "c586f6013377119aebf0", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
  {storeName: "Store D", celebName: null, id: "078da2cdeb703149eba3", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
  {storeName: "Store E", celebName: null, id: "82f24beed8161a3c8e0e", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
  {storeName: "Store F", celebName: null, id: "1cb1022a146e32956c95", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
  // {storeName: "Store G", celebName: null, id: "d7068406800c5ca474fb", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
  // {storeName: "Store H", celebName: null, id: "e8f222f1830fea82874a", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
  // {storeName: "Store I", celebName: null, id: "712655c53fb66de05056", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
  // {storeName: "Store J", celebName: null, id: "99250f24900ef7a1569f", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
  // {storeName: "Store K", celebName: null, id: "779df62ece0e17c33e1d", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
  // {storeName: "Store L", celebName: null, id: "058d7b540728b2d89049", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
  // {storeName: "Store M", celebName: null, id: "8f9ccca0424b13596bbd", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0},
  // {storeName: "Store N", celebName: null, id: "5d0bf4701a0dca17be07", image: "https://static.kolhunter.com/vendor/product/2019/0…cb7b82141e2e/9cb362aecf260ba5564b1182905ac16d.jpg", productCount: 0}
]

export default class Store extends React.Component{
  render(){
    const settings = {
        className: "slider-nromal store-card",
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
              arrows: false,
              slidesToShow: 3.2,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 600,
            settings: {
              arrows: false,
              slidesToShow: 2.2,
              slidesToScroll: 2
            }
          }
        ]
      };

    return(
        <div className="row">
            <section className="container" data-direction="column" style={{paddingTop: '10px'}}>
                <div className="unit">
                    <div className="block-title">
                        <h2>熱門網紅店家</h2>
                    </div>
                    <Slider settings={settings}>
                        {
                          demo.map( (item,i) => {
                            return <StroeItem key={item['id']} path={`/store/store_id`} data={item}/>
                          })
                        }
                        {/* <div className="seeMore">
                          <Link to="/store">
                            <span className="icon"></span>
                            <span>查看全部</span>
                          </Link>
                        </div> */}
                    </Slider>
                </div>
            </section>
        </div>
    );
  }
}