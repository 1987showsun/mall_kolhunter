/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                         from 'react';
import { connect }                   from 'react-redux';
import { Link }                      from 'react-router-dom';

// Modules
import Slider                        from '../../../../../module/slider';

// Set
import sliderSet                     from './public/set/slider';

// Stylesheets
import './public/stylesheets/style.scss';

const MobileNav = (props) => {
    const { match, list }= props;
    const mobileNavSet   = sliderSet['mobileNav'];
    const mainId         = match['params']['main'] || "";
    const subId          = match['params']['sub'] || "";
    const navData        = list.filter( filterItem => filterItem['id']==mainId );
    let   selectedIndex  = 0;
    if( navData.length>0 ){
        selectedIndex  = Number(navData[0]['children'].findIndex( item => item['id']==subId ))+1;
    }

    mobileNavSet['initialSlide'] = selectedIndex;

    return(
        <div className="categories-mobileNav-wrap">
            <Slider settings={mobileNavSet}>
                {
                    navData.length!=0 &&
                        <div className={`categories-mobileNav-items ${ subId=="" }`}>
                            <Link to={`/categories/${navData[0]['id']}`}>
                                所有商品
                            </Link>
                        </div>
                }
                {
                    navData[0]['children'].map( item => {
                        return(
                            <div key={item['id']} className={`categories-mobileNav-items ${item['id']==subId}`}>
                                <Link 
                                    to={{
                                        pathname: `/categories/${navData[0]['id']}/${item['id']}`
                                    }}
                                >
                                    {item['title']}
                                </Link>
                            </div>
                        );
                    })
                }
            </Slider>
        </div>
    );
}

const mapStateToPeops = state => {
    return{
        list: state.common.categoriesList
    }
}

export default connect( mapStateToPeops )( MobileNav );