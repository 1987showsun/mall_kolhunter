import React             from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect }       from 'react-redux';

// Pages
import About             from './pages/about';
import Privacy           from './pages/privacy';
import Service           from './pages/service';

// Stylesheets
import './public/stylesheets/style.scss';

class Index extends React.Component{
    render(){
        return(
            <div className="row">
                <section className="container detail-content terms-wrap">
                    <Switch>
                        <Route path="/terms/about" component={About} />
                        <Route path="/terms/privacy" component={Privacy} />
                        <Route path="/terms/service" component={Service} />
                    </Switch>
                </section>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return{

    }
}

export default connect( mapStateToProps )( Index );