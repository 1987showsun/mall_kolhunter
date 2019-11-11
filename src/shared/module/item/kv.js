/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';

export default class Kv extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data : props.data
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { data } = this.state;
        return String(data['url'])!=String(nextProps.data['url']);
    }

    render(){

        const { data } = this.state;

        return(
            <div className="slider-item">
                <a href={data['url']} target="_blank">
                    <img src={data['image']} alt={data['title']} title={data['title']} />
                </a>
            </div>
        );
    }
}