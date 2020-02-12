/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React, { useState, useEffect }        from 'react';

// Lang
import lang                                  from '../../../../../public/lang/lang.json';

export default (props) => {

    const { formObject, data } = props;
    const { spec, combo }      = data;

    let showSpecs = false
    Object.keys( spec ).map((keys, k_i) => {
        if (spec[keys].length > 1) {
            showSpecs = true;
        }
    })

    if (combo==true && showSpecs==false) {
        return null;
    } else {
        return(
            <>
                {
                    Object.keys( spec ).map((keys, k_i) => {
                        return(
                            <div key={keys} className="detail-cover-row cover-select">
                                <label>
                                    {
                                        combo? (
                                            `${lang['zh-TW']['label']['combo']} ${k_i+1}`
                                        ):(
                                            lang['zh-TW']['label']['size']
                                        )
                                    }
                                </label>
                                <ul className="select-list">
                                    {
                                        spec[keys].map( (item,i) => {
                                            return(
                                                <li key={item['token']}>
                                                    <label htmlFor={`${k_i}_${item['token']}`}>
                                                        <input 
                                                            type          = "radio"
                                                            className     = "variant"
                                                            name          = {`${k_i}`}
                                                            id            = {`${k_i}_${item['token']}`}
                                                            value         = {item['token']}
                                                            onChange      = { e => {
                                                                const { formObject }  = props;
                                                                const { name, value } = e.target;
                                                                let   { specToken }   = formObject;
                                                                specToken[name] = value;
                                                                props.returnSpecToken({...formObject,specToken});
                                                            }}
                                                            checked       = { formObject['specToken'][k_i]==item['token'] }
                                                            disabled      = { item.hasOwnProperty('storage')? item['storage']==0 || false : false }
                                                        />
                                                        <span>
                                                            {item['name']} 
                                                        </span>
                                                    </label>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                        );
                    })
                }
            </>
        );
    }
    
}