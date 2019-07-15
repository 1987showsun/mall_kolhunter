import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faCheck }from '@fortawesome/free-solid-svg-icons';

// Stylesheets
import './style.scss';

export default class Item extends React.Component{
    render(){

        const { data,head,selected } = this.props;

        return(
            <React.Fragment>
                {
                    data.map( (bodyItem,b_i) => {
                        return(
                            <li key={bodyItem['id']}>
                                {
                                    head.map( (headItem,h_i) => {
                                        return(
                                            <React.Fragment key={`${bodyItem['id']}_${headItem['key']}`} >
                                                {
                                                    headItem['type']=='checkbox' &&
                                                        <div className={`table-body ${headItem['className']||''}`}>
                                                            <label htmlFor={bodyItem['id']} className="checkbox-label">
                                                                <input type="checkbox" id={bodyItem['id']} name="checkSelect" className="admin-checkbox" value={bodyItem['id']} onChange={this.handleChackboxChange.bind(this)} checked={selected.includes(bodyItem['id'])}/>
                                                                <i className="checkbox_icon">
                                                                    <FontAwesomeIcon icon={faCheck} />
                                                                </i>
                                                            </label>
                                                        </div>
                                                }
                                                {
                                                    headItem['type']=='ranking' &&
                                                        <div className={`table-body ${headItem['className']||''}`}>
                                                            {String(b_i+1).length<=1? `0${b_i+1}`:`${b_i+1}`}
                                                        </div>
                                                }
                                                {
                                                    headItem['type']=='button' &&
                                                        <div className={`table-body ${headItem['className']||''}`}>
                                                            <button className={`status${bodyItem['status']}`} onClick={this.tableButtonAction.bind(this,headItem['key'],bodyItem)}>
                                                                { headItem['text'][bodyItem['status']] }
                                                            </button>
                                                        </div>
                                                }
                                                {
                                                    headItem['type']=='img' &&
                                                        <div className={`table-body ${headItem['className']||''}`}>
                                                            <img src={bodyItem[headItem['key']]} title="" alt="" />
                                                        </div>
                                                }
                                                {
                                                    headItem['type']=='link' &&
                                                        <div className={`table-body ${headItem['className']||''}`}>
                                                            <Link to={`${headItem['path']}/${bodyItem['id']}`}>{bodyItem[headItem['key']]}</Link>
                                                        </div>
                                                }
                                                {
                                                    headItem['type']=='text' &&
                                                        <div className={`table-body ${headItem['className']||''}`}>
                                                            {bodyItem[headItem['key']]}
                                                        </div>
                                                }
                                                {
                                                    headItem['type']=='number' &&
                                                        <div className={`table-body ${headItem['type']} ${headItem['className']||''}`}>
                                                            <CurrencyFormat value={bodyItem[headItem['key']]} displayType={'text'} thousandSeparator={true} prefix={''} />
                                                        </div>
                                                }
                                                {
                                                    headItem['type']=='percent' &&
                                                        <div className={`table-body ${headItem['type']} ${headItem['className']||''}`}>
                                                            <CurrencyFormat value={bodyItem[headItem['key']]} displayType={'text'} thousandSeparator={true}/> %
                                                        </div>
                                                }
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </li>
                        )
                    })
                }
            </React.Fragment>
        );
    }

    handleChackboxChange = (e) => {
        const val = e.target.value;
        if( this.props.selectedAction!=undefined ){
            this.props.selectedAction(val);
        }
    }

    tableButtonAction = ( method , val ) => {
        const returnVal = { ...val, 't_method': method };
        if( this.props.onTClick!=undefined ){
            this.props.onTClick( returnVal );
        }
    }
}