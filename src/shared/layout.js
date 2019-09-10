import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from "react-router-dom";

//Routes
import routers from './routers';
import MyVendor from './pages/myvendor';
import MyAccount from './pages/myaccount';
import MyStore from './pages/mystore';

//Components
import Header from './components/common/header/header';
import Footer from './components/common/footer/footer';

//Stylesheets
import './public/stylesheets/common.scss';
import './public/stylesheets/toasted.scss';

class Layout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cartID: props.cartID,
            token: getToken(props.location)
        }
    }

    static getDerivedStateFromProps(props) {
        return{
            token: getToken(props.location)
        }
    }

    render(){
        const isNowPagesNoShow = ['vendor','account','myvendor'];
        const { location, match, history } = this.props;
        const pathname = location['pathname'].split('/').filter( item => item!='' );

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
                    <Redirect to="/site/404" />
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
}

const getToken = ( location ) => {
    const type = location['pathname'].split('/').filter( item => item!='' )[0];
    let tokenKeyName = "";
    if( type=='myaccount' || type=='mystore' ){
        tokenKeyName = `jwt_account`;
    }else if( type=='myvendor' ){
        tokenKeyName = `jwt_vendor`;
    }
    if( typeof window!=='undefined' ){
        return sessionStorage.getItem(tokenKeyName);
    }else{
        return null;
    }
}

const mapStateToProps = ( state ) => {
    return{
        login: state.login
    }
}

export default connect(mapStateToProps)(Layout);