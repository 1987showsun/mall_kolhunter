import React from "react";
import CurrencyFormat from 'react-currency-format';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt }from '@fortawesome/free-solid-svg-icons';

// Stylesheets
import './style.scss';

export default class InputTable extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            method: props.method || 'normal',
            selected: props.selected || [],
            head: props.tableHeadData || [],
            body: props.tableData || []
        }
    }

    static getDerivedStateFromProps(props, state) {
        return{
            body : props.tableBodyData || []
        }
    }

    render(){

        const { head, body } = this.state;

        return(
            <div className="input-table-wrap">
                {
                    body.length!=0?(
                        <ul className="input-table">
                            <li className="input-table-head">
                                {
                                    head.map((headItem,h_i)=>{
                                        return(
                                            <div key={`head_${h_i}`} className={`${headItem['className']||''}`}>{headItem['title']}</div>
                                        );
                                    })
                                }
                            </li>
                            {
                                body.map((bodyItem,b_i)=>{
                                    return(
                                        <li key={`body_${b_i}`} className="input-table-body">
                                            {
                                                head.map((headItem,h_i)=>{
                                                    return(
                                                        <div key={`single_${h_i}`} className={`${headItem['className']||''}`}>
                                                            {
                                                                headItem['type'] == 'text' &&  
                                                                    <div className={`input-box`}>
                                                                        <input type={headItem['type']} name={headItem['key']} value={ bodyItem[headItem['key']] } onChange={this.handleChange.bind(this,b_i)} />
                                                                    </div>
                                                            }
                                                            {
                                                                headItem['type'] == 'number' &&
                                                                    <div className="input-box">
                                                                        <CurrencyFormat value={bodyItem[headItem['key']]} thousandSeparator={true} onValueChange={(values) => this.handleMemberChange( headItem['key'], values['value'], b_i )}/>
                                                                    </div>
                                                            }
                                                            {
                                                                headItem['type'] == 'tel' &&
                                                                    <div className="input-box">
                                                                        <CurrencyFormat format="###-####" mask="_"/>
                                                                    </div>
                                                            }
                                                            {
                                                                headItem['type'] == 'select' &&
                                                                    <div className="input-box">
                                                                        <select name={headItem['key']} value={bodyItem[headItem['key']]} onChange={this.handleChange.bind(this,b_i)}>
                                                                            {
                                                                                headItem['option'].map( (optionItem,o_i) => {
                                                                                    return(<option key={optionItem['id'] || o_i } value={optionItem['id']}>{optionItem['name']}</option>)
                                                                                })
                                                                            }
                                                                        </select>
                                                                    </div>
                                                            }
                                                            {
                                                                headItem['type'] == 'action' &&
                                                                    <button type="button" onClick={this.removeItem.bind(this,b_i)} className="remove">
                                                                        <i><FontAwesomeIcon icon={faTrashAlt}/></i>
                                                                        刪除
                                                                    </button>
                                                            }
                                                        </div>
                                                    )
                                                })
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>                        
                    ):(
                        <div className="list-no-data">請點選新增條件，新增所需條件</div>
                    )
                }
            </div>
        );
    }

    handleChange = ( b_idx, e ) => {
        const nowDate = new Date();
        let { body } = this.state;
        let name = e.target.name;
        let val = e.target.value;
        body[b_idx][name] = val;
        body[b_idx]['modified'] = nowDate.valueOf();
        this.setState({
            body
        },()=>{
            if( this.props.onChangeData!=undefined ){
                this.props.onChangeData(body);
            }
        })
    }

    handleMemberChange = ( name, val, b_idx ) => {
        const nowDate = new Date();
        let { body } = this.state;
        body[b_idx][name] = val;
        body[b_idx]['modified'] = nowDate.valueOf();
        this.setState({
            body
        },()=>{
            if( this.props.onChangeData!=undefined ){
                this.props.onChangeData(body);
            }
        })
    }

    removeItem = ( b_i ) => {
        let { body } = this.state;
        body.splice(b_i,1);
        this.setState({
            body
        },()=>{
            if( this.props.onChangeData!=undefined ){
                this.props.onChangeData(body);
            }
        })
    }
}