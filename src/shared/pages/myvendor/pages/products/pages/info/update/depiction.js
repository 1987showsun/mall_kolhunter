import React from 'react';
import FileBase64 from 'react-file-base64';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faTrashAlt, faArrowDown, faArrowUp }from '@fortawesome/free-solid-svg-icons';

// Modules
import Loading from '../../../../../../../module/loading';

// Actions
import { createProduct } from '../../../../../../../actions/myvendor';

class Depiction extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            status: props.status,
            id: props.id,
            data : props.data
        }
    }

    render(){

        const { loading, data, status } = this.state;

        return(
            <React.Fragment>
                <form onSubmit={this.handleSubnit.bind(this)}>
                    {
                        data.length!=0?(
                            <ul className="depiction-ul">
                                {
                                    data.map( (item,i)=> {
                                        return(
                                            <li key={i}>
                                                {
                                                    status=="none-auth" &&
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
                                                }
                                                { this.renderTypeof(item,i) }
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        ):(
                            <div className="list-no-data">??????????????????????????????????????????</div>
                        )
                    }
                    {
                        status=="none-auth" &&
                            <div className="actionProductInfo">
                                <ul>
                                    <li>
                                        <button type="button">
                                            ??????????????????
                                            <FileBase64 multiple={false} onDone={this.handleChangDepictionImg.bind(this)} />
                                        </button>
                                    </li>
                                    <li><button type="button" onClick={this.addCondition.bind(this,'html')}>??????????????????</button></li>
                                </ul>
                            </div>
                    }
                    <ul className="action-ul">
                        <li><button type="button" className="cancel" onClick={this.props.returnCancel.bind(this)}>??????</button></li>
                        <li><button className="basic">??????</button></li>
                    </ul>
                </form>
                <Loading loading={loading} />
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
        const { name, value } = e.target;
        let { data } = this.state;
        data[i][name] = value;
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

    handleSubnit = (e) => {
        e.preventDefault();
        const { id, data } = this.state;
        const updateForm = { id, descriptions: data };
        this.setState({
            loading: true,
        },()=>{
            this.props.dispatch( createProduct(updateForm , 4 , 'put' ) ).then( res => {
                this.setState({
                    loading: false
                },()=>{
                    switch( res['status'] ){
                        case 200:
                            const result = res['data']['description'];
                            this.props.returnResult(result);
                            break;

                        default:
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

export default connect( mapStateToProps )( Depiction );