import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

//Components
import Nav from './common/nav';
import Header from './common/header';

//Stylesheets
import './public/css/style.scss';

//Routers
import routers from './routers';

class Index extends React.Component{
    render(){
        return(
            <React.Fragment>
                <input type="checkbox" id="admin-nav-switch" />
                <Nav {...this.props}/>
                <main className="admin-main">
                    <Header />
                    <div className="admin-content">
                            {
                                routers.map( (routeItem,i) => {
                                    return (<Route key={i} {...routeItem} />);
                                })
                            }
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{

    }
}

export default connect(mapStateToProps)(Index);