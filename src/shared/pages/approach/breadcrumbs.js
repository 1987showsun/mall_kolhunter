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
                        <Link to="/">男性衣著</Link>
                    </li>
                    <li>
                        盛夏必備涼感單品．棉麻舒適抽繩短褲
                    </li>
                </ul>
            </div>
        );
    }

    handleChangeSort = () => {

    }
}