import React from 'react';
import dayjs from 'dayjs';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faCheck }from '@fortawesome/free-solid-svg-icons';

// Stylesheets
import './style.scss';

export default class Item extends React.Component{

    constructor(props){
        super(props);
        this.items = React.createRef();
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
            inputValue,
            data, 
            head 
        } = this.props;

        return(
            <React.Fragment>
                {
                    data.map( (bodyItem,b_i) => {
                        return(
                            <li ref={this.items} key={`${bodyItem['id']}_${b_i}`} id={`${bodyItem['id']!=undefined? bodyItem['id']:""}`}>
                                {
                                    head.map( (headItem,h_i) => {
                                        return(
                                            <React.Fragment key={`${bodyItem['id']}_${headItem['key']}`} >
                                                {
                                                    headItem['type']=='checkbox' &&
                                                        <div className={`table-body ${headItem['className']||''}`} key={headItem['key']}>
                                                            <label htmlFor={bodyItem['id']} className="checkbox-label">
                                                                <input type="checkbox" id={bodyItem['id']} name="checkSelect" className="admin-checkbox" value={bodyItem['id']} onChange={this.handleChackboxChange.bind(this,bodyItem)} checked={ this.checkIfItIsSelected( bodyItem['id'] ) } disabled={bodyItem['disabled']||false}/>
                                                                <i className="checkbox_icon">
                                                                    <FontAwesomeIcon icon={faCheck} />
                                                                </i>
                                                            </label>
                                                        </div>
                                                }
                                                {
                                                    headItem['type']=='select' &&
                                                        <div className={`table-body ${headItem['className']||''}`} key={headItem['key']}>
                                                            <div className="input-box select">
                                                                <select name={headItem['key']} value={bodyItem[headItem['key']]} onChange={this.handleSelect.bind(this,bodyItem)}>
                                                                    {
                                                                        headItem['options']!=undefined? (
                                                                            headItem['options'].map( optionItem => <option key={optionItem['value']} value={optionItem['value']}>{optionItem['name']}</option>)
                                                                        ):(
                                                                            <option>請選擇條件</option>
                                                                        )
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                }
                                                {
                                                    headItem['type']=='input' &&
                                                        <div className={`table-body ${headItem['className']||''}`} key={headItem['key']}>
                                                            <form onSubmit={this.handleSubmit.bind(this,headItem['key'],bodyItem)}>
                                                                <div className="input-box">
                                                                    <input type="text" name={headItem['key']} value={inputValue} onChange={this.handleChange.bind(this,bodyItem)} />
                                                                    <button className="basic">更新</button>
                                                                </div>
                                                            </form>
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
                                                            {
                                                                bodyItem.hasOwnProperty('status')?(
                                                                    <button className={`status-${bodyItem['status']}`} disabled={ bodyItem['status']=="none-auth" } onClick={this.tableButtonAction.bind(this,headItem['key'],bodyItem)}>
                                                                        { headItem['text'][bodyItem['status']] }
                                                                    </button>
                                                                ):(
                                                                    <button className={`basic`} onClick={this.tableButtonAction.bind(this,headItem['key'],bodyItem)}>
                                                                        { headItem['text'] }
                                                                    </button>
                                                                )
                                                            }
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
                                                            <Link to={`${headItem['path']}/${bodyItem['id']}${bodyItem['search']||''}`}>{bodyItem[headItem['key']]}</Link>
                                                        </div>
                                                }
                                                {
                                                    headItem['type']=='text' &&
                                                        <div className={`table-body ${headItem['className'] || ""}`} key={headItem['key']}>
                                                            {bodyItem[headItem['key']]}
                                                        </div>
                                                }
                                                {
                                                    headItem['type']=='number' &&
                                                        <div className={`table-body ${headItem['type']} ${headItem['className']||''}`} key={headItem['key']}>
                                                            <CurrencyFormat value={bodyItem[headItem['key']]} displayType={'text'} thousandSeparator={true} />
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
                                                {
                                                    headItem['type']=='date' &&
                                                        <div className={`table-body ${headItem['type']} ${headItem['className']||''}`} key={headItem['key']}>
                                                            {dayjs(bodyItem[headItem['key']] || "").format('YYYY/MM/DD')}
                                                        </div>
                                                }
                                                {
                                                    headItem['type']=='buttonTest' &&
                                                        <div 
                                                            className={`table-body ${headItem['className']||''}`} 
                                                            key={headItem['key']}
                                                        >
                                                            <button 
                                                                className={`${ bodyItem['status']!=undefined? `status-${bodyItem['status']}`: "off" }`} 
                                                                disabled={ bodyItem['status']=="none-auth" } 
                                                                onClick={this.tableButtonAction.bind(this,headItem['key'],bodyItem)}
                                                            >
                                                                { headItem['text'][ bodyItem['status']==undefined? 'off': bodyItem['status'] ] }
                                                            </button>
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

    handleChange = (selectedItem,e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleChackboxChange = ( selectedItem,e) => {
        const val = e.target.value;
        if( this.props.singleSelection!=undefined ){
            this.props.singleSelection(val,selectedItem);
        }
    }

    handleSelect = ( selectedItem,e ) => {
        if( this.props.tableSelectAction!=undefined ){
            this.props.tableSelectAction( selectedItem, e.target );
        }
    }

    checkIfItIsSelected = ( id ) => {
        const { selectedBefore } = this.state;
        return selectedBefore.some( someItem => id==someItem['id']);
    }

    tableButtonAction = ( method , val ) => {
        const { current } = this.items;
        const returnVal = { ...val, 't_method': method };
        if( this.props.tableButtonAction!=undefined ){
            this.props.tableButtonAction( returnVal, current );
        }
    }

    handleSubmit = (key,selectedItem,e) => {
        e.preventDefault();
        if( this.props.tableInputAction!=undefined ){
            this.props.tableInputAction( {[key]:this.state[key]}, selectedItem );
        }
    }
}