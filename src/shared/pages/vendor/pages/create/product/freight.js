import React from 'react';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus }from '@fortawesome/free-solid-svg-icons';

// Components
import InputTable from '../../../../../module/inputTable';

export default class Freight extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data : props.data,
            tableHeadKey : [
                {
                    key: 'method',
                    type: 'select',
                    title: '貨運名稱',
                    option: [
                        {
                            value: 0,
                            text: '7-11 黑貓宅急便'
                        },
                        {
                            value: 1,
                            text: '全家 宅配通'
                        },
                        {
                            value: 2,
                            text: '新竹貨運'
                        },
                        {
                            value: 3,
                            text: '大榮貨運'
                        }
                    ]
                },
                {
                    key: 'price',
                    type: 'number',
                    title: '費用',
                    className: 'number'
                },
                {
                    key: 'action',
                    type: 'action',
                    title: '其他'
                }
            ]
        }
    }

    render(){

        const { tableHeadKey, data } = this.state;

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>運送方式</h4>
                        <button type="button" onClick={this.addCondition.bind(this)}>
                            <i><FontAwesomeIcon icon={faPlus} /></i>
                            新增條件
                        </button>
                    </article>
                    <div className="admin-content-container">
                        <InputTable 
                            tableHeadData={tableHeadKey}
                            tableBodyData={data}
                            onChangeData={this.onChangeData.bind(this)}
                        />
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
                price: 0
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