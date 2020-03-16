/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React               from 'react';
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

export default () => {
    const url = typeof window!="undefined"? window.location.href:'';
    return(
        <div className="detail-cover-share-wrap">
            <ul>
                <li>
                    分享
                </li>
                <li>
                    <FacebookShareButton url={url}>
                        <FacebookIcon size={34} round={true} />
                    </FacebookShareButton>
                </li>
                <li>
                    <TwitterShareButton url={url}>
                        <TwitterIcon size={34} round={true} />
                    </TwitterShareButton>
                </li>
                <li>
                    <EmailShareButton url={url}>
                        <EmailIcon size={34} round={true} />
                    </EmailShareButton>
                </li>
                <li>
                    <LineShareButton url={url}>
                        <LineIcon size={34} round={true} />
                    </LineShareButton>
                </li>
                <li>
                    <TelegramShareButton url={url}>
                        <TelegramIcon size={34} round={true} />
                    </TelegramShareButton>
                </li>
                <li>
                    <WhatsappShareButton url={url}>
                        <WhatsappIcon size={34} round={true} />
                    </WhatsappShareButton>
                </li>
            </ul>
        </div>
    );
}