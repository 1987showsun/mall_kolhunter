import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Actions
import { contract } from '../../../../../../../actions/myvendor';

class Step1 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            contract: "",
        }
    }

    render(){

        const { contract } = this.state;

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>合約書</h4>
                    </article>
                    <div className="admin-content-container">
                        {contract}
                    </div>
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
            </React.Fragment>
        );
    }

    componentDidMount() {
        const { location, history, match } = this.props;
        const { pathname, search } = location;
        const query = queryString.parse(search);
        if( query['programNum']==undefined || query['programToken']==undefined ){
            history.push({
                pathname: '/myvendor/planform/list'
            })
        }else{
            this.props.dispatch( contract(pathname,{...queryString.parse(search)}) ).then( res => {
                switch( res['status'] ){
                    case 200:
                        this.setState({
                            contract: res['data']['contract']
                        })
                        break;

                    default:
                        break;
                }
            });
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