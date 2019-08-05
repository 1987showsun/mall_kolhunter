import React from 'react';

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
                        { data['gender'] }
                    </div>
                </li>
                <li>
                    <label htmlFor="">生日</label>
                    <div>
                        { data['birthday'] }
                    </div>
                </li>
                <li>
                    <label htmlFor="">聯絡電話</label>
                    <div>
                        {`(${data['tel_code'] || ""}) ${data['tel'] || ""}`}
                    </div>
                </li>
                <li>
                    <label htmlFor="">手機號碼</label>
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
                        { `${data['city'] || ""}${data['district'] || ""}${data['address'] || ""}` }
                    </div>
                </li>
            </ul>
        );
    }
}