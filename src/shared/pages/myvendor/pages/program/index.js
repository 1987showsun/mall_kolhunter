import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Components
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';

// Stylesheets
import './style.scss';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            components : {
                1: {
                    mainTitle: "",
                    component: Step1
                },
                2: {
                    mainTitle: "",
                    component: Step2
                },
                3: {
                    mainTitle: "",
                    component: Step3
                },
            }
        }
    }

    render(){

        const { location, match, history } = this.props;
        const { components } = this.state;
        const componentsLength = Object.keys(components).length;
        const query =  queryString.parse( location['search'] );
        const step = query['step'] || 1;
        
        if( step<=componentsLength){
            const mainTitle = components[step]['mainTitle'] || null;
            const Component = components[step]['component'] || null;
            return(
                <React.Fragment>
                    <section className="page-title">
                        <h3>購買方案</h3>
                    </section>
                    <Component 
                        match = {match}
                        history = {history}
                        location = {location}
                    />
                </React.Fragment>
            );
        }else{
            return null;
        }
    }

    componentDidMount(){
        const { location, history } = this.props;
        const { components } = this.state;
        const componentsLength = Object.keys(components).length;
        const query =  queryString.parse( location['search'] );
        const step = query['step'] || 1;
        if( step>componentsLength){
            this.props.history.push('/myvendor/categories/product/review');
        }
    }
}


const mapStateToProps = state => {
    return {
        
    }
}

export default connect( mapStateToProps )( Index );