/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React, { useState, useEffect, useMemo }    from 'react';
import { Link }                          from 'react-router-dom';
import { FontAwesomeIcon }               from '@fortawesome/react-fontawesome';
import { faChevronCircleRight }          from '@fortawesome/free-solid-svg-icons';

// Modules
import Slider                            from '../../../module/slider';
import StroeItem                         from '../../../module/item/store';

// Set
import { storeSlider }                   from '../public/set/slider';

// Images
import nullImages                        from '../../../public/images/init/420x420initBlockImages.jpg';

export default class Store extends React.Component{

  constructor(props){
    super(props);
    let data =[];
    for( let i=0 ; i<12 ; i++ ){
      data = [
        ...data,
        {
          id           : i,
          cover        : nullImages,
          photo        : nullImages,
          name         : '網紅電商 KOLL Mall',
          description  : "",
          productCount : 0,
          saleTotal    : 0
        }
      ]
    }

    this.state = {
      data
    }
  }

  static getDerivedStateFromProps( props,state ){
    return {
      data: props.data
    }
  }

  render(){
    const { data } = this.state;
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
}