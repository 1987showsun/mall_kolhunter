/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React, { useState, useEffect, useRef } from 'react';
import $                                      from 'jquery';
import Slider                                 from "react-slick";
import Lightbox                               from "react-image-lightbox";
import { MDBContainer, MDBRow, MDBCol }       from "mdbreact";

// Stylesheets
import './style.scss';

const CoverSlider = ( props ) => {

    const slider = useRef(null);
    const { name="", data=[], mainSettings={}, navSettings={} }  = props;
    const [ photoIndex, setPhotoIndex ]              = useState(0);
    const [ isOpen, setIsOpen ]                      = useState(false);

    useEffect( () => {
        $('.cover-slick-nav').find('.slick-slide').click(function(){
            slider.current.slickGoTo( Number($(this).attr('data-index')) )
        })
    })

    return(
        <div className="cover-img-wrap">
            {
                Object.keys( mainSettings ).length!=0 &&
                    <MDBContainer className="mt-5">
                        
                        <MDBRow>
                            <Slider
                                ref={slider}
                                {...mainSettings}
                            >
                                {
                                    data.map( (item,i)=> {
                                        return(
                                            <MDBCol md="4" key={i}>
                                                <figure className="cover-img-main-item">
                                                    <img src={item} alt={name} className="img-fluid" onClick={ ()=> {
                                                        setPhotoIndex(i);
                                                        setIsOpen(true);
                                                    }}/>
                                                </figure>
                                            </MDBCol>
                                        )
                                    })
                                }
                            </Slider>
                        </MDBRow>
                        {isOpen && (
                            <Lightbox
                                mainSrc           = {data[photoIndex]}
                                nextSrc           = {data[(photoIndex + 1) % data.length]}
                                prevSrc           = {data[(photoIndex + data.length - 1) % data.length]}
                                imageTitle        = {photoIndex + 1 + "/" + data.length}
                                onCloseRequest    = {() => setIsOpen(false)}
                                onMovePrevRequest = {() =>
                                    setPhotoIndex( ((photoIndex + data.length - 1) % data.length) )
                                }
                                onMoveNextRequest={() =>
                                    setPhotoIndex( ((photoIndex + 1) % data.length) )
                                }
                            />
                        )}
                    </MDBContainer>
            }
            {
                Object.keys( navSettings ).length!=0 &&
                    <Slider {...navSettings} >
                        {
                            data.map( (item,i) => {
                                return(
                                    <figure key={i} className="cover-img-main-item">
                                        <img src={item} alt={name} className="img-fluid" />
                                    </figure>
                                );
                            })
                        }
                    </Slider>
            }
        </div>   
    );
}

export default CoverSlider;