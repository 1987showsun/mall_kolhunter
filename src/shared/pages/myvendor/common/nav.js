import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import { faChartBar, faBoxOpen, faFileAlt, faCalculator, faChessRook, faAngleUp }from '@fortawesome/free-solid-svg-icons';

// Modules
import Confirm from '../../../module/confirm';

// Images
import logo from '../../../public/images/logo.png';

class Nav extends React.Component{

    constructor(props){
        super(props);
        this.state={
            navOpenStatus: false,
            open: false,
            popupMSG: "",
            profile: props.profile
        }
    }

    static getDerivedStateFromProps( props,state ){
        return{
            profile: props.profile
        }
    }

    render(){

        const { location } = this.props;
        const { navOpenStatus, open, popupMSG, profile } = this.state;
        const { pathname, match } = location;
        let pathnameArray = pathname.split('/').filter( item => item!='' );
        const nowMainNavPathnameSet = pathnameArray['1'];

        return(
            <React.Fragment>
                <input type="checkbox" name="navOpenStatus" id="admin-nav-switch" onChange={this.handleNavSwitch.bind(this)} checked={navOpenStatus}/>
                <nav className={`inc_nav ${navOpenStatus}`}>
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} title="" alt="" />
                        </Link>
                    </div>
                    <ul>
                        {/* <li>
                            <span className={`navBtn ${nowMainNavPathnameSet=='dashboard'}`}><i><FontAwesomeIcon icon={faChartBar}/></i>Dashbord<i className="menu-submenu-arrow"><FontAwesomeIcon icon={faAngleUp}/></i></span>
                            <ul>
                                <li><NavLink className="subNavBtn" to="/myvendor/dashboard/analysis">整體分析</NavLink></li>
                            </ul>
                        </li>*/}
                        <li>
                            <span className={`navBtn ${nowMainNavPathnameSet=='products'}`}><i><FontAwesomeIcon icon={faBoxOpen}/></i>商品管理<i className="menu-submenu-arrow"><FontAwesomeIcon icon={faAngleUp}/></i></span>
                            <ul>
                                <li><NavLink className="subNavBtn" to="/myvendor/products/list">商品列表</NavLink></li>
                                <li>
                                    {
                                        profile['remainQuantity']<=0? (
                                            <span 
                                                className="subNavBtn" 
                                                onClick={()=>{
                                                    this.setState({
                                                        open: true,
                                                        popupMSG: "該會員目前無足夠上架數，請至購買方案購買足夠上架數"
                                                    })
                                                }}
                                            >
                                                新增商品 ({profile['remainQuantity']})
                                            </span>
                                        ):(
                                            <NavLink 
                                                className="subNavBtn" 
                                                to="/myvendor/products/create"
                                            >
                                                    新增商品 ({profile['remainQuantity']})
                                            </NavLink>
                                        )
                                    }
                                </li>
                            </ul>
                        </li>
                        <li>
                            <span className={`navBtn ${nowMainNavPathnameSet=='orders'}`}><i><FontAwesomeIcon icon={faFileAlt}/></i>訂單管理<i className="menu-submenu-arrow"><FontAwesomeIcon icon={faAngleUp}/></i></span>
                            <ul>
                                <li><NavLink className="subNavBtn" to="/myvendor/orders">訂單列表</NavLink></li>
                            </ul>
                        </li>
                        <li>
                            <span className={`navBtn ${nowMainNavPathnameSet=='accounts'}`}><i><FontAwesomeIcon icon={faCalculator}/></i>帳務管理<i className="menu-submenu-arrow"><FontAwesomeIcon icon={faAngleUp}/></i></span>
                            <ul>
                                <li><NavLink className="subNavBtn" to="/myvendor/accounts">帳務明細</NavLink></li>
                            </ul>
                        </li>
                        <li>
                            <span className={`navBtn ${nowMainNavPathnameSet=='planform'}`}><i><FontAwesomeIcon icon={faChessRook}/></i>方案購買<i className="menu-submenu-arrow"><FontAwesomeIcon icon={faAngleUp}/></i></span>
                            <ul>
                                <li><NavLink className="subNavBtn" to="/myvendor/planform/list">方案列表</NavLink></li>
                                <li><NavLink className="subNavBtn" to="/myvendor/planform/record">購買紀錄</NavLink></li>
                            </ul>
                        </li>
                    </ul>
                </nav>

                <Confirm
                    open={open}
                    method='alert'
                    container={popupMSG}
                    onCancel={this.handleConfirm.bind(this)}
                />
            </React.Fragment>
        )
    }

    componentDidMount() {
        
        const className         = document.getElementsByClassName('navBtn');
        const sensingAreaLength = className.length;

        for( let i=0 ; i<sensingAreaLength ; i++ ){

            const liTag    = className[i].nextElementSibling.getElementsByTagName('li');
            const liLength = liTag.length;
            const initSelectMainnavIdx = () => {
                for( let z=0 ; z<liLength ; z++ ){
                    const aTagClassName = liTag[z].getElementsByClassName('subNavBtn');
                    if( aTagClassName[0].classList.contains('active') ){
                        return i;
                    }
                }
                return -1;
            }

            if( initSelectMainnavIdx()!=-1 ){
                className[ initSelectMainnavIdx() ].classList.add('true');
                className[ initSelectMainnavIdx() ].nextElementSibling.style.display = "block";
            }

            className[i].onclick = function(){
                const content = className[i].nextElementSibling;
                const removeStyleClass = () => {
                    for( let z=0; z<sensingAreaLength ; z++ ){
                        className[z].classList.remove('true');
                        className[z].nextElementSibling.style.display = "none";
                    }
                }
                if (content.style.display === "block"  ) {
                    removeStyleClass();
                    className[i].classList.remove('true');
                    content.style.display = "none";
                } else {
                    removeStyleClass();
                    className[i].classList.add('true');
                    content.style.display = "block";
                }
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { location } = this.props;
        const prevPropsLocation = prevProps.location;
        if( location['pathname']!=prevPropsLocation['pathname'] ){
            this.setState({
                navOpenStatus: false
            },()=>{
                this.props.returnNavSwitchStatus(false);
            })
        }
    }

    handleNavSwitch = (e) => {
        const { name, value, checked } = e.target;
        this.setState({
            [name]: checked
        },()=>{
            this.props.returnNavSwitchStatus(checked);
        })
    } 

    handleConfirm = () => {
        const { history } = this.props;
        this.setState({
            open: false,
            popupMSG: "",
        },()=>{
            history.push({
                pathname: '/myvendor/planform/list'
            })
        })
    }
}

const mapStateToProps = (state) => {
    return{
        profile: state.myvendor.info
    }
}

export default connect(mapStateToProps)(Nav);