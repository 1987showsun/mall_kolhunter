import React from 'react';
import $ from 'jquery';
import queryString from 'query-string';
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

    componentDidUpdate(prevProps, prevState) {
        const { location, match } = this.props;
        const pathname = location.pathname.split('/').filter( item => item!='' );
        const search   = queryString.parse(location.search);
        const prevPropsLocation = prevProps.location;
        const prevPathname = prevPropsLocation.pathname.split('/').filter( item => item!='' );
        const prevSearch = queryString.parse(prevPropsLocation.search);
        let pathnameComparison = false;
        let searchComparison   = false;

        if( pathname.length>prevPathname.length ){
            pathnameComparison = pathname.some( (keys,i) => keys!=prevPathname[i] );
        }else{
            pathnameComparison = prevPathname.some( (keys,i) => keys!=pathname[i] );
        }

        if( Object.keys(search).length>Object.keys(prevSearch) ){
            searchComparison = Object.keys(search).some( keys => search[keys]!=prevSearch[keys] );
        }else{
            searchComparison = Object.keys(prevSearch).some( keys => prevSearch[keys]!=search[keys] );
        }
        
        if( pathnameComparison || searchComparison ){
            $('#root').css({ scrollTop: 0 });
        }
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