import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faChevronCircleRight }from '@fortawesome/free-solid-svg-icons';

// Modules
import Slider from '../../module/slider';
import StroeItem from '../../module/item/store';

// Set
import { storeSlider } from './public/set/slider';

class Store extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      list: props.data
    }
  }

  static getDerivedStateFromProps( props,state ){
    return{
      list: props.data
    }
  }

  render(){

    const { list } = this.state;

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
                          list.map( (item,i) => {
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

const mapStateToProps = state => {
  return{
    //list: state.home.recommendStoreList
  }
}

export default connect( mapStateToProps )( Store );