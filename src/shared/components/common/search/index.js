import React from 'react';
import { Link } from 'react-router-dom';

export default class Search extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            formObject : {
                type : 1,
                search : ""
            }
        }
    }

    render(){

        const { formObject } = this.state;

        return(
            <div className="search-block">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="input-box">
                        <input type="text" name="search" value={formObject['search']} placeholder="" onChange={this.handleChange.bind(this)}/>
                        <div className="input-box select">
                            <select name="type" onChange={this.handleChange.bind(this)}>
                                <option value="1">商品名稱</option>
                                <option value="2">網紅名稱</option>
                            </select>
                        </div>
                        <button type="submit">搜尋</button>
                    </div>
                </form>
                <div className="hito-search">
                    <span className="label">熱門收尋：</span>
                    <ul>
                        <li><Link to="">123</Link></li>
                    </ul>
                </div>
            </div>
        );
    }

    handleChange = ( e ) => {
        let { formObject } = this.state;
        let name = e.target.name;
        let val = e.target.value;
        formObject = { ...formObject, [name]: val }
        this.setState({
            formObject
        })
    }

    handleSubmit = ( e ) => {
        e.preventDefault();
        const { formObject } = this.state;
        console.log(formObject);
    }
}