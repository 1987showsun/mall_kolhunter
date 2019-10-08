import React from 'react';

// Stylesheets
import './style.scss';

export default (props) => {
    const { loading } = props;
    if( loading ){
        return(
            <div className="lds-spinner-block-wrap">
                <div className="lds-spinner-block">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }else{
        return null;
    }
}