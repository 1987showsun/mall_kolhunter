import React from 'react';

export default class Items extends React.Component{
    render(){
        return(
            <section className="message-items-wrap">
                <article className="message-items-wrap-head">
                    <h4></h4>
                    <div className="message-items-wrap-date"></div>
                </article>
                <article className="message-items-wrap-content"></article>
            </section>
        );
    }
}