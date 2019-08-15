// 訂購 ＆ 收件 人
import React from 'react';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faChevronCircleRight}from '@fortawesome/free-solid-svg-icons';

// Components
import Orderer from './orderer';
import Recipient from './recipient';

export default class Index extends React.Component{
    render(){
        return(
            <div className="container-unit-row" data-flexwrap="wrap">
                <div className="container-unit-row" data-flexwrap="wrap">
                    <div className="container-unit-head">
                        <h4><FontAwesomeIcon icon={faChevronCircleRight}/>訂購人</h4>
                    </div>
                    <Orderer />
                </div>
                <div className="container-unit-row" data-flexwrap="wrap">
                    <div className="container-unit-head">
                        <h4><FontAwesomeIcon icon={faChevronCircleRight}/>收件人</h4>
                    </div>
                    <Recipient />
                </div>
            </div>
        );
    }
}