import React from 'react';
import FileBase64 from 'react-file-base64';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faTrashAlt, faArrowDown, faArrowUp }from '@fortawesome/free-solid-svg-icons';

// Actions
import { createProduct } from '../../../../../../actions/myvendor';

// Modules
import Loading from '../../../../../../module/loading';

// Lang
import lang from '../../../../../../public/lang/lang.json';

class Depiction extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            id: props.id,
            step: props.step,
            msg: [],
            required: ['descriptions'],
            data : props.data || []
        }
    }

    render(){

         const { loading, id, step, msg, data } = this.state;

        return(
            <React.Fragment>
                <article className="admin-content-title">
                    <h4>商品敘述</h4>
                </article>
                <form className="create-form" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="admin-content-container">
                        {
                            data.length!=0?(
                                <ul className="depiction-ul">
                                    {
                                        data.map( (item,i)=> {
                                            return(
                                                <li key={i}>
                                                    <div className="depiction-li-tool">
                                                        <div className="depiction-tool-btn" onClick={this.removeItem.bind(this, i)}>
                                                            <FontAwesomeIcon icon={faTrashAlt} />
                                                        </div>
                                                        {
                                                            i!=0 &&
                                                            <div className="depiction-tool-btn" onClick={this.moveItem.bind(this, 'up', item, i)}>
                                                                <FontAwesomeIcon icon={faArrowUp} />
                                                            </div>
                                                        }
                                                        {
                                                            i!=data.length-1 &&
                                                            <div className="depiction-tool-btn" onClick={this.moveItem.bind(this, 'down', item, i)}>
                                                                <FontAwesomeIcon icon={faArrowDown} />
                                                            </div>
                                                        }
                                                    </div>
                                                    { this.renderTypeof(item,i) }
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            ):(
                                <div className="list-no-data">請點選新增條件，新增所需條件</div>
                            )
                        }
                    </div>
                    <div className="actionProductInfo">
                        <ul>
                            <li>
                                <button type="button">
                                    新增圖片區塊
                                    <FileBase64 multiple={false} onDone={this.handleChangDepictionImg.bind(this)} />
                                </button>
                            </li>
                            <li><button type="button" onClick={this.addCondition.bind(this,'html')}>新增文字區塊</button></li>
                        </ul>
                    </div>
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

    removeItem = (idx) => {
        let { data } = this.state;
        data.splice(idx,1);
        this.setState({
            data
        })
    }

    handleChangDepictionImg = (files) => {
        const nowDate = new Date();
        let { data } = this.state;
        data = [
            ...data,
            {
                id: null,
                type: 'image',
                content: files['base64'],
                modified: nowDate.valueOf()
            }
        ];
        this.setState({
            data
        })
    }

    handleChangeTextarea = (i,e) => {
        const nowDate = new Date();
        let { data } = this.state;
        let name = e.target.name;
        let val = e.target.value;
        data[i][name] = val;
        data[i]['modified'] = nowDate.valueOf();
        this.setState({
            data
        })
    }

    addCondition = ( method ) => {
        let { data } = this.state;
        switch( method ){
            case 'html':
                data = [
                    ...data,
                    {
                        type: 'html',
                        content: ''
                    }
                ]
                break;
        }

        this.setState({
            data
        })
    }

    renderTypeof = (item,i) => {
        switch( item['type'] ){
            case 'image':
                return(<img src={item['content']} alt="" title="" />);
                
            case 'html':
                return(
                    <textarea 
                        name="content" 
                        value={item['content']}
                        onChange={this.handleChangeTextarea.bind(this,i)} 
                    />
                );
        }
    }

    moveItem = ( sort,item,i ) => {
        const nowDate = new Date();
        let { data } = this.state;
        data.splice(i,1);
        switch( sort ){
            case 'up':
                    data.splice( i-1,0,item );
                break;

            case 'down':
                    data.splice( i+1,0,item );
                break;
        }

        this.setState({
            data
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const method = 'put';
        const { id, step, required, data } = this.state;
        const checkRequiredFilter = data.length==0? [<div key='0' className="items">{ lang['zh-TW']['note'][`descriptions required`] }</div>]:[];

        if( checkRequiredFilter.length==0 ){
            this.setState({
                loading: true
            },()=>{
                this.props.dispatch( createProduct( { id, descriptions: data}, step, method ) ).then( res => {
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
                    });
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

export default connect( mapStateToProps )( Depiction );