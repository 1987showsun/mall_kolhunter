import React from 'react';
import { Link } from 'react-router-dom';

// Modules
import Slider from '../../module/slider';

export default class Category extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: props.data
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            data: props.data
        }
    }

    render(){
        const { data } = this.state;
        const settings = {
            className: "category-wrap",
            centerMode: false,
            infinite: false,
            dots: true,
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
                    slidesPerRow: 4
                  }
                }
            ]
        };

        return(
            <div className="row category-wrap">
                <section className="container" data-direction="column" >
                    <div className="unit">
                        <Slider settings={settings}>
                            {
                                data.map( item => {
                                    return(
                                        <figure key={item['id']}>
                                            <Link to={`/categories/${item['id']}`} />
                                            <div className="category-figure-img">
                                                <img src="https://cf.shopee.tw/file/17f3879a1872099681d7b85101e187db_tn" alt="" title="" />
                                            </div>
                                            <figcaption>{item['title']}</figcaption>
                                        </figure>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </section>
            </div>
        );
    }
}