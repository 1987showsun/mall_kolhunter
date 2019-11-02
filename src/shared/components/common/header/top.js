import React                  from 'react';
import { Link }               from 'react-router-dom';
import { FontAwesomeIcon }    from '@fortawesome/react-fontawesome';
import { faInstagram }from '@fortawesome/free-solid-svg-icons';

// Images
import instagram from '../../../public/images/icon/instagram.svg';
import facebook  from '../../../public/images/icon/facebook.svg';


export default ( props ) => {

    const { vendorToken } = props;

    return(
        <div className="top">
            <ul>
                {
                    vendorToken!="" && vendorToken!=null && vendorToken!=undefined ? (
                        <>
                            <li>
                                <Link to="/myvendor">廠商管理系統</Link>
                            </li>
                        </>
                    ):(
                        <>
                            <li>
                                <Link to="/vendor">廠商登入</Link>
                            </li>
                            <li>
                                <Link to="/vendor/signup">加入經銷商</Link>
                            </li>
                        </>
                    )
                }
                <li>
                    <span>追蹤我們</span>
                    <span className="share-icon">
                        <a href="https://www.facebook.com/%E7%B6%B2%E7%B4%85%E9%9B%BB%E5%95%86-KOL-Mall-106307374129745/" target="_blank">
                            <img src={facebook} alt="網紅電商 facebook" title="網紅電商 facebook"/>
                        </a>
                    </span>
                    <span className="share-icon">
                        <a href="https://www.instagram.com/explore/locations/106307374129745/kol-mall/" target="_blank">
                            <img src={instagram} alt="網紅電商 instagram" title="網紅電商 instagram"/>
                        </a>
                    </span>
                </li>
            </ul>
        </div>
    );
}