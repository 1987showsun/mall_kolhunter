/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';

export default ({data})=>{

    const { url, title, image } = data;

    return(
        <div className="slider-item">
            <a href={url} target="_blank">
                <img src={image} alt={title} title={title} />
            </a>
        </div>
    );
}