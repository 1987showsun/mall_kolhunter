import React from 'react';
import Slider from "react-slick";

import './style.scss';

export default class Index extends React.Component{
    render(){
        return(
            <Slider {...this.props.settings}>
                {this.props.children}
            </Slider>
        );
    }
}

