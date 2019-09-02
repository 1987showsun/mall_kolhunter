import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus, faMinus }from '@fortawesome/free-solid-svg-icons';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            itemNumMax: props.itemNumMax || 1,
            formObject: {
                itemNum: 1
            }
        }
    }

    static getDerivedStateToProps( props,state ){
    
        return{
            itemNumMax: props.itemNumMax || 1
        }
    }

    render(){

        const { formObject } = this.state;

        return(
            <div className="quantity-wrap">
                <button type="button" onClick={this.quantityChange.bind(this,"minus")}>
                    <FontAwesomeIcon icon={faMinus} />
                </button>
                <div className="input-box">
                    <CurrencyFormat value={formObject['itemNum']} format={this.cardExpiry} thousandSeparator={true} onValueChange={ values => this.handleQuantity(values)} />
                </div>
                <button type="button" onClick={this.quantityChange.bind(this,"plus")}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        );
    }

    componentDidMount() {
        this.updateFormObject();
    }

    handleQuantity = (values) => {
        this.setState({
            formObject: { ...this.state.formObject, itemNum: Number(values['value']) }
        },()=>{
            this.updateFormObject();
        })
    }

    quantityChange = ( method ) => {
        const { itemNumMax, formObject } = this.state;
        let itemNum = formObject['itemNum'];
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