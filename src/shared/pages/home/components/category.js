/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';
import { Link } from 'react-router-dom';

// Modules
import Slider from '../../../module/slider';

// Set
import { categorySlider } from '../public/set/slider';

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
                                                <img src={item['imagePath']} alt="" title="" />
                                            </div>
                                            <figcaption>
                                                <h3>{item['title']}</h3>
                                            </figcaption>
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