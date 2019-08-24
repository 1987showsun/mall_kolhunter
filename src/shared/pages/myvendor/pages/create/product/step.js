import React from 'react';

// Lang
import lang from '../../../../../public/lang/lang.json';

export default class Step extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            maxStep: props.maxStep,
            step: props.step,
        }
    }

    static getDerivedStateFromProps( props, state ){
        if( props.step!=state.step ){
            return {
                step: props.step
            }
        }

        return null;
    }

    render(){

        const { maxStep, step } = this.state;

        const renderStep = () => {
            let returnView = [];
            for( let i=1 ;i<=maxStep ; i++){
                returnView.push( 
                    <li key={i} className={`${step==i}`}>
                        <span className={`step-number`}>{i}</span>
                        <div className="prompt">{ lang['zh-TW']['create']['product'][i] }</div>
                    </li>
                );
            }
            return returnView;
        }

        return(
            <div className="step-wrap">
                <ul>
                    { renderStep() }
                </ul>
            </div>
        );
    }
}