import React from 'react';
import { Link } from 'react-router-dom';

// Modules
import Slider from '../../module/slider';

// Set
import { categorySlider } from './public/set/slider';

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

        return(
            <div className="row category-wrap">
                <section className="container" data-direction="column" >
                    <div className="unit">
                        <Slider settings={categorySlider}>
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