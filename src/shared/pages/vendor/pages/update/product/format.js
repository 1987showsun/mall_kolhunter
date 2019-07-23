import React from 'react';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus }from '@fortawesome/free-solid-svg-icons';

// Components
import Table from '../../../../../module/table';
import InputTable from '../../../../../module/inputTable';

export default class Format extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            status: props.status,
            data: props.data,
            inputTableHeadKey : [
                {
                    key: 'name',
                    type: 'text',
                    title: '型號 / 尺寸'
                },
                {
                    key: 'sku',
                    type: 'text',
                    title: '商品貨號'
                },
                {
                    key: 'quantity',
                    type: 'number',
                    title: '庫存數量',
                    className: 'number'
                },
                {
                    key: 'action',
                    type: 'action',
                    title: '其他'
                }
            ],
            normalTableHeadKey: [
                {
                    key: 'name',
                    type: 'text',
                    title: '型號 / 尺寸'
                },
                {
                    key: 'sku',
                    type: 'text',
                    title: '商品貨號'
                },
                {
                    key: 'quantity',
                    type: 'number',
                    title: '庫存數量',
                    className: 'number'
                }
            ]
        }
    }

    render(){

        const { data, inputTableHeadKey, normalTableHeadKey, status } = this.state;

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>商品規格</h4>
                        {
                            status==2 &&
                                <button type="button" onClick={this.addCondition.bind(this)}>
                                    <i><FontAwesomeIcon icon={faPlus} /></i>
                                    新增規格
                                </button>
                        }
                    </article>
                    <div className="admin-content-container">
                        {
                            status==2? (
                                <InputTable 
                                    tableHeadData={inputTableHeadKey}
                                    tableBodyData={data}
                                    onChangeData={this.onChangeData.bind(this)}
                                />
                            ):(
                                <Table 
                                    tableHeadData={normalTableHeadKey}
                                    tableBodyData={data}
                                />
                            )
                        }
                    </div>
                </section>
            </React.Fragment>
        );
    }

    onChangeData = ( data ) => {
        this.setState({
            data
        },()=>{
            this.returnBack();
        })
    }

    addCondition = () => {
        let { data } = this.state;
        data = [
            ...data, 
            {
                name: "",
                sku: "",
                quantity: 0
            }
        ]
        this.setState({
            data
        },()=>{
            this.returnBack();
        })
    }

    returnBack = () => {
        const { data } = this.state;
        this.props.onHandleChange('3',data);
    }
}