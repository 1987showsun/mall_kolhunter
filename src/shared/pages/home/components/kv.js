/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React               from 'react';
import { connect }         from 'react-redux';

// Modules
import Slider              from '../../../module/slider';
import KvSlider            from '../../../module/item/kv';

// Setup
import { kvSlider }        from '../public/set/slider';

class Kv extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      settings     : kvSlider,
      data         : props.data || []
    }
  }

  static getDerivedStateFromProps( props,state ){
    return{
        data       : props.data || []
    }
  }

  render(){
    const { settings, data } = this.state;

    return(
        <div className="row kv-wrap">
            <Slider settings={settings} >
                {
                  data.length!=0 &&
                    data.map( (item,i) => {
                      return(
                        <KvSlider key={item['id']} data={item}/>
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