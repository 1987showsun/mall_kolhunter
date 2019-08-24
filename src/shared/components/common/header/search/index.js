import React from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faSearch }from '@fortawesome/free-solid-svg-icons';

// Lang
import lang from '../../../../public/lang/lang.json';

export default class Search extends React.Component{

    constructor(props){
        const { location } = props;
        const search = queryString.parse(location['search']);
        super(props);
        this.state = {
            formObject : {
                type : search['type'] || "product",
                keyword : search['keyword'] || ""
            }
        }
    }

    render(){

        const { formObject } = this.state;

        return(
            <div className="search-block">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="input-box">
                        <input type="text" name="keyword" value={formObject['keyword']} placeholder={`${lang['zh-TW']['placeholder'][`${formObject['type']} name`]}`} onChange={this.handleChange.bind(this)}/>
                        <div className="input-box select">
                            <select name="type" value={formObject['type']} onChange={this.handleChange.bind(this)}>
                                <option value="product">商品名稱</option>
                                <option value="store">店家名稱</option>
                            </select>
                        </div>
                        <button type="submit">
                            <span>搜尋</span>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
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
        const { history, location } = this.props;
        let search = queryString.parse( location['search'] );
        search = { ...search, ...formObject };
        history.push({
            pathname: '/search',
            search: queryString.stringify( search )
        })
    }
}