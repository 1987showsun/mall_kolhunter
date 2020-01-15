/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                 from 'react';
import CurrencyFormat        from 'react-currency-format';
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome';
import { faPlus, faMinus }   from '@fortawesome/free-solid-svg-icons';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            initVal     : props.initVal    || 1,
            itemNumMax  : props.itemNumMax || 1,
            formObject  : {
                itemNum   : props.initVal     || 1
            }
        }
    }

    static getDerivedStateFromProps( props,state ){

        let { formObject, initVal, itemNumMax }  = state;
        let { itemNum }    = formObject;
        let propsInitVal   = props.initVal;

        if( initVal!=propsInitVal ){
            initVal = propsInitVal;
            itemNum = propsInitVal;
        }

        if( itemNumMax!=props.itemNumMax ){
            itemNumMax = props.itemNumMax;
            if( props.itemNumMax!=0 && itemNum>props.itemNumMax ){
                itemNum = props.itemNumMax;
            }
        }

        return {
            formObject: {
                ...state.formObject,
                itemNum
            },
            itemNumMax,
            initVal
        };
    }

    render(){

        const { formObject } = this.state;

        return(
            <div className="quantity-wrap">
                <button type="button" onClick={this.quantityChange.bind(this,"minus")}>
                    <FontAwesomeIcon icon={faMinus} />
                </button>
                <div className="show-quantity">
                    <CurrencyFormat value={formObject['itemNum']} displayType={'text'} thousandSeparator={true} />
                </div>
                <button type="button" onClick={this.quantityChange.bind(this,"plus")}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        );
    }

    // componentDidMount() {
    //     this.updateFormObject();
    // }

    quantityChange = ( method ) => {
        const { itemNumMax, formObject } = this.state;
        const { isCombo }                = this.props;
        let   { itemNum }                = formObject;
        if (!isCombo) {
            switch( method ){
                case 'minus':
                    // 減
                    itemNum<=1? 1 : itemNum--;
                    break;
    
                default:
                    // 加
                    itemNum>=itemNumMax? itemNumMax : itemNum++;
                    break;
            }
    
            this.setState({
                formObject : { ...formObject, itemNum } 
            },()=>{
                this.updateFormObject();
            })
        }
    }

    cardExpiry = ( val ) =>{
        const { itemNumMax } = this.state;
        val = Number( val );
        if( val<=0 ){
            val = 1;
        }else if( val>=itemNumMax ){
            val = itemNumMax;
        } 

        return String(val);
    }

    updateFormObject = () => {
        if( this.props.returnForm!=undefined ){
            const { formObject } = this.state;
            this.props.returnForm(formObject);
        }
    }
}