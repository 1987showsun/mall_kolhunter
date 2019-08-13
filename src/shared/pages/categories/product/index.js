import React from 'react';
import { connect } from 'react-redux';

// Components
import Item from '../../../module/item/product';
import BlockList from '../../../module/blockList';
import Filter from './filter/';
import Breadcrumbs from './breadcrumbs';

class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: props.list
        }
    }

    static getDerivedStateFromProps( props,state ) {
        return{
            data: props.list
        }
    }

    render(){
        
        const { match, location } = this.props;
        const { data } = this.state;

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
                                    data.map( item => {
                                        return(
                                            <li key={item['id']}>
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
        list: state.categories.list,
    }
}

export default connect( mapStateToProps )( Index );