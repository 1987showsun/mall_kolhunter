/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                from 'react';
import queryString          from 'query-string';
import { connect }          from 'react-redux';

// Modules
import Items                from '../../../../../../module/item/planform';
import Loading              from '../../../../../../module/loading';

// Actions
import { programsList }     from '../../../../../../actions/myvendor';

// Lang
import lang                 from '../../../../../../public/lang/lang.json';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading       : false,
            list          : props.list
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            list          : props.list
        }
    }

    render(){

        const { loading, list } = this.state;

        return(
            <>
                <section className="page-title">
                    <h3>{lang['zh-TW']['planform management']}</h3>
                </section>
                <div className="planform-list">
                    {
                        list.map( items => {
                            return(
                                <Items 
                                    key               = {items['token']} 
                                    data              = {items} 
                                    returnBuyPlanform = {this.returnBuyPlanform.bind(this)} 
                                />
                            );
                        })
                    }
                </div>
                <Loading loading={loading} />
            </>
        );
    }

    componentDidMount() {
        const { location }         = this.props;
        const { pathname, search } = location;
        this.setState({
            loading: true,
        },()=>{
            this.props.dispatch( programsList(pathname,{...queryString.parse(search)}) ).then( res => {
                this.setState({
                    loading: false,
                },()=>{
                    switch( res['status'] ){
                        case 200:
                            this.setState({
                                list: res['data']
                            })
                            break;

                        default:
                            break;
                    }
                })
            });
        })
    }

    returnBuyPlanform = ( val, selectedItem ) => {
        const { location, history, match } = this.props;
        const { search } = location;
        const query      = queryString.stringify( {...queryString.parse(search) ,...val} );
        sessionStorage.setItem(`vendorBuyPlanform`,JSON.stringify({...selectedItem,...val}));
        history.push({
            pathname: '/myvendor/planform/payment/step1',
            search: query
        })
    }
}

const mapStateToProps = state => {
    return{
        list: state.myvendor.planformList
    }
}

export default connect( mapStateToProps )( Index );