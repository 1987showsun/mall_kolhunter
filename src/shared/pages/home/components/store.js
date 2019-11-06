/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                         from 'react';
import { Link }                      from 'react-router-dom';
import { FontAwesomeIcon }           from '@fortawesome/react-fontawesome';
import { faChevronCircleRight }      from '@fortawesome/free-solid-svg-icons';

// Modules
import Slider                        from '../../../module/slider';
import StroeItem                     from '../../../module/item/store';

// Set
import { storeSlider }               from '../public/set/slider';

export default (props) => {
  const { data } = props;
  return(
      <div className="row">
          <section className="container" data-direction="column" style={{paddingTop: '10px'}}>
              <div className="unit">
                  <div className="block-title">
                      <h2>熱門網紅店家</h2>
                      <Link to="/store">
                        查看全部
                        <i><FontAwesomeIcon icon={faChevronCircleRight} /></i>
                      </Link>
                  </div>
                  <Slider settings={storeSlider}>
                      {
                        data.map( (item,i) => {
                          return <StroeItem key={item['id']} path={`/store/${item['id']}`} data={item}/>
                        })
                      }
                  </Slider>
              </div>
          </section>
      </div>
  );
}