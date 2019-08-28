import React from 'react';
import { connect } from 'react-redux';

// Components
import ProductWrap from './product';
import Coupon from './coupon';
import Payment from './payment';
import Transports from './transport';
import Invoice from './invoice';
import Action from './action';

// Actions
import { cartsProductList } from '../../../../actions/myaccount';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            required: [],
            formObject: {}
        }
    }

    render(){
        return(
            <React.Fragment>
                <section className="container-unit">
                    {/* 購買清單 */}
                    <div className="unit-head">
                        <h3>購買清單</h3>
                    </div>
                    <ProductWrap />
                </section>
                <section className="container-unit">
                    {/* 代碼 */}
                    <div className="unit-head">
                        <h3>優惠券 / 折扣碼</h3>
                    </div>
                    <Coupon />
                </section>
                <section className="container-unit">
                    {/* 付款方式 */}
                    <div className="unit-head">
                        <h3>付款方式</h3>
                    </div>
                    <Payment 
                        returnHandleChange= {this.returnHandleChange.bind(this)}
                    />
                </section>
                <section className="container-unit">
                    {/* 訂購人 / 收件人資訊 */}
                    <div className="unit-head">
                        <h3>訂購人 / 收件人資訊</h3>
                    </div>
                    <Transports />
                </section>
                <section className="container-unit">
                    {/* 訂購人 / 收件人資訊 */}
                    <div className="unit-head">
                        <h3>發票</h3>
                    </div>
                    <Invoice />
                </section>
                <section className="container-unit">
                    <Action />
                </section>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.props.dispatch( cartsProductList() );
        this.returnHandleChange();
    }
    
    returnHandleChange = ( val ) => {
        console.log( { ...this.state.formObject, ...val } );
        this.setState({
            formObject: { ...this.state.formObject, ...val }
        },()=>{
            //console.log( '--->',this.state.formObject );
        })
    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default connect( mapStateToProps )( Index );