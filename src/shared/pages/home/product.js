import React from 'react';

// Components
import BlockList from '../../module/blockList';

export default class Store extends React.Component{
    render(){
        return(
            <div className="row">
                <section className="container" data-direction="column" >
                    <div className="unit">
                        <div className="block-title">
                            <h2>熱門商品</h2>
                        </div>
                        <BlockList />
                    </div>
                </section>
            </div>
        );
    }
}