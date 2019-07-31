import React from 'react';
import { Link } from 'react-router-dom';

export default class Item extends React.Component{
    render(){
        return(
            <li>
                <figure>
                    <div className="product-list-img-wrap">
                        <Link to="/detail/p_id"></Link>
                        <img src="https://s.yimg.com/zp/MerchandiseImages/492510ADE3-Product-22340413.jpg" alt="Rimowa Essential Sleeve Cabin 20吋登機箱 (霧黑色)" title="" />
                    </div>
                    <figcaption>
                        <section className="figcaption-row">
                            <h3><Link to="">Rimowa Essential Sleeve Cabin 20吋登機箱 (霧黑色)</Link></h3>
                            <h4><Link to="">Rimowa</Link></h4>
                        </section>
                        <div className="figcaption-row money">
                            <span className="price">37,000</span>
                            <span className="priceSale">27,000</span>
                        </div>
                    </figcaption>
                </figure>
            </li>
        );
    }
}