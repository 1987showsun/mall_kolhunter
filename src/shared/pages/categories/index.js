import React from 'react';
import { connect } from 'react-redux';

//Compoents
import Product from './product/';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            compoents : {
                product: {
                    mainTitle: "",
                    component: Product
                },
                store: {
                    mainTitle: "",
                    component: Product
                }
            }
        }
    }

    render(){

        const { compoents } = this.state;
        const { match, location, history } = this.props;
        const ownedKey = Object.keys( compoents );
        const type = match['params']['type'] || 'product';

        if( ownedKey.includes( type ) ){
            const Compoent = compoents[type]['component'];
            return(
                <React.Fragment>             
                    <Compoent 
                        history={history}
                        match={match}
                        location={location}
                    />
                </React.Fragment>
            );
        }else{
            return null;
        }
    }

    componentDidMount() {
        const { compoents } = this.state;
        const { match } = this.props;
        const ownedKey = Object.keys( compoents );
        const type = match['params']['type'] || 'product';
        if( !ownedKey.includes( type ) ){
            this.props.history.push('/categories');
        }
    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default connect( mapStateToProps )( Index );