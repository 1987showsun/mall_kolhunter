import React from 'react';
import { Link } from 'react-router-dom';

export default class Subcategory extends React.Component{
    render(){

        const { match } = this.props;

        return(            
            <ul className="filter-nav-ul">
                <li><Link to={`/categories/男性服裝`}>所有商品</Link></li>
                <li><Link to={`/categories/男性服裝/Ｔ恤`}>Ｔ恤</Link></li>
                <li><Link to={`/categories/男性服裝/長褲`}>長褲</Link></li>
                <li><Link to={`/categories/男性服裝/外套`}>外套</Link></li>
                <li><Link to={`/categories/男性服裝/運動服飾`}>運動服飾</Link></li>
                <li><Link to={`/categories/男性服裝/短褲`}>短褲</Link></li>
                <li><Link to={`/categories/男性服裝/帽Ｔ、大學Ｔ`}>帽Ｔ、大學Ｔ</Link></li>
                <li><Link to={`/categories/男性服裝/男性內著`}>男性內著</Link></li>
                <li><Link to={`/categories/男性服裝/POLO 衫`}>POLO 衫</Link></li>
                <li><Link to={`/categories/男性服裝/襯衫`}>襯衫</Link></li>
                <li><Link to={`/categories/男性服裝/背心`}>背心</Link></li>
                <li><Link to={`/categories/男性服裝/丹寧牛仔褲`}>丹寧牛仔褲</Link></li>
                <li><Link to={`/categories/男性服裝/毛衣、針織衫`}>毛衣、針織衫</Link></li>
                <li><Link to={`/categories/男性服裝/其他`}>其他</Link></li>
            </ul>
        );
    }
}