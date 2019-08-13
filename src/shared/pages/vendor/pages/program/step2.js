import React from 'react';
import { connect } from 'react-redux';

// Compoents
import PurchaseInfo from './form/purchase_info';
import Invoice from './form/invoice';

class Step2 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            profile: props.profile,
            formObject: {
                payment_method: {
                    
                },
                invoice: {
                    invoice: 0,
                    title: "",
                    addressee: "",
                    address: ""
                }
            }
        }
    }
    
    static getDerivedStateFromProps( props,state ) {
        if( Object.keys(state.profile).length==0 ){
            return{
                profile: props.profile
            }
        }
        return null;
    }

    render(){

        const { profile } = this.state;

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>購買資料</h4>
                    </article>
                    <div className="admin-content-container">
                        <PurchaseInfo data={profile}/>
                    </div>

                    <article className="admin-content-title">
                        <h4>付款方式</h4>
                    </article>
                    <div className="admin-content-container">
                        <ul className="program-form-ul">
                            <li>
                                <label>ATM</label>
                                <div>ATM CODE</div>
                            </li>
                        </ul>
                    </div>

                    <article className="admin-content-title">
                        <h4>發票</h4>
                    </article>
                    <div className="admin-content-container">
                        <Invoice />
                    </div>

                    <div className="admin-content-action">
                        <ul>
                            <li>
                                <button type="button" className="cancel" onClick={this.actionBtn.bind(this,'cancel')}>取消</button>
                            </li>
                            <li>
                                <button type="button" className="basic" onClick={this.actionBtn.bind(this,'ok')}>確定，下一步</button>
                            </li>
                        </ul>
                    </div>
                </section>
            </React.Fragment>
        );
    }

    actionBtn = ( val ) => {
        switch( val ){
            case 'ok':
                this.props.history.push('/myvendor/program/product?step=3');
                break;
                
            default:
                this.props.history.push('/myvendor/categories/product/review');
                break;
        }
    }
}

const mapStateToProps = state => {
    return{
        profile: state.vendor.info
    }
}

export default connect( mapStateToProps )( Step2 );