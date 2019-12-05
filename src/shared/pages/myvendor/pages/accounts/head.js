/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';
import dayjs from 'dayjs';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faFileDownload }from '@fortawesome/free-solid-svg-icons';

// Lang
import lang from '../../../../public/lang/lang.json';

class HeadAccount extends React.Component{

    constructor(props){
        super(props);
        const YYYY = dayjs().format('YYYY');
        const MM   = dayjs().format('MM');
        const DD   = dayjs().format('DD');
        const { search } = props.location;
        const year   = queryString.parse(search)['year']   || String(YYYY);
        const month  = queryString.parse(search)['month']  || String(DD<=15? MM-1 : MM);
        const period = queryString.parse(search)['period'] || String(month==String(MM)? '1':'2');
        this.state = {
            max: 36,
            nowDate: {
                year : Number(YYYY),
                month: DD<=15? Number(MM)-1 : Number(MM),
                days : Number(DD)
            },
            formObject: {
                year   : year,
                month  : month,
                period : period
            }
        }
    }

    render(){

        const { formObject } = this.state;

        return(
            <React.Fragment>
                <div className="page-head-action">
                    <div className="page-head-action-row">
                        <ul>
                            <li>
                                <div className="input-box select">
                                    <select name="date" value={`${formObject['year']}-${formObject['month']}`} onChange={this.handleSearchChange.bind(this)}>
                                        {this.setYMSelect()}
                                    </select>
                                </div>
                            </li>
                            <li>
                                <div className="input-box select">
                                    <select name="period" value={formObject['period']} onChange={this.handleSearchChange.bind(this)}>
                                        <option value="1">上半月</option>
                                        <option value="2">下半月</option>
                                    </select>
                                </div>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <button onClick={this.actionYouWantToPerform.bind(this)} className="form-download">
                                    <i><FontAwesomeIcon icon={faFileDownload}/></i>下載報表
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    setYMSelect = () => {
        const { max, nowDate } = this.state;
        const { year, month, days } = nowDate;
        const quotient = parseInt((max-month)/12);
        const remainder = (max-month)%12;
        let option = [];
        for( let i=0 ; i<quotient ; i++ ){
            for( let m=12 ; m>=1 ; m-- ){
                const setMM = String(m).length<2? `0${m}`: m;
                option = [ ...option, <option key={`${(year-i)-1} / ${setMM}`} value={`${(year-i)-1}-${m}`}>{`${(year-i)-1} / ${setMM}`}</option> ];
            }
        }

        if( remainder!=0 ){
            for( let m=1 ; m<=month ; m++ ){
                const setMM = String(m).length<2? `0${m}`: m;
                option = [ <option key={`${year} / ${setMM}`} value={`${year}-${m}`}>{`${year} / ${setMM}`}</option>, ...option ];
            }
            for( let m=0 ; m<remainder ; m++ ){
                const setMM = String(12-m).length<2? `0${12-m}`: 12-m;
                option = [ ...option, <option key={`${year-quotient-1} / ${setMM}`} value={`${year-quotient-1}-${12-m}`}>{`${year-quotient-1} / ${setMM}`}</option> ];
            }
        }
        return option;
    }

    handleSearchChange = (e) => {

        const { formObject } = this.state;
        const { location, history } = this.props;
        const { pathname, search } = location;
        const { name, value } = e.target;
        let mergeFormObject = {};

        if( name!='date' ){
            mergeFormObject = { ...formObject, [name]: value }
        }else if( name=='date' ){
            mergeFormObject = { ...formObject, year: value.split('-')[0], month: value.split('-')[1] }
        }

        this.setState({
            formObject: {
                ...mergeFormObject
            }
        },()=>{
            history.push({
                pathname: pathname,
                search: queryString.stringify({
                    year  : this.state.formObject['year'],
                    month : this.state.formObject['month'],
                    period: this.state.formObject['period']
                })
            })
        })
    }

    actionYouWantToPerform = () => {

    }
}

const mapStateToProps = (state) => {
    return{

    }
}

export default connect(mapStateToProps)(HeadAccount);