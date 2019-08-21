// 訂單-退貨
import React from 'react';
import { connect } from 'react-redux';

// Modules
import Table from '../../../../../module/table';
import Confirm from '../../../../../module/confirm';

const demo = [
    {
        id: "00000001",
        cover: "https://s.yimg.com/zp/MerchandiseImages/A0CEBA3A7A-SP-6940133.jpg",
        name: "【福利品】Apple iPhone X 64G 智慧型手機",
        itemNum: 1,
        actualPrice: "21900"
    },
    {
        id: "00000002",
        cover: "https://s.yimg.com/zp/MerchandiseImages/ED0EEA05CC-SP-7032064.jpg",
        name: "Beats Solo 3 Wireless Club 頭戴耳機",
        itemNum: 2,
        actualPrice: "6990"
    }
]

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            open: false,
            pupopMSG: "",
            method: 'confirm',
            selected: [],
            tableHeadData : [
                {
                    key: 'checkbox',
                    type: 'checkbox',
                    title: ''
                },
                {
                    key: 'cover',
                    type: 'img',
                    title: '圖片',
                    className: 'img-width'
                },
                {
                    key: 'name',
                    type: 'link',
                    title: '名稱',
                    className: 'table-min-width',
                    path: '/myvendor/info/product'
                },
                {
                    key: 'itemNum',
                    type: 'number',
                    title: '數量'
                },
                {
                    key: 'actualPrice',
                    type: 'number',
                    title: '購買價格'
                }
            ],
        }
    }

    render(){

        const { loading, open, method, pupopMSG, selected, tableHeadData } = this.state;

        return(
            <React.Fragment>
                <section className="container-unit">
                    <div className="unit-head">
                        <h3>訂單資訊</h3>
                    </div>
                    <ul className="table-row-list">
                        <li>
                            <label>訂單編號</label>
                            <div>CART417d388aea8223923f9f</div>
                        </li>
                        <li>
                            <label>訂購日期</label>
                            <div>2018/10/10</div>
                        </li>
                    </ul>
                </section>
                <section className="container-unit">
                    <div className="unit-head">
                        <h3>該筆訂單商品</h3>
                    </div>
                    <Table 
                        tableHeadData= {tableHeadData}
                        tableBodyData= {demo}
                        returnCheckbox= { (val) => {this.setState({ selected: val })} }
                    />
                </section>

                <section className="container-unit">
                    <div className="container-unit-action">
                        <ul>
                            <li><button onClick={this.action.bind(this,'cancel')} className="cancel">返回上頁</button></li>
                            <li><button onClick={this.action.bind(this,'submit')} className="mall-yes">確定退貨</button></li>
                        </ul>
                    </div>
                </section>

                <Confirm 
                    open={open}
                    method= {method}
                    header= {`您確定要退貨以下商品嗎？`}
                    container={pupopMSG}
                    onCancel={this.onCancel.bind(this)}
                    onConfirm={this.handleConfirm.bind(this)}
                />
            </React.Fragment>
        );
    }

    action = ( method ) => {
        switch( method ){
            case 'submit':
                const { selected } = this.state;
                if( selected.length!=0 ){
                    let pupopMSG = "";
                    selected.map( (item,i) => {
                        pupopMSG = `${pupopMSG}<div class="items">${i+1}. ${item['name']}</div>`
                    })
                    this.setState({
                        open: true,
                        pupopMSG
                    })
                }
                break;
            default:
                break;
        }
    }

    onCancel = () => {
        this.setState({
            open: false,
            method: 'confirm',
            header: '',
            pupopMSG: ''
        })
    }

    handleConfirm = () => {

        if( this.state.method=='alert' ){
            this.onCancel();
        }else{
            this.setState({
                method: 'alert',
                pupopMSG: '已送出退貨請求'
            })            
        }

    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Index );