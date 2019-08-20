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
            formObject: {}
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
            <form onSubmit={this.hanleSubmit.bind(this)}>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>購買資料</h4>
                    </article>
                    <div className="admin-content-container">
                        <PurchaseInfo 
                            data={profile}
                            returnHandleChange= {this.returnHandleChange.bind(this)}
                        />
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
                        {
                            profile['invoice']!="" || profile['invoice']!=undefined? (
                                <div>三聯式發票</div>
                            ):(
                                <div>二聯式發票</div>
                            )
                        }
                    </div>

                    <div className="admin-content-action">
                        <ul>
                            <li>
                                <button type="button" className="cancel" onClick={this.actionBtn.bind(this,'cancel')}>取消</button>
                            </li>
                            <li>
                                <button type="submit" className="basic">確定，下一步</button>
                            </li>
                        </ul>
                    </div>
                </section>
            </form>
        );
    }

    returnHandleChange = ( data ) => {
        this.setState({
            formObject: { ...this.state.formObject, ...data }
        })
    }

    hanleSubmit = (e) => {
        e.preventDefault();
        const { formObject } = this.state;
        console.log( formObject );
    }

    actionBtn = ( val ) => {
        switch( val ){
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