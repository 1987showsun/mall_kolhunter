/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React              from 'react';
import { connect }        from 'react-redux';

// Components
import Orderer            from './orderer';
import Receiving          from './receiving';

const Index = props => {

    const { data } = props;
    
    return(
        <section className="container-unit">
            <div className="unit-head">
                <h3>訂購人 / 收件人資訊</h3>
            </div>
            <div className="container-unit-row" data-flexwrap="wrap">
                <Orderer info={data}/>
                <Receiving info={data}/>
            </div>
        </section>
    );
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Index );