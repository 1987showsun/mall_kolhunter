/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

import React,{ useState, useEffect }   from 'react';
import Slider                          from "react-slick";

import './style.scss';

export default ({children, settings}) => {
    return(
        <Slider {...settings}>
            {children}
        </Slider>
    );
}