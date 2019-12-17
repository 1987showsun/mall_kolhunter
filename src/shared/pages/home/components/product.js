/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React          from 'react';
import queryString    from 'query-string';
import { Link }       from 'react-router-dom'
import { connect }    from 'react-redux';

// Modules
import BlockList      from '../../../module/blockList';
import Item           from '../../../module/item/product';
import InfiniteScroll from '../../../module/InfiniteScroll';

class Latest extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data   : props.data  || [],
            total  : props.total || 0
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            data   : props.data  || [],
            total  : props.total || 0
        }
    }

    render(){

        const { location }        = this.props;
        const { data, total }     = this.state;
        const { search }          = location;
        const { latestCurrent=1 } = queryString.parse( search );

        return(
            <div className="row">
                <section className="container" data-direction="column" >
                    <div className="unit">
                        <div className="block-title">
                            <h2>熱門商品</h2>
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
                        <div className="loadMore-wrap">
                            <Link to="/collections">更多精選商品</Link>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect()( Latest );