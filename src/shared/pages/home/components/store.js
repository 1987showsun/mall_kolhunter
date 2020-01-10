/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                    from 'react';
import Slider                   from "react-slick";
import { Link }                 from 'react-router-dom';
import { FontAwesomeIcon }      from '@fortawesome/react-fontawesome';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

// Modules
import StroeItem                from '../../../module/item/store';

// Set
import { storeSlider }          from '../public/set/slider';

export default ({ data }) => {
  return(
    <div className="row">
      <section className="container" data-direction="column" style={{paddingTop: '10px'}}>
          <div className="unit">
            <div className="block-title">
              <h2>精選店舖</h2>
              <Link to="/store">
                觀看更多
                <i><FontAwesomeIcon icon={faChevronCircleRight} /></i>
              </Link>
            </div>
            <Slider {...storeSlider}>
              {
                data.map( (item,i) => {
                  return <StroeItem key={i} path={`/store/${item['id']}`} data={item}/>
                })
              }
            </Slider>
          </div>
      </section>
    </div>
  );
}