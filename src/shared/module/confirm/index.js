import React from 'react';

// Stylesheets
import './style.scss';

export default class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            method: props.method || 'confirm',
            open: props.open || false,
            header: props.header || null,
            container: props.container || null
        }
    }

    static getDerivedStateFromProps(props, state) {
        return{
            method: props.method || 'confirm',
            open : props.open,
            header: props.header,
            container: props.container
        }
    }

    render(){
        const { open, header, container, method } = this.state;
        if( open ){
            return(
                <div className="confirm-wrap">
                    <div className="confirm-mask" onClick={this.onCancel.bind(this)}></div>
                    <div className="confirm-container">
                        {
                            header!=null &&
                                <div className="confirm-container-header" dangerouslySetInnerHTML={{__html: header}}></div>
                        }
                        {
                            container!=null &&
                                <div className="confirm-container-container" dangerouslySetInnerHTML={{__html: container}}></div>
                        }
                        <div className="confirm-container-action">
                            {
                                method=='confirm'? (
                                    <React.Fragment>
                                        <button type="button" className="cancel" onClick={this.onCancel.bind(this)}>Cancel</button>
                                        <button type="button" className="basic" onClick={this.onConfirm.bind(this)}>Ok</button>
                                    </React.Fragment>
                                ):(
                                    <button type="button" className="basic" onClick={this.onCancel.bind(this)}>Ok</button>
                                )
                            }
                        </div>
                    </div>
                </div>
            );
        }else{
            return null;
        }
    }

    onCancel = () => {
        if( this.props.onCancel!=undefined ){
            this.props.onCancel(false);
        }
    }

    onConfirm = () => {
        if( this.props.onConfirm!=undefined ){
            this.props.onConfirm(true);
        }
    }
}