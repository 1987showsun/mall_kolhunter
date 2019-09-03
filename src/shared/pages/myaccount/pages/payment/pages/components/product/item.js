import React from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faPlus, faMinus }from '@fortawesome/free-solid-svg-icons';

class Item extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            itemNumMax: 10,
        }
    }

    render(){

        const { data, location } = this.props;
        
        return(
            <figure className="product-item-figure">
                <div className="img">
                    <img src={data['image']} alt={data['productName']} title=""/>
                </div>
                <figcaption>
                    <h3>
                        <Link to={`/detail/${data['productToken']}`} target="_blank">
                            {data['productName']}
                        </Link>
                    </h3>
                    <ul className="product-item-doc-list">
                        <li>
                            <label>尺寸 / 型號</label>
                            <div>{data['specName']}</div>
                        </li>
                        <li>
                            <label>消費網紅店家</label>
                            <div>{ data['store']!="" && data['store']!=undefined? data['store']:"Kolhunter Mall" }</div>
                        </li>
                        <li>
                            <label>數量</label>
                            <div>{data['count']}</div>
                        </li>
                        <li>
                            <label>運送方式</label>
                            <div>{`deliveryNameSet ${data['deliveryPrice']}`}</div>
                        </li>
                        <li>
                            <label>小計</label>
                            <div>{data['price']}</div>
                        </li>
                        <li>
                            <label>狀態</label>
                            <div>{data['deliveryStatus']}</div>
                        </li>
                    </ul>
                </figcaption>
            </figure>
        )
    }
}

const mapStateToProps = state => {
    return{

    }
}

export default connect( mapStateToProps )( Item );