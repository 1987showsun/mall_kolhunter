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
                        <Link to="/">3C</Link>
                    </li>
                    <li>
                        Apple IPhone XS Max 64GB 太空灰/銀/金 6.5吋 原廠保固 蝦皮24h 現貨
                    </li>
                </ul>
            </div>
        );
    }

    handleChangeSort = () => {

    }
}