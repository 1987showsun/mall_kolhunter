import React from 'react';

//Compoents
import Table from '../../../../../module/table';

// Demo
const demoData = [
    {
        id: "123qwdmkmdcmqwlefc",
        name: "Msi 微星24型Optix G24C 曲面電競螢幕 全新 附發票",
        quantity: 1,
        format: "黑/M",
        store: "蔡阿嘎"
    },
    {
        id: "asdkplk123123-0-10294-",
        name: "Apple iPhone XS 256GB-全新未拆封未開通",
        quantity: 2,
        format: "黑/M",
        store: "毛毛蟲網路繪本 + 蟲點子創意設計"
    },
    {
        id: "sdcpqw30402123123343234",
        name: "SONY SRS-XB12 EXTRA BASS 藍牙喇叭 續航力16小時 [免運 台灣索尼公司貨]",
        quantity: 10,
        format: "黑/M",
        store: "鄭茵聲 Alina Cheng"
    }
]

export default class Product extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            tableHeadKey : [
                {
                    key: 'id',
                    type: 'text',
                    title: '商品編號'
                },
                {
                    key: 'name',
                    type: 'text',
                    title: '商品名稱',
                    className: 'table-min-width'
                },
                {
                    key: 'quantity',
                    type: 'number',
                    title: '數量'
                },
                {
                    key: 'format',
                    type: 'text',
                    title: '顏色 / 尺寸'
                },
                {
                    key: 'store',
                    type: 'text',
                    title: '販賣店鋪'
                }
            ]
        }
    }

    render(){

        const { tableHeadKey } = this.state;

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>基本資料</h4>
                    </article>
                    <form>
                        <ul className="table-row-list">
                            <li>
                                <label>訂單編號：</label>
                                <div>MALLKOL00000000000001</div>
                            </li>
                            <li>
                                <label>訂購時間：</label>
                                <div>2019-12-12 12:12:30</div>
                            </li>
                            <li>
                                <label>購買數量：</label>
                                <div>4</div>
                            </li>
                            <li>
                                <label>訂單狀態：</label>
                                <div>
                                    <div className="input-box select">
                                        <select name="status" onChange={this.handleChange.bind(this,'order_status')}>
                                            <option value="2">完成</option>
                                            <option value="3">取消訂單</option>
                                        </select>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <label>運送方式：</label>
                                <div>7-11 黑貓宅急便</div>
                            </li>
                            <li>
                                <label>運送狀態：</label>
                                <div>
                                    <div className="input-box select">
                                        <select name="status" onChange={this.handleChange.bind(this,'delivery_status')}>
                                            <option value="0">待出貨</option>
                                            <option value="1">運送中</option>
                                            <option value="4">退貨</option>
                                        </select>
                                    </div>
                                </div>
                            </li>
                            {/* <li>
                                <label>配送序號：</label>
                                <div>
                                    <div className="input-box">
                                        <input type="text" name="series_number" value="" />
                                    </div>
                                </div>
                            </li> */}
                            <li>
                                <label>付款方式：</label>
                                <div>ATM</div>
                            </li>
                            <li>
                                <label>付款狀態：</label>
                                <div>已付款</div>
                            </li>
                        </ul>
                        <div className="action">
                            <button>更新</button>
                        </div>           
                    </form>
                </section>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>購買人資料</h4>
                    </article>
                    <ul className="table-row-list">
                        <li>
                            <label>訂購人：</label>
                            <div>零八九五七</div>
                        </li>
                        <li>
                            <label>聯絡電話：</label>
                            <div>02-27991234</div>
                        </li>
                        <li>
                            <label>手機號碼：</label>
                            <div>0912123123</div>
                        </li>
                        <li>
                            <label>信箱：</label>
                            <div>test@test.com</div>
                        </li>
                        <li>
                            <label>聯絡地址：</label>
                            <div>11419 台北市內湖區成功路100號100樓之1</div>
                        </li>
                    </ul>
                </section>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>寄送資料資料</h4>
                    </article>
                    <ul className="table-row-list">
                        <li>
                            <label>訂購人：</label>
                            <div>蔡依林</div>
                        </li>
                        <li>
                            <label>聯絡電話：</label>
                            <div>02-27991234</div>
                        </li>
                        <li>
                            <label>手機號碼：</label>
                            <div>0912123123</div>
                        </li>
                        <li>
                            <label>信箱：</label>
                            <div>test@test.com</div>
                        </li>
                        <li>
                            <label>聯絡地址：</label>
                            <div>11419 台北市內湖區成功路100號100樓之1</div>
                        </li>
                    </ul>
                </section>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>發票</h4>
                    </article>
                    <ul className="table-row-list">
                        <li>
                            <label>訂購人：</label>
                            <div>蔡依林</div>
                        </li>
                        <li>
                            <label>聯絡電話：</label>
                            <div>02-27991234</div>
                        </li>
                        <li>
                            <label>手機號碼：</label>
                            <div>0912123123</div>
                        </li>
                    </ul>
                </section>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>清單</h4>
                    </article>
                    <Table 
                        tableHeadData={tableHeadKey}
                        tableBodyData={demoData}
                    />
                </section>
            </React.Fragment>
        );
    }

    handleChange = ( key,e ) => {

    }
}