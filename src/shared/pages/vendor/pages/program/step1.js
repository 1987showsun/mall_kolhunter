import React from 'react';
import { connect } from 'react-redux';

export default class Step1 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>合約書</h4>
                    </article>
                    <div className="admin-content-container">
                        我是合約書
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
                this.props.history.push('/myvendor/program/product?step=2');
                break;

            default:
                this.props.history.push('/myvendor/categories/product/review');
                break;
        }
    }
}