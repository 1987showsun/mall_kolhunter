/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                from 'react';
import dayjs                from 'dayjs';

// Lang
import lang                 from '../../../../../public/lang/lang.json';

export default class List extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: props.data
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            data: props.data
        }
    }

    render(){

        const { data } = this.state;

        return(
            <ul className="table-row-list">
                <li>
                    <label htmlFor="">會員姓名</label>
                    <div>
                        { data['name'] }
                    </div>
                </li>
                <li>
                    <label htmlFor="">暱稱</label>
                    <div>
                        { data['nickname'] }
                    </div>
                </li>
                <li>
                    <label htmlFor="">性別</label>
                    <div>
                        { lang['zh-TW']['gender'][data['gender']] }
                    </div>
                </li>
                <li>
                    <label htmlFor="">生日</label>
                    <div>
                        { dayjs(data['birthday']).format('YYYY/MM/DD') }
                    </div>
                </li>
                <li>
                    <label htmlFor="">聯絡電話</label>
                    <div>
                        { data['phone'] }
                    </div>
                </li>
                <li>
                    <label htmlFor="">信箱 (帳號)</label>
                    <div>
                        { data['email'] }
                    </div>
                </li>
                <li>
                    <label htmlFor="">地址</label>
                    <div>
                        { `${data['zipCode'] || ""} ${data['city'] || ""}${data['dist'] || ""}${data['address'] || ""}` }
                    </div>
                </li>
            </ul>
        );
    }
}