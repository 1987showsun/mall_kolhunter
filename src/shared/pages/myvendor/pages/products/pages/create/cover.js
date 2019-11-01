import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faTimes, faMapPin }from '@fortawesome/free-solid-svg-icons';

// Modules
import BlockList from '../../../../../../module/blockList';
import AvatarCropper from '../../../../../../module/avatarCropper';
import Loading from '../../../../../../module/loading';

// Actions
import { createProduct } from '../../../../../../actions/myvendor';

// Lang
import lang from '../../../../../../public/lang/lang.json';

class Cover extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            id: props.id,
            step: props.step,
            msg: [],
            required: ['images'],
            selectedIndex: 0,
            data: []
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            id: props.id,
            step: props.step
        }
    }

    render(){

        let { loading, id, step, msg, data, selectedIndex } = this.state;

        return(
            <React.Fragment>
                <article className="admin-content-title">
                    <h4>商品圖片</h4>
                </article>
                <form className="create-form" onSubmit={this.handleSubmit.bind(this)}>
                    <BlockList className="admin-product-img-ul">
                        <li>
                            <AvatarCropper 
                                onChangeData= {this.onChangeData.bind(this)}
                            />
                        </li>
                        {
                            data.length!=0 &&
                                data.map( (item,i)=> {
                                    return(
                                        <li key={i} className={ selectedIndex==i? 'active':'' }>
                                            <figure>
                                                <img src={item['image']} alt="" title="" />
                                                <figcaption>
                                                    <ul className="btn-ul">
                                                        <li>
                                                            <button className="positioning" type="button" onClick={this.positioning.bind(this,i)}>
                                                                <i><FontAwesomeIcon icon={faMapPin} /></i>
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button type="button" onClick={this.removeItem.bind(this,i)}>
                                                                <i><FontAwesomeIcon icon={faTimes} /></i>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </figcaption>
                                            </figure>
                                        </li>
                                    )
                                })
                        }
                    </BlockList>
                    {
                        msg.length!=0 &&
                            <div className="admin-form-msg">{msg}</div>
                    }
                    <div className="admin-form-action">
                        <ul>
                            <li>
                                <button type="button" className="cancel" onClick={this.props.returnCancel.bind(this)}>取消</button>
                            </li>
                            <li>
                                <button type="submit">{ step!=5? lang['zh-TW']['Submit Next'] : lang['zh-TW']['Finish'] }</button>
                            </li>
                        </ul>
                    </div>
                    <Loading loading={loading} />
                </form>
            </React.Fragment>
        );
    }

    onChangeData = (val) => {
        let { data } = this.state;
        data = [ 
            ...data,{ 
                image: val, 
            } 
        ];
        if( data.length==1 ){
            data[0]['sticky']=true;
        }
        this.setState({
            data
        });
    }

    removeItem = ( idx ) => {
        let { data } = this.state;
        data.splice(idx,1);
        this.setState({
            data
        })
    }

    positioning = (idx) => {
        this.setState({
            selectedIndex: idx
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const method = 'put';
        const { id, step, required, data } = this.state;
        const checkRequiredFilter = required.filter( keys => {
            if( data.length<=0 ){
                return keys
            }
        }).map( keys => <div key={keys} className="items">{ lang['zh-TW']['note'][`${keys} required`] }</div>);

        // this.props.returnSuccess({ step: step+1 });
        if( checkRequiredFilter.length==0 ){
            this.setState({
                loading: true
            },()=>{
                this.props.dispatch( createProduct( { id, images: data}, step, method ) ).then( res => {
                    this.setState({
                        loading: false
                    },()=>{
                        switch( res['status'] ){
                            case 200:
                                this.setState({
                                    msg: []
                                },()=>{                        
                                    this.props.returnSuccess({ step: step+1 });
                                })
                                break;

                            default:
                                break;
                        }
                    })
                });
            });
        }else{
            this.setState({
                msg: checkRequiredFilter
            },()=>{
                this.props.returnError( checkRequiredFilter );
            })
        }
    }

    handleCancel = () => {

    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Cover );