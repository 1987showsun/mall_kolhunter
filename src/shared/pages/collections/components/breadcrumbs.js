/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

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
                        精選商品
                    </li>
                </ul>
            </div>
        );
    }

    handleChangeSort = () => {

    }
}