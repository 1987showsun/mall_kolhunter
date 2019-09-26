import React from 'react';
import FileBase64 from 'react-file-base64';

export default class Depiction extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data : props.data || []
        }
    }

    render(){

         const { data } = this.state;

        return(
            <React.Fragment>
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
                                                <div className="depiction-remove" onClick={this.removeItem.bind(this, i)}>X</div>
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
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.returnBack();
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
        },()=>{
            this.returnBack();
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
        },()=>{
            this.returnBack();
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
        },()=>{
            this.returnBack();
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

    returnBack = () => {
        const { data } = this.state;
        this.props.onHandleChange('4',data);
    }
}