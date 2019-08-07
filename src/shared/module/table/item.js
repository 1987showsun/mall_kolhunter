import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faCheck }from '@fortawesome/free-solid-svg-icons';

// Stylesheets
import './style.scss';

export default class Item extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isSelectedAll: props.isSelectedAll || false,
            selectedBefore: props.selectedBefore || []
        }
    }

    static getDerivedStateFromProps(props, state) {
        return{
            selectedBefore: props.selectedBefore
        }
    }

    render(){

        const {
            data, 
            head 
        } = this.props;

        return(
            <React.Fragment>
                {
                    data.map( (bodyItem,b_i) => {
                        return(
                            <li key={`${bodyItem['id']}_${b_i}`}>
                                {
                                    head.map( (headItem,h_i) => {
                                        return(
                                            <React.Fragment key={`${bodyItem['id']}_${headItem['key']}`} >
                                                {
                                                    headItem['type']=='checkbox' &&
                                                        <div className={`table-body ${headItem['className']||''}`} key={headItem['key']}>
                                                            <label htmlFor={bodyItem['id']} className="checkbox-label">
                                                                <input type="checkbox" id={bodyItem['id']} name="checkSelect" className="admin-checkbox" value={bodyItem['id']} onChange={this.handleChackboxChange.bind(this,bodyItem)} checked={ this.checkIfItIsSelected( bodyItem['id'] ) }/>
                                                                <i className="checkbox_icon">
                                                                    <FontAwesomeIcon icon={faCheck} />
                                                                </i>
                                                            </label>
                                                        </div>
                                                }
                                                {
                                                    headItem['type']=='ranking' &&
                                                        <div className={`table-body ${headItem['className']||''}`} key={headItem['key']}>
                                                            {String(b_i+1).length<=1? `0${b_i+1}`:`${b_i+1}`}
                                                        </div>
                                                }
                                                {
                                                    headItem['type']=='button' &&
                                                        <div className={`table-body ${headItem['className']||''}`} key={headItem['key']}>
                                                            <button className={`status-${bodyItem['status']}`} disabled={ bodyItem['status']=="none-auth" } onClick={this.tableButtonAction.bind(this,headItem['key'],bodyItem)}>
                                                                { headItem['text'][bodyItem['status']] }
                                                            </button>
                                                        </div>
                                                }
                                                {
                                                    headItem['type']=='img' &&
                                                        <div className={`table-body ${headItem['className']||''}`} key={headItem['key']}>
                                                            <img src={bodyItem[headItem['key']]} title="" alt="" />
                                                        </div>
                                                }
                                                {
                                                    headItem['type']=='link' &&
                                                        <div className={`table-body ${headItem['className']||''}`} key={headItem['key']}>
                                                            <Link to={`${headItem['path']}/${bodyItem['id']}`}>{bodyItem[headItem['key']]}</Link>
                                                        </div>
                                                }
                                                {
                                                    headItem['type']=='text' &&
                                                        <div className={`table-body ${headItem['className']||''}`} key={headItem['key']}>
                                                            {bodyItem[headItem['key']]}
                                                        </div>
                                                }
                                                {
                                                    headItem['type']=='number' &&
                                                        <div className={`table-body ${headItem['type']} ${headItem['className']||''}`} key={headItem['key']}>
                                                            <CurrencyFormat value={bodyItem[headItem['key']]|| ""} displayType={'text'} thousandSeparator={true} prefix={''} />
                                                        </div>
                                                }
                                                {
                                                    headItem['type']=='percent' &&
                                                        <div className={`table-body ${headItem['type']} ${headItem['className']||''}`} key={headItem['key']}>
                                                            <CurrencyFormat value={bodyItem[headItem['key']] || ""} displayType={'text'} thousandSeparator={true}/> %
                                                        </div>
                                                }
                                                {
                                                    headItem['type']=='other' &&
                                                        <div className={`table-body ${headItem['type']} ${headItem['className']||''}`} key={headItem['key']}>
                                                            {
                                                                headItem['link'].map((linkItem,l_i)=>{
                                                                    return <a key={`link_${l_i}`} href={`${linkItem['path']}/${bodyItem['id']}${this.serachMap(bodyItem,linkItem)}`} >{linkItem['text']}</a>
                                                                })
                                                            }
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

    serachMap = ( bodyItem,linkItem ) => {
        let query = '';
        if( linkItem.hasOwnProperty('query') ){
            query = '?';
            linkItem['query'].map( (key,i) => {
                if( i==linkItem['search'].length-1 ){
                    query = query + `${key}=${bodyItem[key]}`;
                }else{
                    query = query + `${key}=${bodyItem[key]}`+ '&';
                }
            })
        }

        return query;
    }

    handleChackboxChange = ( selectedItem,e) => {
        const val = e.target.value;
        if( this.props.singleSelection!=undefined ){
            this.props.singleSelection(val,selectedItem);
        }
    }

    checkIfItIsSelected = ( id ) => {
        const { selectedBefore } = this.state;
        return selectedBefore.some( someItem => id==someItem['id']);
    }

    tableButtonAction = ( method , val ) => {
        const returnVal = { ...val, 't_method': method };
        if( this.props.tableButtonAction!=undefined ){
            this.props.tableButtonAction( returnVal );
        }
    }
}