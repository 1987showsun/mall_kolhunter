import React from 'react';
import toaster from 'toasted-notes';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPencilAlt }from '@fortawesome/free-solid-svg-icons';

// Components
import Info from './info';
import Formcover from './update/cover';
import Forminfo from './update/info';
import FormPWD from './update/pwd';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            update: false,
            PWDUpdate: false,
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
            PWDUpdate,
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
                                accountInfo= {accountInfo}
                                returnCancel= {()=> this.setState({ update: false })}
                            />
                        )
                    }
                </section>
                <section className="container-unit">
                <div className="unit-head">
                        <h3>修改密碼</h3>
                        {
                            !PWDUpdate &&
                                <button type="button" className="update-button" onClick={()=>this.setState({PWDUpdate: true}) }>
                                    <i><FontAwesomeIcon icon={faPencilAlt}/></i>
                                    編輯
                                </button>
                        }
                    </div>
                    {
                        PWDUpdate &&
                            <FormPWD 
                                returnCancel= {( status )=> {
                                    this.setState({ 
                                        PWDUpdate: false 
                                    },()=>{
                                        if( status=='success' ){
                                            toaster.notify(
                                                <div className={`toaster-status success`}>更新成功</div>
                                            ,{
                                                position: 'bottom-right',
                                                duration: 4000
                                            })
                                        }
                                    })
                                }}
                            />
                    }
                </section>
            </React.Fragment>
        );
    }
}

const mapStateToprops = state => {
    return{
        accountInfo: state.myaccount.info
    }
}

export default connect( mapStateToprops )( Index );