import React from 'react';
import { connect } from 'react-redux';

// Modules
import BlockList from '../../module/blockList';
import Item from '../../module/item/product';

class Latest extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: props.data || []
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            data: props.data || []
        }
    }

    render(){

        const { data } = this.state;

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
                                        <li key={item['id']}>
                                            <Item  path={`/detail/${item['token']}`} data={item}/>
                                        </li>
                                    )
                                })
                            }
                        </BlockList>
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