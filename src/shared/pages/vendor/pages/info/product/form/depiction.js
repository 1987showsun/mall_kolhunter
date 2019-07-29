import React from 'react';
import FileBase64 from 'react-file-base64';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faTrashAlt }from '@fortawesome/free-solid-svg-icons';

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
                    {
                        data.length!=0?(
                            <ul className="depiction-ul">
                                {
                                    data.map( (item,i)=> {
                                        return(
                                            <li key={i}>
                                                {
                                                    status=="none-auth" &&
                                                        <div className="depiction-remove" onClick={this.removeItem.bind(this, i)}>
                                                            <FontAwesomeIcon icon={faTrashAlt} />
                                                        </div>
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
                    {
                        status=="none-auth" &&
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
                    }

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
        let { data } = this.state;
        data = [
            ...data,
            {
                type: 'image',
                description: files['base64']
            }
        ];
        this.setState({
            data
        })
    }

    handleChangeTextarea = (i,e) => {
        let { data } = this.state;
        let name = e.target.name;
        let val = e.target.value;
        data[i][name] = val;
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
                        description: ''
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
                return(<img src={item['description']} alt="" title="" />);
                
            case 'html':
                return(
                    <textarea 
                        name="description" 
                        value={item['description']}
                        onChange={this.handleChangeTextarea.bind(this,i)} 
                    />
                );
        }
    }

    returnBack = () => {
        const { data } = this.state;
        //this.props.onHandleChange('4',data);
    }
}