/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                         from 'react';
import queryString                   from 'query-string';
import { connect }                   from 'react-redux';

//Compoents
import Basic                         from './components/basic';
import Recipient                     from './components/recipient';
import Products                      from './components/product';

// Actions
import { orderInfo }                 from '../../../../../../actions/myvendor';

class Info extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            refundStep       : ['request','delivery','recived','choice'],
            info             : props.info,
            loading          : false
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            info             : props.info
        }
    }

    render(){

        const { location, match } = this.props;
        const { loading, info }   = this.state;

        return(
            <React.Fragment>
                <Basic 
                    loading         = {loading}
                    data            = {info}
                />
                <Recipient 
                    loading         = {loading}
                    data            = {info}
                />
                <Products
                    location        = {location}
                    match           = {match}
                    loading         = {loading}
                    info            = {info}
                />
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.callAPI();
    }

    callAPI = () => {

        const { location, match }  = this.props;
        const { pathname, search } = location;
        const orderID              = match['params']['id'];

        this.setState({
            loading: true,
        },()=>{
            this.props.dispatch( orderInfo(pathname,{...queryString.parse(search), orderID }) ).then( res => {
                this.setState({
                    loading: false
                },()=>{
                    switch( res['status'] ){
                        case 200:
                            this.setState({
                                info: res['data']
                            })
                            break;

                        default:

                            break;
                    }
                })
            });
        })
    }
}

const mapStateToProps = state => {
    return{
        info: state.myvendor.orderInfo
    }
}

export default connect( mapStateToProps )( Info );