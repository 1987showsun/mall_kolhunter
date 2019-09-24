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
                        搜尋：{this.props.keyword}
                    </li>
                </ul>
                {/* <div className="input-box select">
                    <select name="filterSort" value={filterSort} onChange={this.handleChangeSort.bind(this)}>
                        <option value="">商品總數由高到低</option>
                        <option value="">商品總數由低到高</option>
                        <option value="">總銷售額由高到低</option>
                        <option value="">總銷售額由低到高</option>
                    </select>
                </div> */}
            </div>
        );
    }

    handleChangeSort = () => {

    }
}