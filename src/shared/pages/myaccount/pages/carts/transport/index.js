// 訂購 ＆ 收件 人
import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faChevronCircleRight}from '@fortawesome/free-solid-svg-icons';

// Components
import Orderer from './orderer';
import Recipient from './recipient';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            accountInfo: [],
            ordererFormObject: {},
            deliveryFormObject: {},
            mergeFormObject: {}
        }
    }

    static getDerivedStateFromProps( props,state ){
        
        if( Object.keys( props.accountInfo ).length!=0 ){
            return{
                accountInfo: [{...props.accountInfo}]
            }
        }
        return null;
    }

    render(){

        const { accountInfo, ordererFormObject } = this.state;

        return(
            <div className="container-unit-row" data-flexwrap="wrap">
                <div className="container-unit-row contact-information" data-flexwrap="wrap">
                    <div className="container-unit-head">
                        <h4><FontAwesomeIcon icon={faChevronCircleRight}/>訂購人</h4>
                    </div>
                    {
                        accountInfo.map( (item,i) => {
                            return (
                                <Orderer 
                                    key={i}
                                    data={item}
                                    mergeFunction = { (val)=> {
                                        this.setState({
                                            ordererFormObject: { ...this.state.ordererFormObject, ...val }
                                        },()=>{
                                            this.mergeFunction();
                                        })
                                    }}
                                />
                            );
                        })
                    }
                </div>
                <div className="container-unit-row contact-information" data-flexwrap="wrap">
                    <div className="container-unit-head">
                        <h4><FontAwesomeIcon icon={faChevronCircleRight}/>收件人</h4>
                    </div>
                    <Recipient
                        copyOrdererFormObject= {ordererFormObject}
                        mergeFunction = { (val)=> {
                            this.setState({
                                deliveryFormObject: { ...this.state.deliveryFormObject, ...val }
                            },()=>{
                                this.mergeFunction();
                            })
                        }}
                    />
                </div>
            </div>
        );
    }

    mergeFunction = ( val ) => {
        const mergeFormObject = { ...this.state.ordererFormObject, ...this.state.deliveryFormObject };
        this.setState({
            mergeFormObject
        },()=>{
            const { mergeFormObject } = this.state;
            this.props.returnHandleChange( mergeFormObject );
        })
    }
}

const mapStateToprops = state => {
    return{
        accountInfo: state.myaccount.info
    }
}

export default connect( mapStateToprops )( Index );