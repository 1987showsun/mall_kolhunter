import React from 'react';
import $ from 'jquery';
import Slider from "react-slick";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Lightbox from "react-image-lightbox";

// Stylesheets
import './style.scss';

export default class CoverSlider extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            photoIndex: 0,
            images: props.data,
            mainSettingsCurrent: 0,
            mainSettings: props.mainSettings || {},
            navSettings: props.navSettings || {},
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            images : props.data || []
        }
    }

    render(){

        const { isOpen, photoIndex, mainSettings, navSettings, images } = this.state;

        return(
            <React.Fragment>
                <div className="cover-img-wrap">
                    {
                        Object.keys( mainSettings ).length!=0 &&
                            <MDBContainer className="mt-5">
                                
                                <MDBRow>
                                    <Slider
                                        ref={slider => (this.slider = slider)}
                                        {...mainSettings}
                                    >
                                        {
                                            images.map( (item,i)=> {
                                                return(
                                                    <MDBCol md="4" key={i}>
                                                        <figure className="cover-img-main-item">
                                                            <img src={item} alt="Gallery" className="img-fluid" onClick={ ()=> this.setState({ photoIndex: i, isOpen: true }) }/>
                                                        </figure>
                                                    </MDBCol>
                                                )
                                            })
                                        }
                                    </Slider>
                                </MDBRow>
                                {isOpen && (
                                    <Lightbox
                                        mainSrc={images[photoIndex]}
                                        nextSrc={images[(photoIndex + 1) % images.length]}
                                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                                        imageTitle={photoIndex + 1 + "/" + images.length}
                                        onCloseRequest={() => this.setState({ isOpen: false })}
                                        onMovePrevRequest={() =>
                                            this.setState({
                                            photoIndex: (photoIndex + images.length - 1) % images.length
                                            })
                                        }
                                        onMoveNextRequest={() =>
                                            this.setState({ photoIndex: (photoIndex + 1) % images.length })
                                        }
                                    />
                                )}
                            </MDBContainer>
                    }
                    {
                        Object.keys( navSettings ).length!=0 &&
                            <Slider {...navSettings} >
                                {
                                    images.map( (item,i) => {
                                        return(
                                            <figure key={i} className="cover-img-main-item">
                                                <img src={item} alt="Gallery" className="img-fluid" />
                                            </figure>
                                        );
                                    })
                                }
                            </Slider>
                    }
                </div>   
            </React.Fragment>
        );
    }

    componentDidMount() {
        const $this = this;
        $('.cover-slick-nav').find('.slick-slide').click(function(){
            $this.slider.slickGoTo( Number($(this).attr('data-index')) )
        })
        $('.cover-img-main-item')
    }
}