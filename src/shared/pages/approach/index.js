import React from 'react';
import { connect } from 'react-redux';

// Components
import Breadcrumbs from './breadcrumbs';
import Search from './search';
import BlockList from '../../module/blockList';
import StoreItem from '../../module/item/store';

// Stylesheets
import './public/stylesheets/style.scss';

class Index extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="row">
                    <section className="container approach-content" >
                        <div className="container-col left">
                            <div className="container-row unit">
                                cover
                            </div>
                        </div>
                        <div className="container-col right">
                            <Breadcrumbs />
                            <div className="container-row unit">
                                <div className="unit-head">
                                    <h4>選擇您喜歡的網紅店舖購買</h4>
                                </div>
                                <Search />
                                <BlockList className="store-card">
                                    <li>
                                        <StoreItem />
                                    </li>
                                    <li>
                                        <StoreItem />
                                    </li>
                                    <li>
                                        <StoreItem />
                                    </li>
                                    <li>
                                        <StoreItem />
                                    </li>
                                    <li>
                                        <StoreItem />
                                    </li>
                                    <li>
                                        <StoreItem />
                                    </li>
                                    <li>
                                        <StoreItem />
                                    </li>
                                </BlockList>
                            </div>
                        </div>
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