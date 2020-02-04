/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';

const Description = props => {

    const { name, data } = props;

    return(
        <div className="container-row">
            <div className="detail-cover-wrap detail-container">
                {
                    data.map( (item,i) => {
                        switch( item['type'] ){
                            case "image":
                                return <img key={`${item['sort']}-${i}`} src={item['content']} alt={name} title="" />;

                            case "iframe":
                                return (
                                    <div key={`${item['sort']}-${i}`} className="detail-container-video" dangerouslySetInnerHTML={{__html: item['content']}}></div>
                                );

                            case "html":
                                return (
                                    <div key={`${item['sort']}-${i}`} className="detail-container-text">
                                        <p>{item['content']}</p>
                                    </div>
                                );
                        }
                    })
                }
            </div>
        </div>
    );
}

export default Description;