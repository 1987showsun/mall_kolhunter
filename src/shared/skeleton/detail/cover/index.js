/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

import React from "react";

// Stylesheets
import "../../public/stylesheets/style.scss";

// Images
import imageSkeleton from "../../../public/images/imageSkeleton.png";

export default () => {
    return(
        <section className="detail-cover-wrap">
            <section className="detail-cover-wrap-col left">
                <div className="cover-img-wrap">
                    <span className="skeleton-null absolute"/>
                    <img src={imageSkeleton} alt="" title="" />
                </div>
                <div className="cover-img-wrap cover-img-skeleton-wrap">
                    <ul>
                        <li>
                            <span className="skeleton-null absolute"/>
                            <img src={imageSkeleton} alt="" title="" />
                        </li>
                        <li>
                            <span className="skeleton-null absolute"/>
                            <img src={imageSkeleton} alt="" title="" />
                        </li>
                    </ul>
                </div>
            </section>
            <section className="detail-cover-wrap-col right">
                <div className="detail-cover-row cover-title">
                    <span className="skeleton-null main-title" />
                </div>
                <div className="detail-cover-row cover-other">
                    <span className="skeleton-null sub-info-block" />
                </div>
                <div className="detail-cover-row cover-money">
                    <span className="skeleton-null money" />
                </div>
                <div className="detail-cover-row cover-select">
                    <label><span className="skeleton-null" /></label>          
                    <ul className="select-list">
                        <li>
                            <label>
                                <span className="skeleton-null" />
                            </label>
                        </li>
                    </ul>
                </div>
                <div className="detail-cover-row cover-select">
                    <label><span className="skeleton-null" /></label>          
                    <ul className="select-list">
                        <li>
                            <label>
                                <span className="skeleton-null" />
                            </label>
                        </li>
                        <li>
                            <label>
                                <span className="skeleton-null" />
                            </label>
                        </li>
                    </ul>
                </div>
                <div className="detail-cover-row cover-quantity">
                    <label><span className="skeleton-null" /></label>
                    <div>
                        <span className="skeleton-null" />
                    </div>
                </div>
                <div className="detail-cover-row cover-quantity">
                    <label><span className="skeleton-null" /></label>
                    <div>
                        <span className="skeleton-null" />
                    </div>
                </div>
                <div className="detail-cover-row cover-action">
                    <ul>
                        <li className="add-cart-li">
                            <span className="skeleton-null" />
                        </li>
                        <li className="direct-purchase-li">
                            <span className="skeleton-null" />
                        </li>
                    </ul>
                </div>
            </section>
        </section>
    );
}