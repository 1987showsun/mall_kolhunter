import React from 'react';
import { connect } from 'react-redux';

// Components
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
        
        return(
            <React.Fragment>
                <div className="row">
                    <section className="container main-content">
                        <Filter />
                        <section className="container-col" data-flexdirection="column" >
                            <Breadcrumbs />
                            <BlockList />
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