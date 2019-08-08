import React from 'react';
import { connect } from 'react-redux';

// Components
//import Item from './item';
import Item from '../../../module/item/product';
import BlockList from '../../../module/blockList';
import Filter from './filter/';
import Breadcrumbs from './breadcrumbs';

const demoData = [
    {
        id: "62c08bab8215b25e9d90",
        image: "https://static.kolhunter.com/vendor/product/2019/08/01/62c08bab8215b25e9d90/1e970396a108ec33501d3bf4d853539f.png",
        name: "test",
        price: 123123,
        sellPrice: 123123
    },
    {
        id: "5dba306c43d2bbd55024",
        image: "https://static.kolhunter.com/vendor/product/2019/07/31/5dba306c43d2bbd55024/582c047b1a0f878e225e9b109d990fc2.png",
        name: "test",
        price: 123,
        sellPrice: 123123
    },
    {
        id: "47a10f5fed64d49fd5db",
        image: "https://static.kolhunter.com/vendor/product/2019/08/01/47a10f5fed64d49fd5db/8b02601955efaa8a9a54d147df9fd193.png",
        name: "test",
        price: 123,
        sellPrice: 123
    },
    {
        id: "75f0a44df069df7907fb",
        image: "https://static.kolhunter.com/vendor/product/2019/08/01/75f0a44df069df7907fb/1e69475e68faf2164ecc478666ed918f.png",
        name: "test",
        price: 123,
        sellPrice: 123
    },
    {
        id: "1c500c3e6edd33d4ff59",
        image: "https://static.kolhunter.com/vendor/product/2019/08/01/1c500c3e6edd33d4ff59/b1243ebc56994d0b7d2a458f19c6dc83.png",
        name: "test",
        price: 123,
        sellPrice: 123
    },
    {
        id: "0f95de6062898487ad89",
        image: "https://static.kolhunter.com/vendor/product/2019/07/31/0f95de6062898487ad89/3907a6bb44709f7006d127e786dcc391.png",
        name: "test",
        price: 123,
        sellPrice: 123
    }
]

class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        
        const { match, location } = this.props;

        return(
            <React.Fragment>
                <div className="row">
                    <section className="container main-content">
                        <Filter
                            match= {match}
                            location= {location}
                        />
                        <section className="container-col" data-flexdirection="column" >
                            <Breadcrumbs />
                            <BlockList className="product-card">
                                {
                                    demoData.map( item => {
                                        return(
                                            <li>
                                                <Item path={`/approach/${item['id']}`} data={item}/>
                                            </li>
                                        )
                                    })
                                }
                            </BlockList>
                        </section>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default connect( mapStateToProps )( Index );