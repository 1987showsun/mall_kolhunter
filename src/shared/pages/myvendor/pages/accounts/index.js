/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React              from 'react';
import dayjs              from 'dayjs';
import queryString        from 'query-string';
import { connect }        from 'react-redux';

// Components
import Head               from './head';
import Thead              from './table/thead';
import Tbody              from './table/tbody';
import PopupOrderDetail   from './popup';

// Modules
import Table              from '../../../../module/table-new';
import Loading            from '../../../../module/loading';
import Popup              from '../../../../module/popup';

// Actions
import { incListAccount } from '../../../../actions/myvendor';

// Lang
import lang               from '../../../../public/lang/lang.json';

class Account extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            popupStatus             : false,
            loading                 : false,
            list                    : [],
            selectedShowOrderDetail : []
        }
    }

    static getDerivedStateFromProps ( props,state ){
        return{
            list             : props.list
        }
    }

    render(){

        const { match, history, location }   = this.props;
        const { popupStatus, loading, list, selectedShowOrderDetail } = this.state;

        return(
            <>
                <section className="page-title">
                    <h3>{ lang['zh-TW']['account details'] }</h3>
                </section>
                <Head 
                    match        = {match}
                    history      = {history}
                    location     = {location}
                />
                <section className="admin-content-row">
                    <Table
                        thead = {<Thead />}
                    >
                        {
                            list.map(item => {
                                return (
                                    <Tbody 
                                        {...item}
                                        key                   = {item['orderID']}
                                        handleShowOrderDetail = {()=>{
                                            this.setState({
                                                popupStatus             : true,
                                                selectedShowOrderDetail : item['orderDetail']
                                            })
                                        }}
                                    />
                                );
                            })
                        }
                    </Table>
                    <Loading loading={loading} />
                </section>

                <Popup
                    className         = "orderDetail-popup-wrap"
                    popupStatus       = {popupStatus}
                    returnPopupStatus = {()=>{
                        this.setState({
                            popupStatus: false,
                        })
                    }}
                >
                    <PopupOrderDetail 
                        list = {selectedShowOrderDetail}
                    />
                </Popup>
            </>
        );
    }

    componentDidMount() {
        this.callAPI();
    }

    componentDidUpdate(prevProps, prevState) {
        const search          = queryString.parse(this.props.location.search);
        const prevPropsSearch = queryString.parse(prevProps.location.search);
        let   request         = false;
        
        // 比對 search 有沒有變動
        if( Object.keys(search).length>Object.keys(prevPropsSearch).length ){
            request = Object.keys(search).some( keys => search[keys]!=prevPropsSearch[keys] );
        }else{
            request = Object.keys(prevPropsSearch).some( keys => prevPropsSearch[keys]!=search[keys] );
        }
        if( request ){
            this.callAPI();
        }
    }

    callAPI = () => {
        const { location }         = this.props;
        const { pathname, search } = location;
        this.setState({
            loading: true
        },()=>{
            this.props.dispatch( incListAccount( pathname,{...queryString.parse(search)} ) ).then(res => {
                this.setState({
                    loading: false
                })
            });
        })
    }
}

const mapStateToProps = (state) => {
    return{
        list: state.myvendor.accountsList
    }
}

export default connect(mapStateToProps)(Account);