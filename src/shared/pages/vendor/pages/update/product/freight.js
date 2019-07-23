import React from 'react';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus }from '@fortawesome/free-solid-svg-icons';

// Components
import InputTable from '../../../../../module/inputTable';
import Table from '../../../../../module/table';

export default class Freight extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            status: props.status,
            data : props.data,
            inputTableHeadKey : [
                {
                    key: 'method',
                    type: 'select',
                    title: '貨運名稱',
                    option: [
                        {
                            id: 0,
                            text: '7-11 黑貓宅急便'
                        },
                        {
                            id: 1,
                            text: '全家 宅配通'
                        },
                        {
                            id: 2,
                            text: '新竹貨運'
                        },
                        {
                            id: 3,
                            text: '大榮貨運'
                        }
                    ]
                },
                {
                    key: 'fee',
                    type: 'number',
                    title: '費用',
                    className: 'number'
                },
                {
                    key: 'action',
                    type: 'action',
                    title: '其他'
                }
            ],
            normalTableHeadKey : [
                {
                    key: 'method',
                    type: 'text',
                    title: '貨運名稱',
                },
                {
                    key: 'fee',
                    type: 'number',
                    title: '費用',
                    className: 'number'
                }
            ],
        }
    }

    render(){

        const { inputTableHeadKey, normalTableHeadKey, data, status } = this.state;

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>運送方式</h4>
                        {
                            status==2 &&
                                <button type="button" onClick={this.addCondition.bind(this)}>
                                    <i><FontAwesomeIcon icon={faPlus} /></i>
                                    新增條件
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
                method: 0,
                fee: 0
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
        this.props.onHandleChange('5',data);
    }
}