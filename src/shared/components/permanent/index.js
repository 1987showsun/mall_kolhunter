/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                             from 'react';
import { FontAwesomeIcon }               from '@fortawesome/react-fontawesome';
import { faExclamationTriangle }         from '@fortawesome/free-solid-svg-icons';

// Stylesheets
import './public/stylesheets/style.scss';

// Images
import service                           from '../../public/images/icon/service.png';
import kol                               from '../../public/images/icon/kol.png';
import support                           from '../../public/images/icon/support.png';

export default () => {
    return(
        <div className="permanent-tool">
            <label htmlFor="permanent-switch" className="permanent-tool-head">
                <i><FontAwesomeIcon icon={faExclamationTriangle}/></i>
                <span className="permanent-switch-text">幫助</span>
            </label>
            <input type="checkbox" id="permanent-switch" name="permanent-switch"/>
            <label htmlFor="permanent-switch" className="permanent-tool-mask"></label>
            <ul className="permanent-tool-list">
                <li>
                    <a href="http://nav.cx/AalEgTs" target="_blank">
                        <img src={service} alt="Mall Kolhunter line" title="Mall Kolhunter line" />
                        <span className="permanent-tool-prompt">我要上架</span>
                    </a>
                </li>
                <li>
                    <a href="https://line.me/R/ti/p/%40936zplfo" target="_blank">
                        <img src={support} alt="Mall Kolhunter support" title="Mall Kolhunter support" />
                        <span className="permanent-tool-prompt">客服</span>
                    </a>
                </li>
                <li>
                    <a href="https://line.me/R/ti/p/%40nmd6450l" target="_blank">
                        <img src={kol} alt="Kolhunter line" title="Kolhunter line" />
                        <span className="permanent-tool-prompt">我是網紅</span>
                    </a>
                </li>
            </ul>
        </div>
    );
}