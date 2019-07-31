import React from 'react';
import $ from 'jquery';
import Slider from "react-slick";

export default class Img extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            settings: {}
        }
    }

    componentDidMount() {
        this.setState({
            settings: {
                // customPaging: function(i) {
                //     const src = $('.coverBlock').eq(i+1).find('>img').attr('src');
                //     return (
                //         <a>
                //             <img src={src} />
                //         </a>
                //     );
                // },
                dots: false,
                dotsClass: "slick-slider slick-dots slick-thumb",
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                className: "ddd"
            }
        })
    }

    render(){

        const { settings } = this.state;
        const settings2 = {
            slidesToShow: 3,
            slidesToScroll: 3,
            className: "ddd"
        }

        return(
            <React.Fragment>
                <Slider 
                    {...settings}
                >
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/2DBEC82AC9-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/91B59BC34D-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/39B9537090-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/4989B0E6E7-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/2DBEC82AC9-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/91B59BC34D-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/39B9537090-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/4989B0E6E7-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/2DBEC82AC9-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/91B59BC34D-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/39B9537090-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/4989B0E6E7-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                </Slider>
                <Slider 
                    {...settings2}
                    afterChange={ (val)=>{console.log(val);} }
                    edgeFriction={ (val)=>{console.log(val);} }
                    slickCurrentSlide={ (val)=>{console.log(val);} }
                    onInit={ (val)=>{console.log(val);} }
                >
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/2DBEC82AC9-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/91B59BC34D-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/39B9537090-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/4989B0E6E7-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/2DBEC82AC9-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/91B59BC34D-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/39B9537090-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/4989B0E6E7-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/2DBEC82AC9-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/91B59BC34D-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/39B9537090-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/4989B0E6E7-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                    <div className="coverBlock">
                        <img src="https://s.yimg.com/zp/MerchandiseImages/AE55F5F1FB-SP-6083929.jpg" />
                    </div>
                </Slider>      
            </React.Fragment>

        );
    }
}