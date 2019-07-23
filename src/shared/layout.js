import React                             from 'react';
import { connect }                       from 'react-redux';
import { Route, Redirect, Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";

//Routes
import routers from './routers';

//Components
import Header from './components/common/header';
import Footer from './components/common/footer';

//Actions

//Jsons

//Stylesheets
import './public/stylesheets/common.scss';

//socket test

class Layout extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            token: props.login.token
        }
    }

    componentDidMount(){
    }

    static getDerivedStateFromProps(props) {
        return{
            token: props.login.token
        }
    }

    render(){
        const isNowPagesNoShow = ['vendor','account','myvendor'];
        const { location, match } = this.props;
        let pathname = location['pathname'].split('/').filter( item => item!='' );
        return(
            <React.Fragment>
                {
                    !isNowPagesNoShow.includes( pathname[0] ) &&
                        <Header />
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
                        <Footer />
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = ( state ) => {
    return{
        login: state.login
    }
}

export default connect(mapStateToProps)(Layout);