/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React, { useState, useEffect } from 'react';
import $     from 'jquery';
import { FontAwesomeIcon }               from '@fortawesome/react-fontawesome';
import { faChevronUp }                   from '@fortawesome/free-solid-svg-icons';

// Stylesheets
import './public/stylesheets/style.scss';

export default () => {

    const [stateSticky, setSticky] = useState(false);

    useEffect(()=>{
        $(window).scroll(function(){
            const win_H     = $(window).height();
            const scrollTop = $(this).scrollTop();
            if( scrollTop>win_H ){
                setSticky(true);
            }else{
                setSticky(false);
            }
        })
    },[stateSticky]);

    return(
        <>
            {
                stateSticky &&
                    <button className="sticky" onClick={()=>{$("html, body").animate({scrollTop:0}),300}}>
                        <FontAwesomeIcon icon={faChevronUp}/>
                    </button>
            }
        </>
    );
}