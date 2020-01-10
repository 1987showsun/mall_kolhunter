/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React      from 'react';
import { Link }   from 'react-router-dom'

// Modules
import BlockList  from '../../../module/blockList';
import Item       from '../../../module/item/product';

export default ({data, total=0, limit=30 }) => {
    return(
        <div className="row">
            <section className="container" data-direction="column" >
                <div className="unit">
                    <div className="block-title">
                        <h2>精選商品</h2>
                    </div>
                    <BlockList className="product-card">
                        {
                            data.map( (item,i) => {
                                return(
                                    <li key={item['token']}>
                                        <Item  path={`/detail/${item['token']}`} data={item}/>
                                    </li>
                                )
                            })
                        }
                    </BlockList>
                    {
                        total>limit &&
                            <div className="loadMore-wrap">
                                <Link to={`/collections?page=2`}>更多精選商品</Link>
                            </div>
                    }
                </div>
            </section>
        </div>
    );
}