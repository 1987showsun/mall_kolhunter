import React from 'react';
import toaster from 'toasted-notes';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Components
import AvatarCropper from '../../../../../module/avatarCropper';

// Modules
import Loading from '../../../../../module/loading/blockLoading';

// Actions
import { ainfoUpdate } from '../../../../../actions/myaccount';

// Lang
import lang from '../../../../../public/lang/lang.json';

class Cover extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            accountInfo: {}
        }
    }

    static getDerivedStateFromProps( props,state ){

        let accountInfo = state.accountInfo;
        if( props.data!=undefined && Object.keys(accountInfo).length==0 ){
            accountInfo = props.data
        }

        return {
            accountInfo
        };
    }

    render(){
        const { loading, accountInfo } = this.state;
        return(
            <div className="user-cover">
                <AvatarCropper 
                    src= {accountInfo['photo']}
                    onChangeData= {this.onChangeData.bind(this)}
                />
                <Loading loading={loading} />
            </div>
        );
    }

    onChangeData = ( src ) => {
        const { location } = this.props;
        const { accountInfo } = this.state;
        const { pathname, search } = location;
        this.setState({
            accountInfo: {
                ...accountInfo,
                photo: src
            }
        },()=>{
            const data = {
                photo      : src,
                name       : accountInfo['name'],
                nickname   : accountInfo['nickname'],
                gender     : accountInfo['gender'],
                birthday   : accountInfo['birthday'],
                phone      : accountInfo['phone'],
                zipCode    : accountInfo['zipCode'],
                city       : accountInfo['city'],
                dist       : accountInfo['dist'],
                address    : accountInfo['address'],
                company    : accountInfo['company'],
            }

            this.setState({
                loading: true,
            },()=>{
                this.props.dispatch( ainfoUpdate(pathname,{...queryString.parse(search)},data) ).then( res => {
                    this.setState({
                        loading: false,
                    },() => {
                        let status_text = "";
                        let status = "failure";

                        switch( res['status'] ){
                            case 200:
                                status_text = lang['zh-TW']['toaster']['updateSuccess'];
                                status = "success";
                                this.props.returnCancel({photo: data['photo']});
                                break;

                            default:
                                status_text = lang['zh-TW']['toaster']['updateFailure'];
                                status = "failure";
                                break;
                        }

                        toaster.notify( <div className={`toaster-status ${status}`}>{status_text}</div> ,{
                            position: 'bottom-right',
                            duration: 3000
                        })
                    })
                });
            });
        })
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Cover );