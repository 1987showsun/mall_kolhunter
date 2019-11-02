import React                             from 'react';

// Images
import line                              from '../../public/images/icon/icons8-line-144.png';
import service                           from '../../public/images/icon/service.png';

export default () => {
    return(
        <div className="permanent-tool">
            <div className="permanent-tool-head">幫助</div>
            <ul className="permanent-tool-list">
                <li>
                    <a href="http://nav.cx/AalEgTs" target="_blank">
                        <img src={service} alt="Mall Kolhunter line" title="Mall Kolhunter line" />
                        <span className="permanent-tool-prompt">我要上架</span>
                    </a>
                </li>
            </ul>
        </div>
    );
}