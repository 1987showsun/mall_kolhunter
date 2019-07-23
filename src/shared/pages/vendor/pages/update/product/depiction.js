import React from 'react';
import FileBase64 from 'react-file-base64';

export default class Depiction extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            status: props.status,
            data : props.data
        }
    }

    render(){

        const { data,status } = this.state;

        return(
            <React.Fragment>
                <section className="admin-content-row">
                    <article className="admin-content-title">
                        <h4>商品敘述</h4>
                    </article>
                    <div className="admin-content-container">
                        {
                            data.length!=0?(
                                <ul className="depiction-ul">
                                    {
                                        data.map( (item,i)=> {
                                            return(
                                                <li key={i}>
                                                    {
                                                        status==2 &&
                                                            <div className="depiction-remove" onClick={this.removeItem.bind(this, i)}>X</div>
                                                    }
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
                    {
                        status==2 &&
                            <div className="actionProductInfo">
                                <ul>
                                    <li>
                                        <button type="button">
                                            新增圖片區塊
                                            <FileBase64 multiple={false} onDone={this.handleChangDepictionImg.bind(this)} />
                                        </button>
                                    </li>
                                    <li><button type="button" onClick={this.addCondition.bind(this,'text')}>新增文字區塊</button></li>
                                </ul>
                            </div>
                    }
                </section>
            </React.Fragment>
        );
    }

    removeItem = (idx) => {
        let { data } = this.state;
        data.splice(idx,1);
        this.setState({
            data
        },()=>{
            this.returnBack();
        })
    }

    handleChangDepictionImg = (files) => {
        let { data } = this.state;
        data = [
            ...data,
            {
                type: 'image',
                content: files['base64']
            }
        ];
        this.setState({
            data
        },()=>{
            this.returnBack();
        })
    }

    handleChangeTextarea = (i,e) => {
        let { data } = this.state;
        let name = e.target.name;
        let val = e.target.value;
        data[i][name] = val;
        this.setState({
            data
        },()=>{
            this.returnBack();
        })
    }

    addCondition = ( method ) => {

        let { data } = this.state;

        switch( method ){
            case 'text':
                data = [
                    ...data,
                    {
                        type: 'text',
                        content: ''
                    }
                ]
                break;
        }

        this.setState({
            data
        },()=>{
            this.returnBack();
        })
    }

    renderTypeof = (item,i) => {
        const { status } = this.state;
        switch( item['type'] ){
            case 'image':
                if(status==2){
                    return(<img src={item['content']} alt="" title="" />);
                }else{
                    return(<img src={item['content']} alt="" title="" />);
                }
                
            case 'text':
                if(status==2){
                    return(
                        <textarea 
                            name="data" 
                            value={item['content']}
                            onChange={this.handleChangeTextarea.bind(this,i)} 
                        />
                    );
                }else{
                    return item['content'];
                }
        }
    }

    returnBack = () => {
        const { data } = this.state;
        this.props.onHandleChange('4',data);
    }
}