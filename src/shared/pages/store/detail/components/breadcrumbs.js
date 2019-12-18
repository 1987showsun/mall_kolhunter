/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React                  from 'react';
import { Link }               from 'react-router-dom';
import { FontAwesomeIcon }    from '@fortawesome/react-fontawesome';
import { faHome }             from '@fortawesome/free-solid-svg-icons';

export default class Breadcrumbs extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            filterSort : 0
        }
    }

    render(){

        const { filterSort } = this.state;
        const { name } = this.props;

        return(
            <div className="path-breadcrumbs">
                <ul>
                    <li><Link to="/"><i><FontAwesomeIcon icon={faHome}/></i>首頁</Link></li>
                    <li><Link to="/store">網紅店舖</Link></li>
                    <li>{name}</li>
                </ul>
                {/* <div className="input-box select">
                    <select name="filterSort" value={filterSort} onChange={this.handleChangeSort.bind(this)}>
                        <option value="">人氣由高到低</option>
                        <option value="">人氣由低到高</option>
                        <option value="">販賣數由高到低</option>
                        <option value="">販賣數由低到高</option>
                    </select>
                </div> */}
            </div>
        );
    }

    handleChangeSort = () => {

    }
}