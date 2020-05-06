/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                         from 'react';
import dayjs                         from 'dayjs';
import { connect }                   from 'react-redux';

// Components
import AtmSteps                     from './atm';
import CvsSteps                     from './cvs';

// Lang
import lang                          from '../../../../../../../../public/lang/lang.json';

const PayMethodInfo = ({data, tableBodyData}) => {

    const { orderID, orderStatus, createTimeMs, payMethod, payAdditionalInfo } = data;
    if (orderStatus=='init'){
        switch( payMethod ){
            case 'atm':
                return <AtmSteps data={data} />
            case 'cvs':
                return <CvsSteps data={data} />
            default:
                return null;
        }
    } else {
        return null;
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( PayMethodInfo );