/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React, { useState, useEffect }   from 'react';
import Slider                           from "react-slick";

// Modules
import KvSlider                         from '../../../module/item/kv';

// Setup
import { kvSlider }                     from '../public/set/slider';

// Images
import kvNullImage                      from '../../../public/images/init/1000x427initKvImages.jpg';

export default ({ data }) => {
  return(
    <div className="row kv-wrap">
      <Slider {...kvSlider} >
        {
          data.map( (item,i) => {
            return(
              <KvSlider key={i} data={item}/>
            )
          })
        }
      </Slider>
    </div>
  );
}