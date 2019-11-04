import React                      from 'react';
import toaster                    from 'toasted-notes';
import { connect }                from 'react-redux';

// Components
import BGImg                      from './BGImg';
import Photo                      from './photo';
import Name                       from './name';
import Digital                    from './digital';
import Action                     from './action';

// Modules
import Loading                    from '../../../../../../module/loading/mallLoading';

// Actions
import { mystoreStoreInfoUpdate } from '../../../../../../actions/mystore';

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
            loading                : false,
            data                   : props.data,
            formObject             : props.data,
            actionSwitchDisplay    : actionSwitchDisplay(),
            className              : props.className || "",
            photo                  : ""
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

        const { loading, data, formObject, actionSwitchDisplay, className } = this.state;
        const { productTotal } = this.props;
        const cover = formObject['cover'] || "";
        const photo = formObject['photo'] || "";
        const name  = formObject['name']  || "";

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
                            <Digital 
                                data={data}
                                productTotal= {productTotal}
                            />
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
                    let toasterStatus = 'failure';
                    let toasterMsg = '';
                    switch( res['status'] ){
                        case 200:
                            toasterStatus = 'success';
                            toasterMsg = '更新成功';
                            break;
                        
                        default :
                            toasterStatus = 'failure';
                            toasterMsg = '更新失敗';
                            break;
                    }

                    toaster.notify(
                        <div className={`toaster-status ${toasterStatus}`}>{toasterMsg}</div>
                    ,{
                        position: 'bottom-right',
                        duration: 3000
                    })
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