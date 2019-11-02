import $                                 from 'jquery';
import React                             from 'react';
import queryString                       from 'query-string';
import { connect }                       from 'react-redux';
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon }               from '@fortawesome/react-fontawesome';
import { faQuestion }                    from '@fortawesome/free-solid-svg-icons';

//Routes
import routers                           from './routers';

//Components
import Header                            from './components/common/header/header';
import Footer                            from './components/common/footer/footer';

// Images
import line                              from './public/images/icon/icons8-line-144.png';
import service                           from './public/images/icon/service.png';

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
                <div className="permanent-tool">
                    <div className="permanent-tool-head">幫助</div>
                    <ul className="permanent-tool-list">
                        <li>
                            <a href="http://nav.cx/AalEgTs" target="_blank">
                                <img src={service} alt="Mall Kolhunter line" title="Mall Kolhunter line" />
                                <span className="permanent-tool-prompt">我要上架</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const { location }      = this.props;
        const pathname          = location.pathname.split('/').filter( item => item!='' );
        const search            = queryString.parse(location.search);
        const prevPropsLocation = prevProps.location;
        const prevPathname      = prevPropsLocation.pathname.split('/').filter( item => item!='' );
        const prevSearch        = queryString.parse(prevPropsLocation.search);
        let pathnameComparison  = false;
        let searchComparison    = false;

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
            $('#root').scrollTop(0);
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