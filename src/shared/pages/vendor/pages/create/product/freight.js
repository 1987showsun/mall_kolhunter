import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus }from '@fortawesome/free-solid-svg-icons';

// Components
import InputTable from '../../../../../module/inputTable';

// Actions
import { deliveries } from '../../../../../actions/common';

class Freight extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            deliveries: [],
            data : props.data || [],
            tableHeadKey : [
                {
                    key: 'deliveryID',
                    type: 'select',
                    title: '貨運名稱',
                    options: []
                },
                {
                    key: 'deliveryCost',
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

    componentDidMount() {
        const { tableHeadKey } = this.state;
        this.props.dispatch( deliveries() ).then( res => {

            const options = res['data'].map( (item,i)=> {
                return{
                    value: item['id'],
                    name: item['name']
                }
            })
            tableHeadKey[0]['options'] = options;

            this.setState({
                deliveries: options,
                tableHeadKey
            })
        });
        
        this.returnBack();
    }

    onChangeData = ( data ) => {
        this.setState({
            data
        },()=>{
            this.returnBack();
        })
    }
    
    addCondition = () => {
        const nowDate = new Date();
        const { deliveries } = this.state;
        let { data } = this.state;
        data = [
            ...data, 
            {
                id: "",
                deliveryID: deliveries[0]['value'],
                deliveryCost: 0,
                modified: nowDate.valueOf()
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

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Freight );