import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPencilAlt }from '@fortawesome/free-solid-svg-icons';

// Components
import Info from './info';
import Form from './update/form';

// Modules
import Loading from '../../../../module/loading/mallLoading';

// Actions
import { mystoreBankInfo } from '../../../../actions/mystore';

class Index extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            update: false,
            bankInfo: props.bankInfo
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            bankInfo: props.bankInfo
        }
    }

    render(){

        const { loading, update, bankInfo } = this.state;
        const { location, history, match } = this.props;

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
                    {
                        update? (
                            <Form 
                                data= {bankInfo}
                                match= {match}
                                history= {history}
                                location= {location}
                                returnCancel={()=>{ 
                                    console.log('fuck');
                                    this.setState({update: false}) 
                                }}
                            />
                        ):(
                            <Info data = {bankInfo} />
                        )
                    }
                    <Loading loading={loading} />
                </section>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.setState({
            loading: true
        },()=>{
            this.props.dispatch( mystoreBankInfo() ).then( res => {
                this.setState({
                    loading: false,
                })
            });
        })
    }
    
}

const mapStateToprops = state => {
    return{
        bankInfo: state.mystore.bankInfo
    }
}

export default connect( mapStateToprops )( Index );