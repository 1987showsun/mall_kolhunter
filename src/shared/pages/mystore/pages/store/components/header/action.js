import React from 'react';

export default class Action extends React.Component{
    render(){
        return(
            <div className="figcaption-row">
                <ul className="figcaption-action-ul">
                    <li><button type="button">個人頁面</button></li>
                    <li><button type="button">與他合作</button></li>
                </ul>
            </div>
        );
    }
}