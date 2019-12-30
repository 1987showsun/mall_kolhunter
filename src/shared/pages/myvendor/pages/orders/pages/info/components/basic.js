/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';

// Modules
import Loading from '../../../../../../../module/loading';

// Lang
import lang from '../../../../../../../public/lang/lang.json';

class Basic extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            data: props.data
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            loading: props.loading,
            data: props.data
        }
    }

    render(){

        const { loading, data } = this.state;

        return(
            <section className="admin-content-row">
                <article className="admin-content-title">
                    <h4>基本資料</h4>
                </article>
                <form>
                    <ul className="table-row-list">
                        <li>
                            <label>訂單編號</label>
                            <div>{data['orderID'] || ""}</div>
                        </li>
                        <li>
                            <label>訂購時間</label>
                            <div>{dayjs(data['orderTimeMs'] || 0).format('YYYY/MM/DD')}</div>
                        </li>
                        <li>
                            <label>購買數量</label>
                            <div>{data['orderDetail']!=undefined? data['orderDetail'].length:0}</div>
                        </li>
                        <li>
                            <label>付款狀態</label>
                            <div>{lang['zh-TW']['orderStatus'][data['orderStatus']]}</div>
                        </li>
                    </ul>     
                </form>
                <Loading loading={loading} />
            </section>
        );
    }

    handleChange = (e) => {

    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Basic );