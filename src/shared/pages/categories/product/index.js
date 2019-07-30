import React from 'react';
import { connect } from 'react-redux';

// Components
import Item from './item';
import BlockList from '../../../module/blockList';
import Filter from './filter/';
import Breadcrumbs from './breadcrumbs';

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
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
                                <Item />
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