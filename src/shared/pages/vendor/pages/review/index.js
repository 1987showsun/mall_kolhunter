import React from 'react';
import { connect } from 'react-redux';

//Components
import Product from './product';

//Lang
import lang from '../../../../lang/lang.json';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            components:{
                product: {
                    mainTitle: "Product review",
                    component: Product
                }
            }
        }
    }

    render(){

        const { components }= this.state;
        const { match, location, history }= this.props;
        let _type= match['params']['type'] || 'product';
        let _mainTitle = lang['zh-TW'][ components[_type]['mainTitle'] ];
        let Component = components[_type]['component'];

        return(
            <React.Fragment>
                <Component 
                    history= {history}
                    match= {match}
                    location= {location}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default connect( mapStateToProps )( Index );