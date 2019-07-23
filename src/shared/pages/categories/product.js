import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//Compoents
import BlockList from '../../module/blockList';

class Product extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            filterSort : 0
        }
    }

    render(){

        const { filterSort } = this.state;
        
        return(
            <React.Fragment>
                <div className="row">
                    <section className="container main-content">
                        <section className="container-col filter-wrap" data-flexdirection="column" >
                            <article className="container-col-row" data-flexdirection="column" >
                                <div className="block-title">
                                    <h2>分類清單</h2>
                                </div>
                                <article className="container-col-row">
                                    <ul className="filter-nav-ul">
                                        <li><Link to="">所有商品</Link></li>
                                        <li><Link to="">Ｔ恤</Link></li>
                                        <li><Link to="">長褲</Link></li>
                                        <li><Link to="">外套</Link></li>
                                        <li><Link to="">運動服飾</Link></li>
                                        <li><Link to="">短褲</Link></li>
                                        <li><Link to="">帽Ｔ、大學Ｔ</Link></li>
                                        <li><Link to="">男性內著</Link></li>
                                        <li><Link to="">POLO 衫</Link></li>
                                        <li><Link to="">襯衫</Link></li>
                                        <li><Link to="">背心</Link></li>
                                        <li><Link to="">丹寧牛仔褲</Link></li>
                                        <li><Link to="">毛衣、針織衫</Link></li>
                                        <li><Link to="">其他</Link></li>
                                    </ul>
                                </article>
                            </article>

                            <article className="container-col-row" data-flexdirection="column" >
                                <div className="block-title">
                                    <h2>篩選條件</h2>
                                </div>
                                <article className="container-col-row">
                                    <ul className="filter-nav-ul">
                                        <li><Link to="">所有商品</Link></li>
                                        <li><Link to="">Ｔ恤</Link></li>
                                        <li><Link to="">長褲</Link></li>
                                        <li><Link to="">外套</Link></li>
                                        <li><Link to="">運動服飾</Link></li>
                                        <li><Link to="">短褲</Link></li>
                                        <li><Link to="">帽Ｔ、大學Ｔ</Link></li>
                                        <li><Link to="">男性內著</Link></li>
                                        <li><Link to="">POLO 衫</Link></li>
                                        <li><Link to="">襯衫</Link></li>
                                        <li><Link to="">背心</Link></li>
                                        <li><Link to="">丹寧牛仔褲</Link></li>
                                        <li><Link to="">毛衣、針織衫</Link></li>
                                        <li><Link to="">其他</Link></li>
                                    </ul>
                                </article>
                            </article>
                        </section>
                        <section className="container-col" data-flexdirection="column" >
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
                            <BlockList />
                        </section>
                    </section>
                </div>
            </React.Fragment>
        );
    }

    handleChangeSort = () => {

    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default connect(mapStateToProps)(Product);