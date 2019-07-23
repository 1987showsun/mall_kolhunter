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
                        <h4>購買完成基本資料</h4>
                    </article>
                    <div className="admin-content-container">
                        我是資料
                    </div>

                    <article className="admin-content-title">
                        <h4>刊登同意書</h4>
                    </article>
                    <div className="admin-content-container">
                        我是同意書
                    </div>
                </section>
            </React.Fragment>
        );
    }
}