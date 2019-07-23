import React from 'react';

// Components
import BlockList from '../../module/blockList';

export default class Store extends React.Component{
    render(){
        return(
            <div className="unit">
                <div className="block-title">
                    <h2>熱門商品</h2>
                </div>
                <BlockList />
            </div>
        );
    }
}