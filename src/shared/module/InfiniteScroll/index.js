/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import $                   from 'jquery';

export default ({children, scrollBlock="root", className="", hasMore=false, loadMore}) => {

    const infinite                   = useRef(null);
    const [stateHasMore, setHasMore] = useState(hasMore)
    
    useEffect(()=>{
        const { current }    = infinite;
        const test = () => {
            $('#root').scroll(function(){
                const currentTop    = $(current).offset().top;
                const currentBlockH = $(current).height();
                const parentBlockH  = $(scrollBlock).height();
                if( currentBlockH+currentTop<=parentBlockH ){
                    if( loadMore!=undefined ){
                        loadMore(true);
                    }
                }
            })
        }
        test();
        return test();
        
    },[stateHasMore]);

    return(
        <div ref={infinite} className={`infinite-scroll-wrap ${className}`}>
            {children}
        </div>
    );
}