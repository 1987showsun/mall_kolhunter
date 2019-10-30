import React from 'react';

export default class Index extends React.Component{
    render(){
        return(
            <div className="container-unit-action">
                <ul>
                    <li><button onClick={this.action.bind(this,'cancel')} className="cancel">取消</button></li>
                    <li><button onClick={this.action.bind(this,'submit')} className="mall-yes">結帳</button></li>
                </ul>
            </div>
        );
    }

    action = ( method ) => {
        switch( method ){
            case 'submit':
                // 結帳
                this.props.returnAction();
                break;
                
            default:
                // 取消

                break;
        }
    }
}