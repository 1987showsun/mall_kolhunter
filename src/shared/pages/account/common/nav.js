import React from 'react';
import { Link } from 'react-router-dom';

// Stylesheets
import './style.scss';

export default class Nav extends React.Component{
    render(){
        return(
            <section className="container-col account-nav-wrap">
                <article className="account-nav-wrap-row">
                    <ul className="account-nav-ul">
                        <li className="account-nav-header">一般</li>
                        <li><Link to="">基本設定</Link></li>
                        <li><Link to="">訂單查詢 / 退貨</Link></li>
                        <li><Link to="">登出</Link></li>
                    </ul>
                </article>
                <article className="account-nav-wrap-row">
                    <ul className="account-nav-ul">
                        <li className="account-nav-header">網紅專區</li>
                        <li><Link to="">全部商品</Link></li>
                        <li><Link to="">我的店舖</Link></li>
                        <li><Link to="">粉絲訂單</Link></li>
                        <li><Link to="">帳戶資料</Link></li>
                    </ul>
                </article>
            </section>
        );
    }
}