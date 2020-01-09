/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React,{ useState, useEffect } from 'react';

import kvNullImage from '../../public/images/init/1000x427initKvImages.jpg';

export default ({data})=>{

    const [ stateData, setData ] = useState({
        url   : '',
        title : '',
        image : kvNullImage,
    })

    useEffect(()=>{
        setData({...data});
    },[data]);

    return(
        <div className="slider-item">
            <a href={stateData['url']} target="_blank">
                <img src={stateData['image']} alt={stateData['title']} title={stateData['title']} />
            </a>
        </div>
    );
}