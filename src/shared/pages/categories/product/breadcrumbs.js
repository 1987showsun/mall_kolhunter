import React from 'react';
import { Link } from 'react-router-dom';

export default class Breadcrumbs extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            filterSort : 0
        }
    }

    render(){

        const { filterSort } = this.state;

        return(
            <div className="path-breadcrumbs">
                <ul>
                    <li>
                        <Link to="/">首頁</Link>
                    </li>
                    <li>
                        男性衣著
                    </li>
                </ul>
                <div className="input-box select">
                    <select name="filterSort" value={filterSort} onChange={this.handleChangeSort.bind(this)}>
                        <option value="">價格由高到低</option>
                        <option value="">價格由低到高</option>
                    </select>
                </div>
            </div>
        );
    }

    handleChangeSort = () => {

    }
}