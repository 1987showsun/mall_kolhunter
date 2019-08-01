import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus }from '@fortawesome/free-solid-svg-icons';

// Components
import InputTable from '../../../../../../module/inputTable';

// Actions
import { createProduct } from '../../../../../../actions/vendor';

class Freight extends React.Component{

    constructor(props){

        const options = props.deliveries.map( (item,i)=> {
            return{
                value: item['id'],
                name: item['name']
            }
        })

        super(props);
        this.state = {
            id: props.id,
            deliveries: props.deliveries,
            data : props.data,
            inputTableHeadKey : [
                {
                    key: 'deliveryID',
                    type: 'select',
                    title: '貨運名稱',
                    options: options
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

        const { inputTableHeadKey, data } = this.state;

        return(
            <section className="admin-content-row">
                <article className="admin-content-title">
                    <h4>運送方式</h4>
                    <button type="button" onClick={this.addCondition.bind(this)}>
                        <i><FontAwesomeIcon icon={faPlus} /></i>
                        新增條件
                    </button>
                </article>
                <div className="admin-content-container">     
                    <form onSubmit={this.handleSubnit.bind(this)}>
                        <InputTable 
                            tableHeadData={inputTableHeadKey}
                            tableBodyData={data}
                            onChangeData={this.onChangeData.bind(this)}
                        />
                        <ul className="action-ul">
                            <li><button type="button" className="cancel" onClick={this.props.returnCancel.bind(this)}>取消</button></li>
                            <li><button className="basic">更新</button></li>
                        </ul>
                    </form>
                </div>
            </section>
        );
    }

    onChangeData = ( data ) => {
        this.setState({
            data
        })
    }
    
    addCondition = () => {
        const nowDate = new Date();
        let { data, deliveries } = this.state;
        data = [
            ...data, 
            {
                id: "",
                deliveryID: deliveries[0]['id'],
                deliveryCost: "0",
                modified: nowDate.valueOf()
            }
        ]
        this.setState({
            data
        })
    }

    handleSubnit = (e) => {
        e.preventDefault();
        const { id, data } = this.state;
        const updateForm = {
            id,
            deliveries: data
        }
        this.props.dispatch( createProduct('product', updateForm , 5 , 'post' ) ).then( res => {
            switch( res['status'] ){
                case 200:
                    const result = data;
                    this.props.returnResult( result );
                    break;
            }
        });
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Freight );