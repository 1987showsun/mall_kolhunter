import React from 'react';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus }from '@fortawesome/free-solid-svg-icons';

export default class Cover extends React.Component{
    render(){
        return(
            <section className="admin-content-row">
                <ul className="admin-product-img-ul">
                    <li>
                        <label htmlFor="addCover" className="cover-img virtual">
                            <i><FontAwesomeIcon icon={faPlus}/></i>
                            <input type="file" name="" id="addCover" />
                        </label>
                    </li>
                    <li>
                        <div className="cover-img">
                            <img src="https://cf.shopee.tw/file/7f45df53d871582bfa8434b1db2af16d" alt="" title="" />
                        </div>
                    </li>
                </ul>
            </section>
        );
    }
}