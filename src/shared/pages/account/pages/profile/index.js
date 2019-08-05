import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPencilAlt }from '@fortawesome/free-solid-svg-icons';

// Components
import Info from './info';
import Formcover from './update/cover';
import Forminfo from './update/info';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            update: false,
            accountInfo: props.accountInfo
        }
    }

    static getDerivedStateFromProps( props,state ){
        if( props.accountInfo!=state.accountInfo ){
            return {
                accountInfo: props.accountInfo
            }            
        }
        return null;
    }

    render(){

        const { 
            update,
            accountInfo
        } = this.state;

        return(
            <React.Fragment>
                <section className="container-unit">
                    <Formcover 
                        data={ accountInfo['photo'] }
                    />
                    <div className="unit-head">
                        <h3>基本資料</h3>
                        {
                            !update &&
                                <button type="button" className="update-button" onClick={()=>this.setState({update: true}) }>
                                    <i><FontAwesomeIcon icon={faPencilAlt}/></i>
                                    編輯
                                </button>
                        }
                    </div>
                    {
                        !update? (
                            <Info 
                                data={ accountInfo }
                            />
                        ):(
                            <Forminfo 
                                accountInfo={ accountInfo }
                            />
                        )
                    }
                </section>
            </React.Fragment>
        );
    }
}

const mapStateToprops = state => {
    return{
        accountInfo: state.account.info
    }
}

export default connect( mapStateToprops )( Index );