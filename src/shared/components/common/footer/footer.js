import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// stylesheets
import './footer.scss';

// Images
import footLogo from '../../../public/images/home_about_01.png';

class Footer extends React.Component{
    render(){
        return(
            <footer data-content="center">
                <section className="container" data-direction="column" >
                    <div className="row footer-row">
                        <ul className="footer-slogn">
                            <li>
                                <div className="slogn-head">曝</div>
                                <div className="slogn-text">全方位的網紅幫你曝光商品</div>
                            </li>
                            <li>
                                <div className="slogn-head">質</div>
                                <div className="slogn-text">多項商品廠商品質保證</div>
                            </li>
                            <li>
                                <div className="slogn-head">省</div>
                                <div className="slogn-text">在此價位讓您買到省到</div>
                            </li>
                            <li>
                                <div className="slogn-head">心</div>
                                <div className="slogn-text">用心審核讓您安心用的放心</div>
                            </li>
                        </ul>
                    </div>
                    <div className="row footer-row">
                        <div className="footer-col footer-col-nav">
                            <div className="footer-nav-wrap" data-direction="column">
                                <div className="footer-nav-wrap-title">關於我們</div>
                                <ul>
                                    <li><Link to="">關於我們</Link></li>
                                    <li><Link to="">隱私權政策</Link></li>
                                    <li><Link to="">會員條款</Link></li>
                                </ul>
                            </div>
                            <div className="footer-nav-wrap" data-direction="column">
                                <div className="footer-nav-wrap-title">廠商專區</div>
                                <ul>
                                    <li><Link to="/vendor/signup">加入經銷商</Link></li>
                                    <li><Link to="/vendor">廠商登入</Link></li>
                                    <li><Link to="">上架快問快答</Link></li>
                                    <li><Link to="">廠商條款</Link></li>
                                </ul>
                            </div>
                            <div className="footer-nav-wrap" data-direction="column">
                                <div className="footer-nav-wrap-title">網紅專區</div>
                                <ul>
                                    <li><Link to="">我是網紅</Link></li>
                                    <li><Link to="">分潤快問快答</Link></li>
                                    <li><Link to="">網紅店家條款</Link></li>
                                </ul>
                            </div>
                            <div className="footer-nav-wrap" data-direction="column">
                                <div className="footer-nav-wrap-title">其他服務</div>
                                <ul>
                                    <li><Link to="">聯絡我們</Link></li>
                                    <li><Link to="">退貨/款政策</Link></li>
                                </ul>
                            </div>
                            <div className="footer-nav-wrap" data-direction="column">
                                <div className="footer-nav-wrap-title">平台服務</div>
                                <ul>
                                    <li><Link to="">網紅店家</Link></li>
                                    <li><Link to="">商品列表</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-col footer-col-logo">
                            <Link to="/">
                                <br/>
                                <img src={footLogo} alt="" title="" />
                            </Link>
                        </div>
                    </div>
                    <div className="row footer-row" data-content="center" >
                        <small>2019-2020 MALL.KOLHUNTER.COM 版權所有</small>
                    </div>
                </section>
            </footer>
        );
    }
}

const mapStateToProps = state => {
    return{
        
    }
}

export default connect( mapStateToProps )(Footer);