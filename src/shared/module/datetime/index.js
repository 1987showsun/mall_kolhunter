import React from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faAngleLeft, faAngleRight }from '@fortawesome/free-solid-svg-icons';

// Set
import week from './public/set/days';

import './public/stylesheets/style.scss';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.datetime = React.createRef();
        const YYYY = props.value!=undefined? dayjs(props.value).format('YYYY') : dayjs().format('YYYY');
        const MM   = props.value!=undefined? dayjs(props.value).format('MM') : dayjs().format('MM');
        this.state = {
            isManagingFocus: false,
            min: props.min || "",
            max: props.max || "",
            currentDispaly: 0,
            classname: props.className || '',
            value: props.value!=undefined? dayjs(props.value).format('YYYY/MM/DD') : dayjs().format('YYYY/MM/DD'),
            currentDate: props.value!=undefined? dayjs(props.value).format('YYYY/MM') : dayjs().format('YYYY/MM'),
            lastMonth: {
                YYYY,
                MM,
                startDate: 0,
                endDate: 0,
                totalDays: 0,
            },
            currentMonth: {
                YYYY,
                MM,
                startDate: 0,
                endDate: 0,
                totalDays: 0,
            },
            nextMonth: {
                YYYY,
                MM,
                startDate: 0,
                endDate: 0,
                totalDays: 0,
            },
        }
    }

    static getCerivedStateToPeops( props,state ){
        return {
            value: props.value!=undefined? dayjs(props.value).format('YYYY/MM/DD') : dayjs().format('YYYY/MM/DD'),
            currentDate: props.value!=undefined? dayjs(props.value).format('YYYY/MM') : dayjs().format('YYYY/MM'),
        }
    }

    render(){

        const { isManagingFocus, currentDispaly, classname, value, currentDate } = this.state;
        const YYYY = dayjs( currentDate ).format('YYYY');
        const MM   = dayjs( currentDate ).format('MM');
        const mergeDays = [ ...this.lastMonthTotalDays(), ...this.currentMonthTotalDays(), ...this.nextMonthTotalDays() ];

        return(
            <div 
                ref={this.datetime}
                className={`input-box datetime ${classname}`}
                tabIndex={1}
            >
                <FontAwesomeIcon icon={faCalendarAlt} />
                <div 
                    className="datetime-display" 
                    onClick={this.test.bind(this,'switch')}
                >
                    {value}
                </div>
                <div 
                    className={`datetime-calendar-wrap`}
                    onClick={this.test.bind(this,'wrap')}
                >
                    {
                        isManagingFocus &&
                            <React.Fragment>
                                <div className="datetime-years-wrap">
                                    <div className="datetime-arrow" onClick={this.changeMM.bind(this,"prev")}>
                                        <FontAwesomeIcon icon={faAngleLeft}/>
                                    </div>
                                    <div>{`${YYYY}/${MM}`}</div>
                                    <div className="datetime-arrow" onClick={this.changeMM.bind(this,"next")}>
                                        <FontAwesomeIcon icon={faAngleRight}/>
                                    </div>
                                </div>
                                <div className={`datetime-days-wrap`}>
                                    <ul className="datetime-days-wrap-date head">
                                        { week['zh-TW'].map( item => <li key={item}>{item}</li> ) }
                                    </ul>
                                    <ul className={`datetime-days-wrap-date`}>
                                        {
                                            mergeDays.map( dayItem => {

                                                const yesr  = dayItem['year'];
                                                const month = String(dayItem['month']).length<2? `0${dayItem['month']}` : dayItem['month'];
                                                const day   = String(dayItem['day']).length<2? `0${dayItem['day']}` : dayItem['day'];

                                                return(
                                                    <li 
                                                        className={`${value==`${yesr}/${month}/${day}`} ${`${YYYY}/${MM}`==`${yesr}/${month}`? 'currentM': ''}`}
                                                        key={`${yesr}/${month}/${day}`} 
                                                        data-date={`${yesr}/${month}/${day}`}
                                                        onClick={this.selectDate.bind(this,`${yesr}/${month}/${day}`)}
                                                    >
                                                        <span>{dayItem['day']}</span>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </div>
                            </React.Fragment>
                    }
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getCalendarStatus();
        this.returnForm();
        document.addEventListener('click', this.onClickOutsideHandler.bind(this));
    }
    
    componentWillUnmount() {
        document.removeEventListener('click', this.onClickOutsideHandler.bind(this));
    }

    test = (block,e) =>{
        const { isManagingFocus } = this.state;
        this.setState({
            isManagingFocus: block=='switch'? ( isManagingFocus? false:true ): (true)  ,
        });
    }

    onClickOutsideHandler(event) {
        if (this.state.isManagingFocus && !this.datetime.current.contains(event.target)) {
            this.setState({ isManagingFocus: false });
        }
    }

    selectDate = ( selectedDate ) => {
        this.setState({
            value: selectedDate,
        },()=>{
            this.returnForm();
        })
    }

    changeMM = ( method ) => {

        const { currentDate } = this.state;
        let YYYY = Number(dayjs(currentDate).format('YYYY'));
        let MM   = Number(dayjs(currentDate).format('MM'));
        
        switch( method ){
            case 'prev':
                MM--;
                if( MM<=0 ){
                    YYYY--;
                    MM = 12;
                }
                break;

            default:
                 MM++;
                if( MM>12 ){
                    YYYY++;
                    MM = 1;
                }
                break;
        }
        this.setState({
            currentDate: `${YYYY}/${MM}`
        },()=>{
            this.getCalendarStatus();
        })
    }

    getCalendarStatus = () => {
        const { currentDate } = this.state;
        const YYYY = dayjs( currentDate ).format('YYYY');
        const MM = dayjs( currentDate ).format('MM');
        const lastMonthTotalDays = dayjs(`${YYYY}/${MM}`).startOf('month').subtract(1, 'month').daysInMonth();
        const lastMonthStartDate = dayjs(`${YYYY}/${MM}`).startOf('month').subtract(1, 'month').format('d');
        const lastMonthEndDate = dayjs(`${YYYY}/${MM}`).endOf('month').subtract(1, 'month').format('d');
        const currentMonthTotalDays = dayjs(`${YYYY}/${MM}`).daysInMonth();
        const currentMonthStartDate = dayjs(`${YYYY}/${MM}`).startOf('month').format('d');
        const currentMonthEndDate = dayjs(`${YYYY}/${MM}`).endOf('month').format('d');
        const nextMonthTotalDays =  dayjs(`${YYYY}/${MM}`).startOf('month').add(1, 'month').daysInMonth();
        const nextMonthStartDate =  dayjs(`${YYYY}/${MM}`).startOf('month').add(1, 'month').format('d');
        const nextMonthEndDate = dayjs(`${YYYY}/${MM}`).endOf('month').add(1, 'month').format('d');

        
        this.setState({
            lastMonth: { 
                ...this.state.lastMonth,
                startDate: Number(lastMonthStartDate),
                endDate: Number(lastMonthEndDate),
                totalDays: Number(lastMonthTotalDays) 
            },
            currentMonth: { 
                ...this.state.currentMonth, 
                startDate: Number(currentMonthStartDate),
                endDate: Number(currentMonthEndDate),
                totalDays: Number(currentMonthTotalDays) 
            },
            nextMonth: { 
                ...this.state.nextMonth, 
                startDate: Number(nextMonthStartDate),
                endDate: Number(nextMonthEndDate),
                totalDays: Number(nextMonthTotalDays)
            },
        },()=>{
            //this.returnForm();
        })
    }

    lastMonthTotalDays = () => {
        const { currentDate, lastMonth, currentMonth } = this.state;
        const YYYY = dayjs(currentDate).startOf('month').subtract(1, 'month').format('YYYY');
        const MM   = dayjs(currentDate).startOf('month').subtract(1, 'month').format('MM');
        let lastDays = [];
        for( let i=(lastMonth['totalDays']-(currentMonth['startDate']-1)) ; i<=lastMonth['totalDays'] ; i++ ){
            lastDays = [ 
                ...lastDays, {
                    year: YYYY,
                    month: MM,
                    day: i
                }
            ];
        }
        return lastDays;
    }

    currentMonthTotalDays = () => {
        const { currentDate, currentMonth } = this.state;
        const YYYY = dayjs(currentDate).startOf('month').format('YYYY');
        const MM   = dayjs(currentDate).startOf('month').format('MM');
        let currentDays = [];
        for( let i=1; i<=currentMonth['totalDays'] ; i++ ){
            currentDays = [ 
                ...currentDays, {
                    year: YYYY,
                    month: MM,
                    day: i
                } 
            ];
        }
        return currentDays;
    }

    nextMonthTotalDays = () => {
        const { currentDate, currentMonth } = this.state;
        const YYYY = dayjs(currentDate).startOf('month').add(1, 'month').format('YYYY');
        const MM   = dayjs(currentDate).startOf('month').add(1, 'month').format('MM');
        let nextDays = [];
        for( let i=1; i<=(6-currentMonth['endDate']) ; i++ ){
            nextDays = [ 
                ...nextDays, {
                    year: YYYY,
                    month: MM,
                    day: i
                }
            ];
        }
        return nextDays;
    }

    returnForm = () => {
        const { value } = this.state;
        const YYYY = dayjs(value).format('YYYY');
        const MM   = dayjs(value).format('MM');
        const DD   = dayjs(value).format('DD');
        if( this.props.returnForm!=undefined ){
            this.props.returnForm({
                date: value,
                year: YYYY,
                month: MM,
                day: DD
            });
        }
    }
}