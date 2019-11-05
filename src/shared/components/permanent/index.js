import React                             from 'react';

// Images
import service                           from '../../public/images/icon/service.png';

export default () => {
    return(
        <div className="permanent-tool">
            <label htmlFor="permanent-switch" className="permanent-tool-head">幫助</label>
            <input type="checkbox" id="permanent-switch" name="permanent-switch"/>
            <label htmlFor="permanent-switch" className="permanent-tool-mask"></label>
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