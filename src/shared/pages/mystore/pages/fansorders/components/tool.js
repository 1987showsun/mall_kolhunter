/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                   from 'react';
import dayjs                   from 'dayjs';
import queryString             from 'query-string';
import { FontAwesomeIcon }     from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export default class Tool extends React.Component{

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
            <section className="container-unit">
                <ul className="tool-ul-inline">
                    <li>
                        <div className="input-box select">
                            <select name="date" value={`${formObject['year']}-${formObject['month']}`} onChange={this.handleChange.bind(this)}>
                                {this.setYMSelect()}
                            </select>
                        </div>
                    </li>
                    <li>
                        <div className="input-box select">
                            <select name="period" value={formObject['period']} onChange={this.handleChange.bind(this)}>
                                <option value="1">上半月</option>
                                <option value="2">下半月</option>
                            </select>
                        </div>
                    </li>
                </ul>
                <span className="warn">
                    <i><FontAwesomeIcon icon={faExclamationCircle} /></i>
                    非即時性訂單呈現，1-15號訂單分潤金額16號起顯示，16-月底訂單分潤金額 次月1號起顯示
                </span>
            </section>
        );
    }

    setYMSelect = () => {
        const { max, nowDate }      = this.state;
        const { year, month       } = nowDate;
        const quotient              = parseInt((max-month)/12);
        const remainder             = (max-month)%12;
        let option                  = [];
        
        for( let i=0 ; i<quotient ; i++ ){
            for( let m=12 ; m>=1 ; m-- ){
                const setMM = String(m).length<2? `0${m}`: m;
                option = [ ...option, <option key={`${(year-i)-1} / ${setMM}`} value={`${(year-i)}-${m}`}>{`${(year-i)} / ${setMM}`}</option> ];
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

    handleChange = (e) => {
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
}