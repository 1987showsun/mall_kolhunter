/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React               from 'react';

// Modules
import Slider              from '../../../module/slider';
import KvSlider            from '../../../module/item/kv';

// Setup
import { kvSlider }        from '../public/set/slider';


export default ({ data }) => {
  return(
    <div className="row kv-wrap">
      <Slider settings={kvSlider} >
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