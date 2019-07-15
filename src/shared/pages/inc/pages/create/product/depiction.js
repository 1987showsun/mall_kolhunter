import React from 'react';
import FileBase64 from 'react-file-base64';

export default class Depiction extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data : props.data
        }
    }

    render(){

         const { data } = this.state;

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
                            <li><button type="button" onClick={this.addCondition.bind(this,'text')}>新增文字區塊</button></li>
                        </ul>
                    </div>
                </section>
            </React.Fragment>
        );
    }

    handleChangDepictionImg = (files) => {
        let { data } = this.state;
        data = [
            ...data,
            {
                typeof: 'img',
                data: files['base64']
            }
        ];
        this.setState({
            data
        },()=>{
            console.log(data);
            // return val;
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
            // return val;
        })
    }

    addCondition = ( method ) => {

        let { data } = this.state;

        switch( method ){
            case 'text':
                data = [
                    ...data,
                    {
                        typeof: 'text',
                        data: ''
                    }
                ]
                break;
        }

        this.setState({
            data
        })
    }

    renderTypeof = (item,i) => {
        switch( item['typeof'] ){
            case 'img':
                return(<img src={item['data']} alt="" title="" />);
                
            case 'text':
                return(
                    <textarea 
                        name="data" 
                        value={item['data']}
                        onChange={this.handleChangeTextarea.bind(this,i)} 
                    />
                );
        }
    }
}