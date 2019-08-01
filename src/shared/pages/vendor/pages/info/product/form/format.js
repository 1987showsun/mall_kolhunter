import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus }from '@fortawesome/free-solid-svg-icons';

// Components
import InputTable from '../../../../../../module/inputTable';

// Actions
import { createProduct } from '../../../../../../actions/vendor';

class Format extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            id: props.id,
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
            ]
        }
    }

    render(){

        const { data, inputTableHeadKey } = this.state;
        return(
            <section className="admin-content-row">
                <article className="admin-content-title">
                    <h4>商品規格</h4>
                    <button type="button" onClick={this.addCondition.bind(this)}>
                        <i><FontAwesomeIcon icon={faPlus} /></i>
                        新增規格
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
        let { data } = this.state;
        data = [
            ...data, 
            {
                id: "",
                name: "",
                sku: "",
                quantity: 0,
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
            id: id,
            spec: data
        }
        this.props.dispatch( createProduct('product', updateForm , 3 , 'post' ) ).then( res => {
            switch( res['status'] ){
                case 200:
                    this.props.returnResult(data);
                    break;
            }
        });
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Format );