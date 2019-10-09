import React from 'react';
import toaster from 'toasted-notes';
import queryString from 'query-string';
import { connect } from 'react-redux';

// Components
import AvatarCropper from '../../../../../module/avatarCropper';

// Actions
import { ainfoUpdate } from '../../../../../actions/myaccount';

// Lang
import lang from '../../../../../public/lang/lang.json';

class Cover extends React.Component{

    constructor(props){
        super(props);
        this.state = {
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
        const { accountInfo } = this.state;
        return(
            <div className="user-cover">
                <AvatarCropper 
                    onChangeData= {this.onChangeData.bind(this)}
                />
                <img src={accountInfo['photo']} alt="" title="" />
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
            this.props.dispatch( ainfoUpdate(pathname,{...queryString.parse(search)},data) ).then( res => {
                switch( res['status'] ){
                    case 200:
                        toaster.notify( <div className={`toaster-status success`}>{lang['zh-TW']['toaster']['updateSuccess']}</div> ,{
                            position: 'bottom-right',
                            duration: 3000
                        })
                        break;

                    default:
                        toaster.notify( <div className={`toaster-status failure`}>{lang['zh-TW']['toaster']['updateFailure']}</div> ,{
                            position: 'bottom-right',
                            duration: 3000
                        })
                        break;
                }
            });
        })
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Cover );