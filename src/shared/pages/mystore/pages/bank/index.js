import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPencilAlt }from '@fortawesome/free-solid-svg-icons';

// Components
import Info from './info';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            update: false,
            bankInfo: props.bankInfo
        }
    }

    render(){

        const { 
            update,
            bankInfo
        } = this.state;

        return(
            <React.Fragment>
                <section className="container-unit">
                    <div className="unit-head">
                        <h3>帳戶資料</h3>
                        {
                            !update &&
                                <button type="button" className="update-button" onClick={()=>this.setState({update: true}) }>
                                    <i><FontAwesomeIcon icon={faPencilAlt}/></i>
                                    編輯
                                </button>
                        }
                    </div>
                    <Info 
                        data = {{}}
                    />
                </section>
            </React.Fragment>
        );
    }
}

const mapStateToprops = state => {
    return{
        bankInfo: state.myaccount.info
    }
}

export default connect( mapStateToprops )( Index );