/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

import React from 'react';

// Modules
import Loading                               from '../../../../../module/loading';

// Lang
import lang                                  from '../../../../../public/lang/lang.json';

// images
import kolhunterlogo                         from '../../../../../public/images/kolhunter_logo.jpg';

export default ({data, loading}) => {

    const { photo=kolhunterlogo, name='網紅電商', celebName, celebToken  } = data;
    
    return(
        <div className="detail-cover-row cover-select">
            <label>{lang['zh-TW']['label']['by store']}</label>
            <a className="detail-store-wrap" href={`https://www.kolhunter.com/celebrity/info/${celebName||''}/${celebToken||''}`} target="_blank">
                <div className="img">
                    <img src={photo} alt={name} title="" />
                </div>
                <div className="name">
                    <h3 dangerouslySetInnerHTML={{__html: name}} />
                </div>
                <Loading loading={loading}/>
            </a>
        </div>
    );
}