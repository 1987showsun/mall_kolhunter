import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Modules
import Loading from '../../../../../../../module/loading';

// Actions
import { contract } from '../../../../../../../actions/myvendor';

class Step1 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading : false,
            contract: "",
        }
    }

    render(){

        const { loading, contract } = this.state;

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>合約書</h4>
                    </article>
                    <div className="admin-content-container">
                        {contract}
                        <Loading loading={loading}/>
                    </div>
                </section>
                {
                    !loading &&
                        <section className="admin-content-row">
                            <div className="admin-content-action">
                                <ul>
                                    <li>
                                        <button type="button" className="cancel" onClick={this.actionBtn.bind(this,'cancel')}>取消</button>
                                    </li>
                                    <li>
                                        <button type="button" className="basic" onClick={this.actionBtn.bind(this,'ok')}>確定，下一步</button>
                                    </li>
                                </ul>
                            </div>
                        </section>
                }
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { location, history, match } = this.props;
        const { pathname, search } = location;
        const storageProgramToken = sessionStorage.getItem('vendorBuyPlanform')!=undefined? JSON.parse(sessionStorage.getItem('vendorBuyPlanform'))['token'] : "";
        const { programNum, programToken } = queryString.parse(search);
        const gotoBack = () => {
            history.push({
                pathname: '/myvendor/planform/list'
            })
        }
        if( programNum==undefined || programToken==undefined ){
            gotoBack();
        }else{
            if( programToken!=storageProgramToken ){
                gotoBack();
            }else{
                this.setState({
                    loading: true
                },()=>{
                    this.props.dispatch( contract(pathname,{...queryString.parse(search)}) ).then( res => {
                        this.setState({
                            loading: false
                        },()=>{
                            switch( res['status'] ){
                                case 200:
                                    this.setState({
                                        contract: res['data']['contract']
                                    })
                                    break;

                                default:
                                    break;
                            }
                        })
                    });
                })
            }
        }
    }

    actionBtn = ( val ) => {
        const { location, history, match } = this.props;
        const { pathname, search } = location;
        const query = {...queryString.parse(search)};
        switch( val ){
            case 'ok':
                history.push({
                    pathname: '/myvendor/planform/payment/step2',
                    search: queryString.stringify(query)
                });
                break;

            default:
                sessionStorage.removeItem('vendorBuyPlanform');
                history.push({
                    pathname: '/myvendor/planform/list'
                });
                break;
        }
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Step1 );