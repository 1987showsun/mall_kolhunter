import React from 'react';
import { connect } from 'react-redux';

// Components
import Slider from '../../module/slider';

class Kv extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      data: props.data
    }
  }

  static getDerivedStateFromProps( props,state ){
    return{
        data: props.data || []
    }
  }

  render(){
    const { data } = this.state;
    const settings = {
      className: "center kv-slider-wrap",
      dots: true,
      centerMode: true,
      infinite: true,
      centerPadding: "14%",
      speed: 500,
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            centerPadding: "0px",
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 1024,
          settings: {
            centerPadding: "0px",
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 600,
          settings: {
            centerPadding: "0px",
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 420,
          settings: {
            centerPadding: "0px",
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return(
        <div className="row">
            <Slider settings={settings} >
                {
                  data.map( (item,i) => {
                    return(
                      <div className="slider-item">
                        <a href={item['url']} target="_blank">
                          <img src={item['image']} alt={item['title']} title={item['title']} />
                        </a>
                      </div>
                    )
                  })
                }
            </Slider>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return{

  }
}

export default connect( mapStateToProps )( Kv );