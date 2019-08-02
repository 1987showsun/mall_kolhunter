import React from 'react';
import $ from 'jquery';
import Slider from "react-slick";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Lightbox from "react-image-lightbox";

export default class Img extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            photoIndex: 0,
            mainSettingsCurrent: 0,
            mainSettings: {
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                className: 'cover-slick-block cover-slick-main',
                afterChange: (current) => {
                    this.setState({
                        mainSettingsCurrent: current
                    })
                }
            },
            navSettings: {
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 5,
                slidesToScroll: 5,
                className: 'cover-slick-block cover-slick-nav',
                responsive: [
                    {
                      breakpoint: 1280,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                      }
                    },
                    {
                      breakpoint: 860,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                      }
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    }
                ]
            },
            images: [
                'https://s.yimg.com/zp/MerchandiseImages/2DBEC82AC9-SP-6083929.jpg',
                'https://s.yimg.com/zp/MerchandiseImages/91B59BC34D-SP-6083929.jpg',
                'https://s.yimg.com/zp/MerchandiseImages/39B9537090-SP-6083929.jpg',
                'https://s.yimg.com/zp/MerchandiseImages/4989B0E6E7-SP-6083929.jpg',
                'https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg'
            ]
        }
    }

    componentDidMount() {
        const $this = this;
        $('.cover-slick-nav').find('.slick-slide').click(function(){
            $this.slider.slickGoTo( Number($(this).attr('data-index')) )
        })
        $('.cover-img-main-item')
    }

    render(){
    
        const { isOpen, photoIndex, mainSettings, navSettings, images } = this.state;

        return(
            <React.Fragment>
                <div className="ddd">
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
                <Slider {...navSettings} >
                    <div className="cover-img-nav-item">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/2DBEC82AC9-SP-6083929.jpg" />
                    </div>
                    <div className="cover-img-nav-item">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/91B59BC34D-SP-6083929.jpg" />
                    </div>
                    <div className="cover-img-nav-item">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/39B9537090-SP-6083929.jpg" />
                    </div>
                    <div className="cover-img-nav-item">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/4989B0E6E7-SP-6083929.jpg" />
                    </div>
                    <div className="cover-img-nav-item">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                </Slider>
                </div>   
            </React.Fragment>

        );
    }
}