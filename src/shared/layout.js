import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from "react-router-dom";

// Actions
import { ssrUse } from './actions/home';

//Routes
import routers from './routers';

//Components
import Header from './components/common/header';
import Footer from './components/common/footer';

//Jsons

//Stylesheets
import './public/stylesheets/common.scss';

//socket test

class Layout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cartID : props.cartID,
            token: props.login.token
        }
    }

    static getDerivedStateFromProps(props) {
        return{
            token: props.login.token
        }
    }

    render(){
        const isNowPagesNoShow = ['vendor','account','myvendor'];
        const { location, match, history } = this.props;
        let pathname = location['pathname'].split('/').filter( item => item!='' );
        return(
            <React.Fragment>
                {
                    !isNowPagesNoShow.includes( pathname[0] ) &&
                        <Header 
                            history= {history}
                            match= {match}
                            location= {location} 
                        />
                }
                <Switch>
                    {
                        routers.map( (item,i) => {
                            return <Route key={i} {...item}/>
                        })
                    }
                </Switch>
                {
                    !isNowPagesNoShow.includes( pathname[0] ) &&
                        <Footer 
                            history= {history}
                            match= {match}
                            location= {location} 
                        />
                }
            </React.Fragment>
        );
    }

    componentDidMount(){

    }
}

const mapStateToProps = ( state ) => {
    return{
        login: state.login
    }
}

export default connect(mapStateToProps)(Layout);