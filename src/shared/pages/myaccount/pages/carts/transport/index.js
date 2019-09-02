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

        const { accountInfo } = this.state;

        return(
            <div className="container-unit-row" data-flexwrap="wrap">
                <div className="container-unit-row" data-flexwrap="wrap">
                    <div className="container-unit-head">
                        <h4><FontAwesomeIcon icon={faChevronCircleRight}/>訂購人</h4>
                    </div>
                    {
                        accountInfo.map( (item,i) => {
                            return (
                                <Orderer 
                                    key={i}
                                    data={item}
                                    mergeFunction = {this.mergeFunction.bind(this)}
                                />
                            );
                        })
                    }
                </div>
                <div className="container-unit-row" data-flexwrap="wrap">
                    <div className="container-unit-head">
                        <h4><FontAwesomeIcon icon={faChevronCircleRight}/>收件人</h4>
                    </div>
                    <Recipient
                        mergeFunction = {this.mergeFunction.bind(this)}
                    />
                </div>
            </div>
        );
    }

    mergeFunction = ( val ) => {
        console.log( val );
        this.setState({
            mergeFormObject: { ...this.state.mergeFormObject, ...val }
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