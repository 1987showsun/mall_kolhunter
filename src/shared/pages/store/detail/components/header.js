/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                from 'react';
import CurrencyFormat       from 'react-currency-format';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import { faCheck }          from '@fortawesome/free-solid-svg-icons';
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LineShareButton,
    LineIcon,
    EmailShareButton,
    EmailIcon,
    TelegramShareButton,
    TelegramIcon,
    WhatsappShareButton,
    WhatsappIcon
} from 'react-share';

// Mudules
import Loading            from '../../../../module/loading/mallLoading';

export default ( props ) => {

    const { info, productTotal, loading } = props;
    const {
        verified,
        celebName,
        celebToken ,
        cover, 
        description,
        name,
        photo,
        modified,
        salesAmount 
    } = info;
    const url = typeof window!="undefined"? window.location.href:'';

    return(
        <div className="row store-cover-wrap">
            <div className="store-cover-background-img" style={{backgroundImage: `url(${cover||''})`}} />
            <section className="container store-cover">
                <figure>
                    <div className="figure-img">
                        <img src={photo||""} alt={name||""} title="" />
                        <div className={`store-verified ${verified||false}`}>
                            <FontAwesomeIcon icon={faCheck} />
                        </div>
                    </div>
                    <figcaption>
                        <div className="name">
                            <h1>{name||""}</h1>
                        </div>
                        {
                            !verified &&
                                <div className="figcaption-row verified-note">該店舖之商品分潤，均歸屬於 {name}</div>
                        }
                        <div className="figcaption-row">
                            <ul className="store-cover-share-list">
                                <li>
                                    <FacebookShareButton url={url}>
                                        <FacebookIcon size={38} round={true} />
                                    </FacebookShareButton>
                                </li>
                                <li>
                                    <TwitterShareButton url={url}>
                                        <TwitterIcon size={38} round={true} />
                                    </TwitterShareButton>
                                </li>
                                <li>
                                    <EmailShareButton url={url}>
                                        <EmailIcon size={38} round={true} />
                                    </EmailShareButton>
                                </li>
                                <li>
                                    <LineShareButton url={url}>
                                        <LineIcon size={38} round={true} />
                                    </LineShareButton>
                                </li>
                                <li>
                                    <TelegramShareButton url={url}>
                                        <TelegramIcon size={38} round={true} />
                                    </TelegramShareButton>
                                </li>
                                <li>
                                    <WhatsappShareButton url={url}>
                                        <WhatsappIcon size={38} round={true} />
                                    </WhatsappShareButton>
                                </li>
                            </ul>
                        </div>
                        {/* <div className="figcaption-row">
                            <ul className="figcaption-info-ul">
                                <li>
                                    <div className="figcaption-ul-head">總成交商品數</div>
                                    <div className="figcaption-ul-content">
                                        <CurrencyFormat value={info['salesAmount']} displayType={'text'} thousandSeparator={true} />
                                    </div>
                                </li>
                                <li>
                                    <div className="figcaption-ul-head">商品總數</div>
                                    <div className="figcaption-ul-content">
                                        <CurrencyFormat value={productTotal} displayType={'text'} thousandSeparator={true} />
                                    </div>
                                </li>
                            </ul>
                        </div> */}
                        <div className="figcaption-row">
                            <ul className="figcaption-action-ul">
                                <li><a type="button" href={`https://www.kolhunter.com/celebrity/info/${celebName||''}/${celebToken||''}`} target="_blank">網紅介紹</a></li>
                            </ul>
                        </div>
                    </figcaption>
                </figure>
            </section>
            <Loading loading={loading} />
        </div>
    );
}