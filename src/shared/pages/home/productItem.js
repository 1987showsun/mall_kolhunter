import React from 'react';
import { Link } from 'react-router-dom';

export default class Item extends React.Component{
    render(){

        const { data } = this.props;

        return(
            <li>
                <figure>
                    <div className="product-list-img-wrap">
                        <Link to={`/detail/${data['id']}`}></Link>
                        <img src={data['image']} alt={data['name']} title="" />
                    </div>
                    <figcaption>
                        <section className="figcaption-row">
                            <h3><Link to={`/detail/${data['id']}`}>{data['name']}</Link></h3>
                            {/* <h4><Link to="">Rimowa</Link></h4> */}
                        </section>
                        <div className="figcaption-row money">
                            <span className="price">{data['price']}</span>
                            <span className="priceSale">{data['sellPrice']}</span>
                        </div>
                    </figcaption>
                </figure>
            </li>
        );
    }
}