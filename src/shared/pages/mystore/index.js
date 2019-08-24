import React from 'react';
import { connect } from 'react-redux';

// Components
import Nav from './common/nav';

// Pages
import Product from './pages/product';
import Store from './pages/store';
import Fansorders from './pages/fansorders';
import Bank from './pages/bank';

// Stylesheets
import './public/stylesheets/style.scss';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            token: props.jwt_account,
            components: {
                product: {
                    mainTitle: "商品清單",
                    component: Product
                },
                store: {
                    mainTitle: "店舖管理",
                    component: Store
                },
                fansorders: {
                    mainTitle: "粉絲訂單",
                    component: Fansorders
                },
                bank: {
                    mainTitle: "銀行帳號設定",
                    component: Bank
                }
            }
        }
    }

    static getDerivedStateFromProps( props, state ){
        if( props.jwt_account!=state.token ){
            return {
                token: props.jwt_account
            }
        }
        return null;
    }


    render(){

        const { location, history } = this.props;
        const { token, components } = this.state;
        const type = this.typeAndClass()['type'];
        const Component = components[type]['component'];
        const mainTitle = components[type]['mainTitle'];

        if( token!='' || token!=null || token!=undefined ){
            return(
                <div className="row account-wrap">
                    <section className="container main-content">
                        <Nav 
                            location= {location}
                            history= {history}
                            type={this.typeAndClass()['type']}
                        />
                        <section className="container-col account-container-wrap" data-flexdirection="column">
                            <section className="container-unit-title">
                                <h2>{mainTitle}</h2>
                            </section>
                            <Component {...this.props} />
                        </section>
                    </section>
                </div>
            )
        }else{
            return null;
        }
    }
    
    componentDidMount() {
        const { token } = this.state;
        if( token=='' || token==null || token==undefined ){
            this.props.history.push('/account');
        }else{
            this.typeAndClass( true );
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        const token = this.state.token;
        const prevStateToken = prevState.token;
        if( token!=prevStateToken ){
            this.props.history.push('/account');
        }
        return null;
    }

    componentDidUpdate(){
        return null;
    }

    typeAndClass = ( turn ) => {
        const { components } = this.state;
        const { location, history } = this.props;
        const pathname = location['pathname'].split('/').filter( item => item!='' );
        let _type = pathname['1'] || 'product';
        let _class = pathname['2'] || null;

        const checkKeys = Object.keys( components ).some( key => {
            return key==_type;
        })
        if( !checkKeys ){
            _type = 'product';
            if( turn ){
                history.push({
                    pathname: '/mystore'
                })
            }
        }

        return { 
            type: _type,
            class: _class
        }
    }
}

const mapStateToProps = (state) => {
    return{
        jwt_account: state.login.jwt_account
    }
}

export default connect(mapStateToProps)(Index);