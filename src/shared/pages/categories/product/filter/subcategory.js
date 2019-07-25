import React from 'react';
import { Link } from 'react-router-dom';

export default class Subcategory extends React.Component{
    render(){
        return(            
            <ul className="filter-nav-ul">
                <li><Link to={`/categories`}>所有商品</Link></li>
                <li><Link to={`/categories`}>Ｔ恤</Link></li>
                <li><Link to={`/categories`}>長褲</Link></li>
                <li><Link to={`/categories`}>外套</Link></li>
                <li><Link to={`/categories`}>運動服飾</Link></li>
                <li><Link to={`/categories`}>短褲</Link></li>
                <li><Link to={`/categories`}>帽Ｔ、大學Ｔ</Link></li>
                <li><Link to={`/categories`}>男性內著</Link></li>
                <li><Link to={`/categories`}>POLO 衫</Link></li>
                <li><Link to={`/categories`}>襯衫</Link></li>
                <li><Link to={`/categories`}>背心</Link></li>
                <li><Link to={`/categories`}>丹寧牛仔褲</Link></li>
                <li><Link to={`/categories`}>毛衣、針織衫</Link></li>
                <li><Link to={`/categories`}>其他</Link></li>
            </ul>
        );
    }
}