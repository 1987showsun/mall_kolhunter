import React from 'react';

// Stylesheets
import './style.scss';

export default class Loading extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: props.loading || false,
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            loading: props.loading || false,
        }
    }

    render(){
        const { loading } = this.state;
        if( loading ){
            return(
                <div className="loding-wrap">
                    <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            );
        }else{
            return null;
        }
    }
}