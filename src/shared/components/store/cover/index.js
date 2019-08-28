import React from 'react';
import toaster from 'toasted-notes';
import { connect } from 'react-redux';

// Components
import BGImg from './BGImg';
import Photo from './photo';
import Name from './name';
import Digital from './digital';
import Action from './action';

// Modules
import Loading from '../../../module/loading/mallLoading';

// Actions
import { mystoreStoreInfoUpdate } from '../../../actions/mystore';

// Stylesheets
import './public/stylesheets/style.scss';

class Index extends React.Component{

    constructor(props){

        const actionSwitchDisplay = () => {
            if( Boolean(props.actionSwitchDisplay) || typeof props.actionSwitchDisplay=='boolean' ){
                return props.actionSwitchDisplay;
            }else{
                return true;
            }
        }

        super(props);
        this.state = {
            loading: false,
            data: props.data,
            formObject: props.data,
            actionSwitchDisplay: actionSwitchDisplay(),
            className: props.className || "",
            photo: ""
        }
    }

    static getDerivedStateFromProps( props,state ){
        if( Object.keys( state.data ).length==0 ){
            return {
                data: props.data,
                formObject: props.data
            }
        }
        return false;
    }

    render(){

        const { loading, data, formObject } = this.state;
        const { actionSwitchDisplay, className, bgImgSrc } = this.state;
        const cover = formObject['cover'] || "";
        const photo = formObject['photo'] || "";
        const name = formObject['name'] || "";

        return(
            <div className={`row store-cover-wrap ${className}`}>
                <BGImg 
                    cover= {cover}
                    updateInfo= {this.updateInfo.bind(this)}
                />
                <section className="container store-cover">
                    <figure>
                        <Photo 
                            photo= {photo}
                            updateInfo= {this.updateInfo.bind(this)}
                        />
                        <figcaption>
                            <Name 
                                name= {name}
                                editFormDisplay= {this.props.editFormDisplay}
                                updateInfo= {this.updateInfo.bind(this)}
                            />
                            <Digital />
                            {
                                actionSwitchDisplay &&
                                    <Action />
                            }
                        </figcaption>
                    </figure>
                </section>
                <Loading 
                    loading= {loading}
                />
            </div>
        );
    }

    updateInfo = ( keynameToUpdate, val ) => {
        const data = { [keynameToUpdate]: val };
        this.setState({
            loading: true
        },()=>{
            this.props.dispatch( mystoreStoreInfoUpdate( '',{},data ) ).then( res => {
                this.setState({
                    loading: false
                },()=>{
                    switch( res['status'] ){
                        case 200:
                            toaster.notify(
                                <div className={`toaster-status success`}>更新成功</div>
                            ,{
                                position: 'bottom-right',
                                duration: null
                            })
                            break;
                        
                        default :
                            console.log("更新失敗");
                            break;
                    }
                })
            });
        })
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Index );