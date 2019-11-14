/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';

import './public/stylesheets/style.scss';

export default class Site404 extends React.Component{
    render(){
        return(
            <div className="row">
                <section className="container no-page">
                    <div className="status-number">404</div>
                    <div className="status-text">
                        <p>看起來您迷路了或者我們正試圖使您困惑...</p>
                        <p>讓我們帶您回家。</p>
                        <button onClick={this.goBack.bind(this)}>返回上一頁</button>
                    </div>
                </section>
            </div>
        );
    }

    goBack = () => {
        const { history } = this.props;
        history.goBack();
    }
}