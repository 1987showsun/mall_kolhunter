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
                    <label htmlFor="">帳戶名稱</label>
                    <div>
                        { data['bankAccountName'] || "" }
                    </div>
                </li>
                <li>
                    <label htmlFor="">身分證字號</label>
                    <div>
                        { data['memberID'] || "" }
                    </div>
                </li>
                <li>
                    <label htmlFor="">銀行名稱</label>
                    <div>
                        { data['bankName'] || "" }
                    </div>
                </li>
                <li>
                    <label htmlFor="">銀行代號</label>
                    <div>
                        { data['bankCode'] || "" }
                    </div>
                </li>
                <li>
                    <label htmlFor="">分行名稱</label>
                    <div>
                        { data['bankBranchName'] || "" }
                    </div>
                </li>
                <li>
                    <label htmlFor="">帳號</label>
                    <div>
                        { data['bankAccount'] || "" }
                    </div>
                </li>
            </ul>
        );
    }
}