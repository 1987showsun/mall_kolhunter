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
        const checkHasData = Object.keys( data ).some( keys => {
            return data[keys]!=null;
        })

        if( checkHasData ){
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
        }else{
            return(
                <div className="container-unit-null">未新增銀行資料，請點選編輯進行新增</div>
            );
        }
    }
}