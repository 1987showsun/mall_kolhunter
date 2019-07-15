import React from 'react';

//Compoents
import Table from '../../../module/table';

// Demo
const demoData = [
    {
        id: "123qwdmkmdcmqwlefc",
        ranking: 1,
        name: "蔡阿嘎",
        sales: 1234,
        total_sales: 102231,
        profit: 10223
    },
    {
        id: "asdkplk123123-0-10294-",
        ranking: 2,
        name: "陳癡漢",
        sales: 1234,
        total_sales: 102231,
        profit: 10223
    },
    {
        id: "sdcpqw30402123123343234",
        ranking: 3,
        name: "Nico品筠&Kim京燁 【那對夫妻】",
        sales: 1234,
        total_sales: 102231,
        profit: 10223
    }
]

export default class Product extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            tableHeadKey : [
                {
                    key: 'ranking',
                    type: 'ranking',
                    title: '排名',
                    className: 'ranking'
                },
                {
                    key: 'name',
                    type: 'text',
                    title: '網紅名稱',
                    className: 'table-min-width'
                },
                {
                    key: 'sales',
                    type: 'number',
                    title: '銷售數量',
                    className: 'number'
                },
                {
                    key: 'total_sales',
                    type: 'number',
                    title: '銷售總額',
                    className: 'number'
                },
                {
                    key: 'profit',
                    type: 'number',
                    title: '分得利潤',
                    className: 'number'
                }
            ]
        }
    }

    render(){

        const { tableHeadKey } = this.state;

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <ul className="admin-product-img-ul">
                        <li>
                            <img src="https://cf.shopee.tw/file/7f45df53d871582bfa8434b1db2af16d" alt="" title="" />
                        </li>
                        <li>
                            <img src="https://cf.shopee.tw/file/7cff239a11ae571214341b946cb79374" alt="" title="" />
                        </li>
                        <li>
                            <img src="https://cf.shopee.tw/file/e02514dcfedbd418fe3d34eb4e5dc32b" alt="" title="" />
                        </li>
                        <li>
                            <img src="https://cf.shopee.tw/file/b4b2e16f8971d535070709d5f50476da" alt="" title="" />
                        </li>
                    </ul>
                </section>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>基本資料</h4>
                    </article>
                </section>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>運送方式</h4>
                    </article>
                </section>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>店家排行</h4>
                    </article>
                    <Table 
                        tableHeadData={tableHeadKey}
                        tableBodyData={demoData}
                    />
                </section>
            </React.Fragment>
        );
    }
}